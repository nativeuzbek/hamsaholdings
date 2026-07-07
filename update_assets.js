const fs = require('fs');
const files = fs.readdirSync('templates').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let p = 'templates/' + f;
    let c = fs.readFileSync(p, 'utf8');
    
    // Static assets
    c = c.replace(/href="style\.css"/g, 'href="/static/style.css"');
    c = c.replace(/src="app\.js"/g, 'src="/static/app.js"');
    c = c.replace(/<script src="cars-data\.js"><\/script>/g, '');
    c = c.replace(/src="images\//g, 'src="/static/images/');
    
    // Routing links
    c = c.replace(/href="home\.html"/g, 'href="/"');
    c = c.replace(/href="inventory\.html"/g, 'href="/inventory"');
    c = c.replace(/href="about\.html"/g, 'href="/about"');
    c = c.replace(/href="shipping\.html"/g, 'href="/shipping"');
    c = c.replace(/href="contact\.html"/g, 'href="/contact"');
    c = c.replace(/href="how-it-works\.html"/g, 'href="/how-it-works"');
    
    fs.writeFileSync(p, c, 'utf8');
    console.log('Updated ' + p);
});
