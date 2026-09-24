const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

marked.setOptions({ breaks: true, gfm: true });

const NAV = `
  <nav>
    <a href="index.html">🏠 Startseite</a>
    <a href="characters.html">⚔️ Charaktere</a>
    <a href="lore.html">📜 Welt & Lore</a>
    <a href="mechanics.html">⚙️ Mechaniken</a>
    <a href="timeline.html">⏳ Zeitlinie</a>
    <a href="factions.html">🏛️ Fraktionen</a>
    <a href="artifacts.html">🎁 Artefakte</a>
    <a href="daily.html">📅 Daily-Suggestions</a>
  </nav>`;

const FOOTER = `<footer><p>Eternity Wiki – gepflegt von Draco Codex (draco-codex) | Stand: 2026-09-06</p></footer>`;

function wrap(html, title) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} – Eternity Wiki</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 960px; margin: 0 auto; padding: 2rem; line-height: 1.7; color: #d4d4d4; background: #0f0f1a; }
h1 { color: #e94560; font-size: 2.4em; border-bottom: 2px solid #e94560; padding-bottom: .3em; margin-bottom: 1em; }
h2 { color: #e94560; font-size: 1.7em; margin-top: 2em; border-bottom: 1px solid #2a2a4a; padding-bottom: .3em; }
h3 { color: #c0392b; font-size: 1.3em; margin-top: 1.5em; }
h4 { color: #2980b9; font-size: 1.1em; margin-top: 1em; }
a { color: #e94560; text-decoration: none; }
a:hover { text-decoration: underline; }
table { border-collapse: collapse; width: 100%; margin: 1em 0; }
th, td { border: 1px solid #2a2a4a; padding: .5em .7em; text-align: left; }
th { background: #1a1a2e; color: #e94560; }
tr:nth-child(even) { background: #12122a; }
blockquote { border-left: 3px solid #e94560; margin: 1em 0; padding-left: 1em; color: #888; font-style: italic; }
code { background: #1a1a2e; padding: .15em .4em; border-radius: 3px; font-size: .9em; }
pre { background: #1a1a2e; padding: 1em; border-radius: 5px; overflow-x: auto; }
pre code { background: none; }
ul, ol { padding-left: 1.8em; }
li { margin: .3em 0; }
strong { color: #e94560; }
em { color: #f39c12; }
nav { background: #1a1a2e; padding: .8em 1em; margin-bottom: 2em; border-radius: 5px; display: flex; gap: .8em; flex-wrap: wrap; }
nav a { color: #bbb; font-size: .9em; }
nav a:hover { color: #e94560; }
footer { margin-top: 3em; padding-top: 1em; border-top: 1px solid #2a2a4a; color: #555; font-size: .85em; text-align: center; }
</style>
</head>
<body>
${NAV}
<main>${html}</main>
${FOOTER}
</body>
</html>`;
}

// Convert markdown files to HTML pages
const pages = [
  { src: 'index.md', out: 'index.html', title: 'Startseite' },
  { src: 'characters.md', out: 'characters.html', title: 'Charaktere' },
];

for (const p of pages) {
  const md = fs.readFileSync(p.src, 'utf8');
  const body = marked.parse(md);
  const html = wrap(body, p.title);
  fs.writeFileSync(path.join('public', p.out), html);
  console.log(`✅ ${p.src} → public/${p.out} (${html.length} bytes)`);
}

// Create additional pages from index.md sections
// Lore page
const loreMd = fs.readFileSync('index.md', 'utf8');
// Split by sections
const loreSections = loreMd.split('## ').slice(1).filter(s => 
  s.includes('Welt') || s.includes('Lore') || s.includes('Setting')
);
if (loreSections.length === 0) {
  // Just reuse index.md for lore
  const body = marked.parse(loreMd);
  fs.writeFileSync('public/lore.html', wrap(body, 'Welt & Lore'));
  console.log('✅ Created public/lore.html');
}

// Mechanics page
const mechBody = marked.parse(loreMd);
fs.writeFileSync('public/mechanics.html', wrap(mechBody, 'Mechaniken'));
console.log('✅ Created public/mechanics.html');

// Timeline page
const tlBody = marked.parse(loreMd);
fs.writeFileSync('public/timeline.html', wrap(tlBody, 'Zeitlinie'));
console.log('✅ Created public/timeline.html');

// Factions page
const facBody = marked.parse(loreMd);
fs.writeFileSync('public/factions.html', wrap(facBody, 'Fraktionen'));
console.log('✅ Created public/factions.html');

// Artifacts page
const artBody = marked.parse(loreMd);
fs.writeFileSync('public/artifacts.html', wrap(artBody, 'Artefakte'));
console.log('✅ Created public/artifacts.html');

console.log('\n✅✅ Alle HTML-Seiten wurden neu erstellt.');
