// Fix DNS records: replace NETLIFY records with proper A and CNAME records
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = Object.values(config.users)[0]?.auth?.token;

const zoneId = '6a4adba77e21195bf3c5c194';

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
                try { resolve({ status: res.statusCode, data: JSON.parse(data) }); } 
                catch(e) { resolve({ status: res.statusCode, data: data }); }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function main() {
    // Step 1: Get current records
    console.log('=== Step 1: Current DNS Records ===');
    const records = await apiRequest('GET', `/api/v1/dns_zones/${zoneId}/dns_records`);
    console.log('Records:', JSON.stringify(records.data, null, 2));
    
    // Step 2: Delete old NETLIFY records
    console.log('\n=== Step 2: Deleting old NETLIFY records ===');
    if (Array.isArray(records.data)) {
        for (const rec of records.data) {
            if (rec.type === 'NETLIFY') {
                console.log(`Deleting: ${rec.type} ${rec.hostname} => ${rec.value} (id: ${rec.id})`);
                const del = await apiRequest('DELETE', `/api/v1/dns_zones/${zoneId}/dns_records/${rec.id}`);
                console.log('Delete result:', del.status);
            }
        }
    }
    
    // Step 3: Create A record for apex domain
    console.log('\n=== Step 3: Creating A record for hamsaholdings.com ===');
    const aRecord = await apiRequest('POST', `/api/v1/dns_zones/${zoneId}/dns_records`, {
        type: 'A',
        hostname: 'hamsaholdings.com',
        value: '75.2.60.5',
        ttl: 3600
    });
    console.log('A record result:', JSON.stringify(aRecord.data, null, 2));
    
    // Step 4: Create CNAME record for www
    console.log('\n=== Step 4: Creating CNAME record for www ===');
    const cnameRecord = await apiRequest('POST', `/api/v1/dns_zones/${zoneId}/dns_records`, {
        type: 'CNAME',
        hostname: 'www.hamsaholdings.com',
        value: 'famous-salmiakki-36ce9f.netlify.app',
        ttl: 3600
    });
    console.log('CNAME record result:', JSON.stringify(cnameRecord.data, null, 2));
    
    // Step 5: Verify new records
    console.log('\n=== Step 5: Verify new records ===');
    const newRecords = await apiRequest('GET', `/api/v1/dns_zones/${zoneId}/dns_records`);
    if (Array.isArray(newRecords.data)) {
        newRecords.data.forEach(r => {
            console.log(`${r.type}\t${r.hostname}\t${r.value}`);
        });
    } else {
        console.log(JSON.stringify(newRecords.data, null, 2));
    }
    
    console.log('\n=== Done! DNS should propagate within a few minutes. ===');
}

main().catch(console.error);
