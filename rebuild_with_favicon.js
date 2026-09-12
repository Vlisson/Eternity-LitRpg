const fs = require('fs');
const path = require('path');

// Read favicon SVG
const faviconSvg = fs.readFileSync('favicon.svg', 'utf8');

// Simple SVG to inline favicon
fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('✅ favicon.svg copied to public/');

// Create a simple HTML meta injection script
const pages = ['index.html', 'characters.html', 'lore.html', 'mechanics.html', 'timeline.html', 'factions.html', 'artifacts.html', 'daily.html'];

for (const page of pages) {
  const filepath = path.join('public', page);
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  ${filepath} not found, skipping`);
    continue;
  }
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Add favicon link in head
  if (!content.includes('favicon')) {
    content = content.replace(
      '<title>',
      '<link rel="icon" type="image/svg+xml" href="favicon.svg">\n  <title>'
    );
  }
  
  // Add SVG favicon inline as base64 fallback
  const svgBase64 = Buffer.from(faviconSvg).toString('base64');
  if (!content.includes('data:image/svg+xml')) {
    content = content.replace(
      '<link rel="icon"',
      '<link rel="icon" type="image/svg+xml" href="favicon.svg">\n  <link rel="icon" href="data:image/svg+xml;base64,' + svgBase64 + '">'
    );
  }
  
  fs.writeFileSync(filepath, content);
  console.log(`✅ Updated ${page} with favicon`);
}

console.log('\n✅✅ Favicon added to all pages.');
