// Provision SSL for the site and check domain status
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = Object.values(config.users)[0]?.auth?.token;

function apiRequest(method, apiPath, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.netlify.com',
            path: apiPath,
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`${method} ${apiPath} => ${res.statusCode}`);
                try { resolve(JSON.parse(data)); } catch(e) { resolve(data); }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function main() {
    const siteId = 'ec8f8548-da9d-445a-8865-a560f2a11475';
    
    // 1. Check current SSL certificate status
    console.log('=== Checking SSL Certificate ===');
    const cert = await apiRequest('GET', `/api/v1/sites/${siteId}/ssl`);
    console.log('SSL cert:', JSON.stringify(cert, null, 2));
    
    // 2. Try to provision SSL certificate
    console.log('\n=== Provisioning SSL Certificate ===');
    const provResult = await apiRequest('POST', `/api/v1/sites/${siteId}/ssl`, {
        certificate: '',
        key: '',
        ca_certificates: ''
    });
    console.log('Provision result:', JSON.stringify(provResult, null, 2));
    
    // 3. Check site state again
    console.log('\n=== Site State After SSL ===');
    const site = await apiRequest('GET', `/api/v1/sites/${siteId}`);
    console.log('SSL:', site.ssl);
    console.log('SSL status:', site.ssl_status);
    console.log('SSL URL:', site.ssl_url);
    console.log('Force SSL:', site.force_ssl);
}

main().catch(console.error);
