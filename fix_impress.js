const fs = require('fs');
const path = path.join(__dirname, 'impress.md');

let content = fs.readFileSync(path, 'utf8');

// Remove lines containing "Markus"
content = content.replace(/Markus/g, '');

// Also fix "Vlisson (Vlisson)" -> "Vlisson"
content = content.replace(/Vlisson \(Vlisson\)/g, 'Vlisson');

fs.writeFileSync(path, content);
console.log('impress.md aktualisiert');
