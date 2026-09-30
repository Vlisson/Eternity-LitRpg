const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const WIKI_DIR = path.join(__dirname, 'public');

function renderPage(urlPath) {
  let pagePath = urlPath;
  if (pagePath === '/') pagePath = 'index.html';
  
  const filePath = path.join(WIKI_DIR, pagePath);
  if (!fs.existsSync(filePath)) return null;
  
  return fs.readFileSync(filePath, 'utf-8');
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'text/plain';
  }
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  
  const page = renderPage(urlPath);
  
  if (page) {
    const contentType = getContentType(path.extname(urlPath === '/' ? 'index.html' : urlPath));
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(page);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<html><body style="background:#1a1a2e;color:#e0e0e0;padding:40px;text-align:center;"><h1 style="color:#e94560;">404</h1><p>Seite nicht gefunden</p></body></html>');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Eternity Wiki läuft auf http://localhost:${PORT}`);
  console.log(`📖 Wiki-Seiten:`);
  console.log(`   - http://localhost:${PORT}/`);
});