#!/usr/bin/env node
// Wiki Maintenance Script - Automatische Wiki-Optimierung
// Führt regelmäßige Aufgaben aus:
// 1. Build aller HTML-Seiten
// 2. Prüft auf fehlende Entities
// 3. Aktualisiert master_entities.json
// 4. Prüft Konsistenz

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = __dirname;
const OUTPUT_DIR = path.join(__dirname, 'public');
const META_DIR = path.join(SOURCE_DIR, 'meta');

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// 1. Build the wiki
function buildWiki() {
  log('Starting wiki build...');
  try {
    execSync('node build_wiki.js', { cwd: SOURCE_DIR, stdio: 'pipe' });
    log('Build completed successfully');
    return true;
  } catch (error) {
    log(`Build error: ${error.message}`);
    return false;
  }
}

// 2. Check for missing entities
function checkMissingEntities() {
  log('Checking for missing entities...');
  const missing = [];
  
  // Check if all expected directories have content
  const expectedDirs = ['characters', 'skills', 'items', 'locations', 'classes-races', 'quests', 'lore'];
  expectedDirs.forEach(dir => {
    const dirPath = path.join(SOURCE_DIR, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
      if (files.length === 0) {
        missing.push(`${dir}: empty`);
      }
    } else {
      missing.push(`${dir}: missing directory`);
    }
  });
  
  // Check if public directory has all expected HTML files
  const expectedHtmlFiles = ['index.html', 'characters.html', 'skills.html', 'items.html', 'locations.html', 'classes-races.html', 'quests.html', 'lore.html'];
  expectedHtmlFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (!fs.existsSync(filePath)) {
      missing.push(`HTML: ${file}`);
    }
  });
  
  if (missing.length > 0) {
    log(`Missing entities found: ${missing.join(', ')}`);
  } else {
    log('All expected entities present');
  }
  
  return missing;
}

// 3. Update master_entities.json
function updateMasterEntities() {
  log('Updating master_entities.json...');
  try {
    const entities = {
      characters: fs.readdirSync(path.join(SOURCE_DIR, 'characters')).filter(f => f.endsWith('.md')).length,
      skills: fs.readdirSync(path.join(SOURCE_DIR, 'skills')).filter(f => f.endsWith('.md')).length,
      items: fs.readdirSync(path.join(SOURCE_DIR, 'items')).filter(f => f.endsWith('.md')).length,
      locations: fs.readdirSync(path.join(SOURCE_DIR, 'locations')).filter(f => f.endsWith('.md')).length,
      classes_races: fs.readdirSync(path.join(SOURCE_DIR, 'classes-races')).filter(f => f.endsWith('.md')).length,
      quests: fs.readdirSync(path.join(SOURCE_DIR, 'quests')).filter(f => f.endsWith('.md')).length,
      lore: fs.readdirSync(path.join(SOURCE_DIR, 'lore')).filter(f => f.endsWith('.md')).length
    };
    
    const master = {
      last_updated: new Date().toISOString(),
      entity_counts: entities,
      total_pages: Object.values(entities).reduce((a, b) => a + b, 0),
      html_pages: fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.html')).length,
      build_status: 'success'
    };
    
    fs.writeFileSync(path.join(META_DIR, 'master_entities.json'), JSON.stringify(master, null, 2));
    log('master_entities.json updated');
  } catch (error) {
    log(`Error updating master_entities.json: ${error.message}`);
  }
}

// 4. Check consistency
function checkConsistency() {
  log('Checking wiki consistency...');
  const issues = [];
  
  // Check if character names match between characters.md and individual files
  const charactersMd = fs.readFileSync(path.join(SOURCE_DIR, 'characters.md'), 'utf8');
  const charFiles = fs.readdirSync(path.join(SOURCE_DIR, 'characters')).filter(f => f.endsWith('.md'));
  
  // Simple check - count markdown files vs expected
  const expectedCount = { characters: 25, skills: 13, items: 7, locations: 10, classes_races: 4, quests: 4 };
  
  Object.entries(expectedCount).forEach(([type, count]) => {
    const dir = type.replace('_races', '-races');
    const dirPath = path.join(SOURCE_DIR, dir);
    if (fs.existsSync(dirPath)) {
      const actualCount = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).length;
      if (actualCount < count) {
        issues.push(`${type}: expected ${count}, found ${actualCount}`);
      }
    }
  });
  
  if (issues.length > 0) {
    log(`Consistency issues found: ${issues.join('; ')}`);
  } else {
    log('Wiki consistency check passed');
  }
  
  return issues;
}

// Main maintenance function
function main() {
  log('=== Wiki Maintenance Started ===');
  
  const buildSuccess = buildWiki();
  const missing = checkMissingEntities();
  updateMasterEntities();
  const issues = checkConsistency();
  
  // Log summary
  log('=== Maintenance Summary ===');
  log(`Build: ${buildSuccess ? 'OK' : 'FAILED'}`);
  log(`Missing entities: ${missing.length}`);
  log(`Consistency issues: ${issues.length}`);
  
  if (missing.length > 0 || issues.length > 0) {
    log('Wiki needs attention!');
  } else {
    log('Wiki is healthy and up-to-date');
  }
  
  log('=== Maintenance Complete ===');
}

main();
