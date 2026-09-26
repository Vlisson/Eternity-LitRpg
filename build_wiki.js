#!/usr/bin/env node
// build_wiki.js - Eternity Wiki Build Script
// Nutzt externes CSS, SEO-Metadaten & Inhaltsverzeichnis

const marked = require('marked');
const fs = require('fs');
const path = require('path');

// Konfiguration
const SOURCE_DIR = __dirname;
const OUTPUT_DIR = path.join(__dirname, 'public');
const SITE_URL = process.env.SITE_URL || 'https://eternitylitrpg.netlify.app';
const SITE_NAME = 'Eternity Wiki';

// Pfad-Hilfe: relativen CSS-Pfad basierend auf Tiefe der Output-Datei
function cssPath(outputFilename) {
  const depth = (outputFilename.match(/\//g) || []).length;
  return `${'../'.repeat(depth)}css/style.css`;
}

function siteUrl(outputFilename) {
  const base = SITE_URL.replace(/\/$/, '');
  const depth = (outputFilename.match(/\//g) || []).length;
  const suffix = depth === 0 ? '/' : '/' + outputFilename;
  return base + suffix;
}

// Navigation-Items
const NAVIGATION_ITEMS = [
  { href: 'index.html', icon: '🏠', label: 'Startseite' },
  { href: 'characters.html', icon: '⚔️', label: 'Charaktere' },
  { href: 'skills.html', icon: '⚡', label: 'Skills' },
  { href: 'items.html', icon: '🗡️', label: 'Items' },
  { href: 'locations.html', icon: '🌍', label: 'Orte' },
  { href: 'classes-races.html', icon: '⚙️', label: 'Klassen/Rassen' },
  { href: 'quests.html', icon: '📜', label: 'Quests' },
  { href: 'lore.html', icon: '📚', label: 'Lore' },
  { href: 'timeline.html', icon: '⏳', label: 'Zeitlinie' },
  { href: 'factions.html', icon: '🏛️', label: 'Fraktionen' },
  { href: 'artifacts.html', icon: '🎁', label: 'Artefakte' },
  { href: 'entity_report.html', icon: '📊', label: 'Entity-Report' },
  { href: 'impressum.html', icon: 'ℹ️', label: 'Impressum' },
  { href: 'Änderungen.html', icon: '📋', label: 'Änderungen' }
];

// Navigation HTML mit aktiver Hervorhebung
function getNavigationHtml(currentPage) {
  const items = NAVIGATION_ITEMS.map(item => {
    const active = item.href === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="${active}">${item.icon} ${item.label}</a>`;
  }).join('');
  return `<nav>${items}</nav>`;
}

// Footer
const footer = `<footer>
  <p>Eternity Wiki – Inhalt basiert auf Büchern von Vlisson | Plattform, Struktur & Pflege durch Draco Codex (KI) | Stand: 2026-09-25 15:00</p>
  <p><a href="impressum.html">ℹ️ Impressum & KI-Hinweis</a></p>
  <p><a href="Änderungen.html">📋 Änderungen</a> | <a href="sitemap.xml">Sitemap</a></p>
</footer>`;

// Slug für Anker-IDs mit Sicherheit
function slugify(text) {
  if (typeof text !== 'string' || !text) return '';
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

// Inhaltsverzeichnis (nur ## und ### Überschriften)
function generateToc(md) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(md)) !== null) {
    const level = match[1].length;
    const text = match[2]?.trim() ?? '';
    if (text) {
      headings.push({ level, text, id: slugify(text) });
    }
  }
  if (headings.length < 2) return '';
  let html = '<nav class="toc"><h3>📑 Inhaltsverzeichnis</h3><ul>';
  headings.forEach(h => {
    html += `<li class="toc-${h.level}"><a href="#${h.id}">${h.text}</a></li>`;
  });
  return html + '</ul></nav>';
}

// Markdown-Renderer mit Anker-IDs
const renderer = new marked.Renderer();
renderer.heading = function(token) {
  const text = this.parser.parseInline(token.tokens);
  const id = slugify(text);
  return `<h${token.depth} id="${id}">${text}</h${token.depth}>`;
};

// SEO-Metadaten für jede Seite
function getSeoMeta(title, isIndex = false, canonicalUrl) {
  const description = isIndex
    ? 'Eternity Wiki – Comprehensive LitRPG resource with characters, skills, items, locations, quests and lore from the books of Vlisson'
    : `Eternity Wiki – ${title}. Detailed information about ${title.toLowerCase()}.`;
  const url = canonicalUrl || (isIndex ? SITE_URL + '/' : SITE_URL + '/' + title + '.html');
  return `
  <meta name="description" content="${description}">
  <meta name="keywords" content="Eternity,Vlisson,LitRPG,Wiki,Charaktere,Skills,Items,Locations,Quests,Lore">
  <meta name="author" content="Vlisson">
  <link rel="canonical" href="${url}">
  <!-- Open Graph -->
  <meta property="og:title" content="${title} – ${SITE_NAME}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="${isIndex ? 'website' : 'article'}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:image" content="${SITE_URL}/favicon.svg">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} – ${SITE_NAME}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${SITE_URL}/favicon.svg">
`;
}

// HTML Template
function mdToHtml(md, title, isIndex = false) {
  const toc = generateToc(md);
  const body = marked.parse(md, { renderer });
  const currentPage = path.basename(title) + '.html';
  const nav = getNavigationHtml(currentPage);
  const tocBlock = toc ? `<div class="toc-wrapper">${toc}</div>` : '';
  const cssHref = cssPath(currentPage);
  const canonical = siteUrl(currentPage);
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">${getSeoMeta(title, isIndex, canonical)}
  <title>${title} – ${SITE_NAME}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssHref}">
</head>
<body>
  ${nav}
  <main>
    ${tocBlock}
    ${body}
  </main>
  ${footer}
  <script>
  // Cross-host canonical fallback: nutzt SITE_URL aus Umgebungsvariablen,
  // fall back auf window.location.origin fuer Cloudflare Workers
  if (window.__SITE_URL__) { document.querySelectorAll('link[rel=\"canonical\"]').forEach(function(l){ l.href = l.href.replace('https://eternitylitrpg.netlify.app', window.__SITE_URL__); }); }
  </script>
</body>
</html>`;
}

// Process markdown file
function processMarkdownFile(inputPath, outputFilename, title, isIndex = false) {
  try {
    const md = fs.readFileSync(inputPath, 'utf8');
    const html = mdToHtml(md, title, isIndex);
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, html);
    console.log(`✅ ${inputPath} → ${outputFilename}`);
    return true;
  } catch (error) {
    console.log(`❌ ${inputPath} → Fehler: ${error.message}`);
    return false;
  }
}

// Generate directory listing with HTML links (entity folder prefix)
function generateDirectoryPage(dirPath, pageName, title, entityFolder) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  ${dirPath} nicht gefunden, überspringe`);
      return false;
    }
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'README.md');
    if (files.length === 0) {
      console.log(`⚠️  Keine .md-Dateien in ${dirPath}, überspringe`);
      return false;
    }
    let content = `# ${title}\n\n`;
    content += `> ${entityFolder} aus Eternity – Buch 1 und Buch 2.\n\n`;
    content += `<div class="entity-grid">\n\n`;
    
    files.forEach(file => {
      const name = path.basename(file, '.md');
      const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
      content += `- [${displayName}](${entityFolder}/${name}.html)\n`;
    });
    
    content += `\n</div>`;
    
    const outputFilename = pageName;
    const html = mdToHtml(content, title, false, outputFilename);
    fs.writeFileSync(path.join(OUTPUT_DIR, pageName), html);
    console.log(`✅ ${dirPath} → ${pageName}`);
    return true;
  } catch (error) {
    console.log(`❌ ${dirPath} → Fehler: ${error.message}`);
    return false;
  }
}

// Generate Änderungen page
function generateÄnderungenPage() {
  try {
    const inputPath = path.join(SOURCE_DIR, 'Änderungen.md');
    if (!fs.existsSync(inputPath)) {
      console.log('⚠️  Änderungen.md nicht gefunden');
      return false;
    }
    const outputFilename = 'Änderungen.html';
    const html = mdToHtml(
      fs.readFileSync(inputPath, 'utf8'),
      'Änderungen',
      false,
      outputFilename
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, outputFilename), html);
    console.log(`✅ ${inputPath} → ${outputFilename}`);
    return true;
  } catch (error) {
    console.log(`❌ Änderungen.md → Fehler: ${error.message}`);
    return false;
  }
}

// Generate individual entity pages from .md files in a folder
function generateEntityPages(sourceDir, entityType) {
  try {
    if (!fs.existsSync(sourceDir)) return 0;
    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md') && f !== 'README.md');
    let count = 0;
    for (const file of files) {
      const name = path.basename(file, '.md');
      const outputPath = `${path.basename(sourceDir)}/${name}.html`;
      const displayName = entityType + ' – ' + name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
      if (processMarkdownFile(
        path.join(sourceDir, file),
        outputPath,
        displayName,
        false
      )) {
        count++;
      }
    }
    return count;
  } catch (error) {
    console.log(`❌ ${sourceDir} → Fehler: ${error.message}`);
    return 0;
  }
}

// Copy CSS to public
function copyCss() {
  const src = path.join(SOURCE_DIR, 'style.css');
  const destDir = path.join(OUTPUT_DIR, 'css');
  const dest = path.join(destDir, 'style.css');
  
  if (!fs.existsSync(src)) {
    console.log('⚠️  style.css nicht gefunden');
    return false;
  }
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
  console.log('✅ style.css → public/css/style.css');
  return true;
}

// Generate sitemap
function generateSitemap() {
  const htmlFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.html'));
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  htmlFiles.forEach(page => {
    const url = page === 'index.html' ? SITE_URL + '/' : SITE_URL + '/' + page;
    sitemap += `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-09-25</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`);
  console.log('✅ sitemap.xml & robots.txt generiert');
}

// Main build
function build() {
  console.log('🚀 Starte Build-Prozess...\n');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Header
  const faviconSrc = path.join(SOURCE_DIR, 'favicon.svg');
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, path.join(OUTPUT_DIR, 'favicon.svg'));
  }
  
  copyCss();
  
  let successCount = 0;
  let errorCount = 0;
  
  console.log('\n📄 Hauptseiten...');
  if (processMarkdownFile(path.join(SOURCE_DIR, 'index.md'), 'index.html', 'Startseite', true)) successCount++; else errorCount++;
  if (processMarkdownFile(path.join(SOURCE_DIR, 'characters.md'), 'characters.html', 'Charaktere')) successCount++; else errorCount++;
  
  // Einzelne Charakter-Seiten aus characters/ Verzeichnis
  console.log('\n⚔️ Charakter-Seiten...');
  const charCount = generateEntityPages(path.join(SOURCE_DIR, 'characters'), 'Charakter');
  if (charCount > 0) successCount += charCount; else errorCount++;
  
  console.log('\n📊 Analyse-Seiten...');
  if (processMarkdownFile(path.join(SOURCE_DIR, 'wiki', 'analysis_buch1.md'), 'analysis_buch1.html', 'Analyse Buch 1')) successCount++; else errorCount++;
  if (processMarkdownFile(path.join(SOURCE_DIR, 'wiki', 'analysis_buch2.md'), 'analysis_buch2.html', 'Analyse Buch 2')) successCount++; else errorCount++;
  
  console.log('\n📅 Zeitlinien...');
  if (processMarkdownFile(path.join(SOURCE_DIR, 'wiki', 'chapters', 'Timeline_buch1.md'), 'timeline_buch1.html', 'Zeitlinie Buch 1')) successCount++; else errorCount++;
  if (processMarkdownFile(path.join(SOURCE_DIR, 'wiki', 'chapters', 'Timeline_buch2.md'), 'timeline_buch2.html', 'Zeitlinie Buch 2')) successCount++; else errorCount++;
  
  console.log('\n📋 Entity-Report...');
  if (processMarkdownFile(path.join(SOURCE_DIR, 'meta', 'entity_report.md'), 'entity_report.html', 'Entity-Report')) successCount++; else errorCount++;
  
  console.log('\n📚 Entity-Seiten...');
  const skillsCount = generateEntityPages(path.join(SOURCE_DIR, 'skills'), 'Fähigkeit');
  const itemsCount = generateEntityPages(path.join(SOURCE_DIR, 'items'), 'Gegenstand');
  const locCount = generateEntityPages(path.join(SOURCE_DIR, 'locations'), 'Ort');
  const classCount = generateEntityPages(path.join(SOURCE_DIR, 'classes-races'), 'Rasse/Klasse');
  const questCount = generateEntityPages(path.join(SOURCE_DIR, 'quests'), 'Quest');
  
  console.log('\n📑 Verzeichnisse...');
  if (generateDirectoryPage(path.join(SOURCE_DIR, 'skills'), 'skills.html', '⚡ Fähigkeiten / Skills', 'skills')) successCount++; else errorCount++;
  if (generateDirectoryPage(path.join(SOURCE_DIR, 'items'), 'items.html', '🗡️ Gegenstände / Items', 'items')) successCount++; else errorCount++;
  if (generateDirectoryPage(path.join(SOURCE_DIR, 'locations'), 'locations.html', '🌍 Orte / Locations', 'locations')) successCount++; else errorCount++;
  if (generateDirectoryPage(path.join(SOURCE_DIR, 'classes-races'), 'classes-races.html', '⚙️ Klassen / Rassen', 'classes-races')) successCount++; else errorCount++;
  if (generateDirectoryPage(path.join(SOURCE_DIR, 'quests'), 'quests.html', '📜 Quests', 'quests')) successCount++; else errorCount++;
  
  console.log('\n📖 Lore-Seiten...');
  if (processMarkdownFile(path.join(SOURCE_DIR, 'lore', 'LORE.md'), 'lore.html', 'Lore / Weltinformationen')) successCount++; else errorCount++;
  
  console.log('\n🏛️ Fraktionen & Artefakte...');
  // Einzelne Charakter-Seiten aus characters/ Verzeichnis generieren
  console.log('\n⚔️ Charakter-Seiten...');
  // charCount bereits oben deklariert (Zeile 328), hier nur addieren
  const newCharCount = generateEntityPages(path.join(SOURCE_DIR, 'characters'), 'Charakter');
  if (newCharCount > 0) successCount += newCharCount; else errorCount++;
  
  console.log('\nℹ️ Impressum...');
  const impressum = `# Impressum & KI-Hinweis

**Eternity Wiki**
Eternity LitRPG Wiki

## Inhaltliche Urheberschaft
Die Inhalte dieses Wikis basieren auf den Büchern **Eternity** (Buch 1 & Buch 2) von **Vlisson**. Alle literarischen Texte, Welten, Charaktere und Mechaniken stammen aus diesen Büchern.

## Technische Pflege & Plattform
Dieses Wiki wird von **Draco Codex** betrieben. Draco Codex ist eine **KI** (künstliche Intelligenz), die:
- die Wiki-Struktur erstellt und pflegt
- Markdown-Quellen in HTML-Seiten umwandelt
- Navigation, Footer und Seitengenerierung automatisiert
- das Design (Blau/Silber-Design) verwaltet

**Hinweis zu KI-generierten Inhalten:**
Der Text, die Struktur und die Darstellung dieses Wikis wurden von der KI Draco Codex auf Basis der Buchvorlagen zusammengestellt. Die ursprünglichen Inhalte liegen bei Vlisson.

## Kontakt
E-Mail: Eternity-LitRpg@online.de

## Quellen
- Eternity Buch 1 (Vlisson) – Kindle Unlimited / Amazon.de
- Eternity Buch 2 (Vlisson) – Rohfassung

## Lizenz
Dieses Wiki ist eine Fan-Seite, steht in keiner Verbindung zu den offiziellen Rechteinhabern.

*Erstellt am 2026-09-11*`;
  
  if (processMarkdownFile(path.join(SOURCE_DIR, 'impress.md'), 'impressum.html', 'Impressum')) successCount++; else errorCount++;
  
  console.log('\n📋 Änderungen...');
  if (generateÄnderungenPage()) successCount++; else errorCount++;
  
  console.log('\n🌐 Generiere SEO-Dateien...');
  generateSitemap();
  
  console.log('\n📊 Build-Zusammenfassung:');
  console.log(`✅ erfolgreich: ${successCount}`);
  console.log(`⚡ Skills-Seiten: ${skillsCount}`);
  console.log(`🗡️ Items-Seiten: ${itemsCount}`);
  console.log(`🌍 Locations-Seiten: ${locCount}`);
  console.log(`⚙️ Klassen/Rassen-Seiten: ${classCount}`);
  console.log(`📜 Quests-Seiten: ${questCount}`);
  console.log(`❌ Fehler: ${errorCount}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  
  if (errorCount === 0) console.log('\n✅ Build erfolgreich!');
}

build();