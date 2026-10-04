#!/usr/bin/env node
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const WIKI_DIR = __dirname;
const PUBLIC_DIR = path.join(WIKI_DIR, 'public');
const CSS_PATH = '/css/wiki-style.css';
const SITE_URL = 'https://vlisson.github.io/Eternity-LitRpg';
const CURRENT_DATE = '2026-10-04';

// Unified CSS from optimize.sh (we'll keep it as a string for potential inline use, but we are linking externally)
const UNIFIED_CSS = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #e0e0e0; min-height: 100vh; padding: 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
nav { background: rgba(255, 215, 0, 0.15); border-bottom: 2px solid #ffd700; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100; }
nav .logo { font-size: 1.5em; font-weight: bold; color: #ffd700; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
nav ul { display: flex; list-style: none; gap: 5px; }
nav ul li a { color: #4fc3f7; text-decoration: none; padding: 8px 16px; border-radius: 5px; transition: all 0.3s ease; font-weight: 500; }
nav ul li a:hover { background: rgba(255, 215, 0, 0.2); color: #ffd700; transform: translateY(-2px); }
main { background: rgba(255, 255, 255, 0.05); border-radius: 15px; padding: 30px; margin-top: 20px; border: 1px solid rgba(255, 215, 0, 0.2); backdrop-filter: blur(5px); }
h1 { color: #ffd700; border-bottom: 3px solid #ffd700; padding-bottom: 15px; margin-bottom: 25px; font-size: 2.2em; text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3); }
h2 { color: #4fc3f7; margin-top: 35px; margin-bottom: 15px; border-left: 4px solid #ffd700; padding-left: 15px; }
h3 { color: #e0e0e0; margin-top: 25px; margin-bottom: 10px; }
p { line-height: 1.8; margin-bottom: 15px; color: #c8c8c8; }
a { color: #ffd700; text-decoration: none; transition: color 0.3s ease; }
a:hover { color: #4fc3f7; text-decoration: underline; }
table { width: 100%; border-collapse: collapse; margin: 15px 0; background: rgba(255, 255, 255, 0.05); border-radius: 8px; overflow: hidden; }
th { background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%); color: #1a1a2e; padding: 12px 15px; text-align: left; font-weight: 600; }
td { padding: 10px 15px; border-bottom: 1px solid rgba(255, 215, 0, 0.1); color: #c8c8c8; }
tr:hover td { background: rgba(255, 215, 0, 0.05); }
ul, ol { margin: 10px 0 10px 20px; }
li { margin-bottom: 8px; line-height: 1.6; color: #c8c8c8; }
code, pre { background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; padding: 10px; color: #ffd700; font-family: 'Courier New', monospace; }
pre code { background: none; border: none; }
footer { text-align: center; padding: 20px; margin-top: 30px; border-top: 1px solid rgba(255, 215, 0, 0.2); color: #888; font-size: 0.9em; }
.card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 10px; padding: 20px; margin: 15px 0; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.card:hover { transform: translateY(-3px); box-shadow: 0 5px 20px rgba(255, 215, 0, 0.15); }
.badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: 600; }
.badge-gold { background: rgba(255, 215, 0, 0.2); color: #ffd700; }
.badge-blue { background: rgba(79, 195, 247, 0.2); color: #4fc3f7; }
.badge-green { background: rgba(76, 175, 80, 0.2); color: #4caf50; }
.badge-red { background: rgba(244, 67, 54, 0.2); color: #f44336; }
.search-box { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 10px; padding: 30px; margin: 20px 0; text-align: center; }
.search-box input[type="text"] { width: 70%; padding: 12px 20px; border: 2px solid rgba(255, 215, 0, 0.3); border-radius: 8px; background: rgba(255, 255, 255, 0.08); color: #e0e0e0; font-size: 1.1em; outline: none; transition: border-color 0.3s ease; }
.search-box input[type="text"]:focus { border-color: #ffd700; }
.search-box button { padding: 12px 30px; background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%); color: #1a1a2e; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-left: 10px; transition: transform 0.3s ease; }
.search-box button:hover { transform: scale(1.05); }
.search-results { margin-top: 20px; }
.result-item { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 215, 0, 0.15); border-radius: 8px; padding: 15px; margin: 10px 0; transition: all 0.3s ease; }
.result-item:hover { background: rgba(255, 215, 0, 0.08); border-color: #ffd700; }
.result-title { color: #ffd700; font-weight: bold; font-size: 1.1em; }
.quote {
    background: rgba(255, 255, 255, 0.05);
    border-left: 4px solid #ffd700;
    padding: 20px;
    margin: 25px 0;
    font-style: italic;
    border-radius: 0 8px 8px 0;
}
.infobox {
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-top: 40px;
}
.character-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
    transition: all 0.3s ease;
}
.character-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
@media (max-width: 768px) {
    .container { padding: 15px; }
    h1 { font-size: 2em; }
    nav ul li a { display: block; margin: 5px 0; }
}
`;

const NAV = `<nav><div class="logo">🐉 Eternity Wiki</div><ul><li><a href="/">🏠 Startseite</a></li><li><a href="/characters.html">👥 Charaktere</a></li><li><a href="/world.html">🌍 Welt</a></li><li><a href="/timeline.html">📅 Zeitlinie</a></li><li><a href="/search.html">🔍 Suche</a></li></ul></nav>`;
const FOOTER = `<footer><p>Erstellt mit Draco Codex — LitRPG Wiki Engine | Letzte Aktualisierung: ${CURRENT_DATE}</p></footer>`;

function renderPage(title, content, outputFilename = null) {
  const canonical = outputFilename
    ? `${SITE_URL}/${outputFilename.replace(/\//g, '/')}`
    : `${SITE_URL}/`;
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} - Eternity Wiki</title><link rel="stylesheet" href="${CSS_PATH}"><link rel="canonical" href="${canonical}"><meta name="last-modified" content="${CURRENT_DATE}"></head><body>${NAV}<main class="container">${content}</main>${FOOTER}</body></html>`;
}

function resolveWikiLinksWithSet(text, entityNames) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
    const name = p1.trim();
    if (entityNames.has(name)) {
      const entityDirs = ['characters', 'skills', 'items', 'locations', 'quests', 'classes-races', 'lore', 'chapters'];
      for (const dir of entityDirs) {
        const filePath = path.join(WIKI_DIR, dir, `${name}.md`);
        if (fs.existsSync(filePath)) {
          return `<a href="/${dir}/${name}.html">${name}</a>`;
        }
      }
      const rootPages = ['index', 'world', 'timeline', 'search', 'skills', 'quests', 'items', 'lore'];
      if (rootPages.includes(name)) {
        return `<a href="/${name}.html">${name}</a>`;
      }
      return match;
    }
    return match;
  });
}

function getEntityNames() {
  const entityDirs = ['characters', 'skills', 'items', 'locations', 'quests', 'classes-races', 'lore', 'chapters'];
  const names = new Set();
  for (const dir of entityDirs) {
    const dirPath = path.join(WIKI_DIR, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const name = file.slice(0, -3);
          names.add(name);
        }
      }
    }
  }
  return names;
}

function generateIndex() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'index.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), renderPage('Eternity Wiki', html, 'index.html'));
  console.log('✅ index.md → index.html');
}

function generateWorld() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'world.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'world.html'), renderPage('Welt & Lore', html, 'world.html'));
  console.log('✅ world.md → world.html');
}

function generateCharacters() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'characters.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'characters.html'), renderPage('Charaktere', html, 'characters.html'));
  console.log('✅ characters.md → characters.html');
}

function generateTimeline() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'timeline_buch1.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'timeline.html'), renderPage('Zeitlinie', html, 'timeline.html'));
  console.log('✅ timeline_buch1.md → timeline.html');
}

function generateSearch() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'wiki_index.md'), 'utf-8');
  const entityNames = getEntityNames();
  let html = marked.parse(md);
  html = resolveWikiLinksWithSet(html, entityNames);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'search.html'), renderPage('Suche', html, 'search.html'));
  console.log('✅ wiki_index.md → search.html');
}

function generateSkills() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'skills/README.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'skills.html'), renderPage('Fähigkeiten', html, 'skills.html'));
  console.log('✅ skills/README.md → skills.html');
}

function generateQuests() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'quests/README.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'quests.html'), renderPage('Quests', html, 'quests.html'));
  console.log('✅ quests/README.md → quests.html');
}

function generateItems() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'items/README.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'items.html'), renderPage('Items', html, 'items.html'));
  console.log('✅ items/README.md → items.html');
}

function generateLore() {
  const md = fs.readFileSync(path.join(WIKI_DIR, 'lore/README.md'), 'utf-8');
  const html = marked.parse(md);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'lore.html'), renderPage('Lore', html, 'lore.html'));
  console.log('✅ lore/README.md → lore.html');
}

function generateEntityPages() {
  const dirs = [
    { dir: 'characters', outDir: 'characters' },
    { dir: 'skills', outDir: 'skills' },
    { dir: 'items', outDir: 'items' },
    { dir: 'locations', outDir: 'locations' },
    { dir: 'quests', outDir: 'quests' },
    { dir: 'classes-races', outDir: 'classes-races' },
    { dir: 'lore', outDir: 'lore' },
    { dir: 'chapters', outDir: 'chapters' }
  ];
  
  const entityNames = getEntityNames();
  
  for (const { dir, outDir } of dirs) {
    const outPath = path.join(PUBLIC_DIR, outDir);
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
    const dirPath = path.join(WIKI_DIR, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'README.md');
      for (const file of files) {
        let md = fs.readFileSync(path.join(dirPath, file), 'utf-8');
        md = resolveWikiLinksWithSet(md, entityNames);
        const html = marked.parse(md);
        const name = file.replace('.md', '');
        const title = name.replace(/_/g, ' ');
        const outFilePath = path.join(outPath, `${name}.html`);
        const relPath = `${outDir}/${name}.html`;
        fs.writeFileSync(outFilePath, renderPage(title, html, relPath));
        console.log(`  ✅ ${dir}/${file} → ${outDir}/${name}.html`);
      }
    }
  }
}

console.log('🔨 Building Eternity Wiki with link resolution...');
console.log('📄 Generating main pages...');
generateIndex();
generateWorld();
generateCharacters();
generateTimeline();
generateSearch();
generateSkills();
generateQuests();
generateItems();
generateLore();

console.log('📂 Generating entity pages...');
generateEntityPages();

console.log('✅ Build complete!');