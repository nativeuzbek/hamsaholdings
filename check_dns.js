// Check Netlify DNS records for hamsaholdings.com
const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Get auth token from netlify CLI config
const homedir = require('os').homedir();
const configPath = path.join(homedir, 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');

let token;
try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    token = config.users ? Object.values(config.users)[0]?.auth?.token : null;
} catch(e) {
    // Try alternative path
    try {
        const altPath = path.join(homedir, '.netlify', 'config.json');
        const config = JSON.parse(fs.readFileSync(altPath, 'utf8'));
        token = config.users ? Object.values(config.users)[0]?.auth?.token : null;
    } catch(e2) {
        console.log('Could not find Netlify auth token. Paths tried:');
        console.log(' -', configPath);
        console.log(' -', path.join(homedir, '.netlify', 'config.json'));
        
        // List possible config locations
        const dirs = [
            path.join(homedir, 'AppData', 'Roaming', 'netlify'),
            path.join(homedir, '.netlify'),
            path.join(homedir, '.config', 'netlify')
        ];
        dirs.forEach(d => {
            try {
                const items = fs.readdirSync(d, {recursive: true});
                console.log(`Found in ${d}:`, items);
            } catch(e) {}
        });
        process.exit(1);
    }
}

console.log('Token found:', token ? token.substring(0, 8) + '...' : 'null');

const zoneId = '6a4adba77e21195bf3c5c194';

function apiGet(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.netlify.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch(e) { resolve(data); }
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function main() {
    console.log('\n--- DNS Zone Records ---');
    const records = await apiGet(`/api/v1/dns_zones/${zoneId}/dns_records`);
    if (Array.isArray(records)) {
        records.forEach(r => {
            console.log(`${r.type}\t${r.hostname}\t${r.value}\t(id: ${r.id})`);
        });
    } else {
        console.log('Response:', JSON.stringify(records, null, 2));
    }

    console.log('\n--- Site Domain Info ---');
    const siteId = 'ec8f8548-da9d-445a-8865-a560f2a11475';
    const site = await apiGet(`/api/v1/sites/${siteId}`);
    console.log('Site name:', site.name);
    console.log('Custom domain:', site.custom_domain);
    console.log('SSL:', site.ssl);
    console.log('Force SSL:', site.force_ssl);
    console.log('SSL status:', site.ssl_status);
    console.log('DNS zone ID:', site.dns_zone_id);
    console.log('State:', site.state);
}

main().catch(console.error);
