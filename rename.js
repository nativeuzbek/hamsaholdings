const fs = require('fs');

if (fs.existsSync('index.html')) {
    fs.renameSync('index.html', 'home.html');
}

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/href="index\.html"/g, 'href="home.html"');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
