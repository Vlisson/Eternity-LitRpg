#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const WIKI_DIR = __dirname;
const META_DIR = path.join(WIKI_DIR, 'meta');

// Read all chapter entity files
const entityFiles = [
  'chapter_001_entities.json',
  'chapter_002_entities.json',
  'chapter_002_part2_entities.json',
  'chapter_002_part3_entities.json'
];

let merged = {
  last_updated: new Date().toISOString().split('T')[0],
  total_chapters_processed: 2,
  characters_master: {},
  locations_master: {},
  items_master: {},
  skills_master: {},
  quests_master: {},
  races_master: {},
  classes_master: {},
  factions_master: {}
};

function mergeEntity(master, entity, chapter) {
  if (!master[entity.name]) {
    master[entity.name] = { ...entity, first_appearance: chapter };
    if (!entity.first_appearance) entity.first_appearance = chapter;
  } else {
    // Merge additional info
    Object.assign(master[entity.name], entity);
    // Keep earliest chapter
    if (entity.first_appearance && (!master[entity.name].first_appearance || entity.first_appearance < master[entity.name].first_appearance)) {
      master[entity.name].first_appearance = entity.first_appearance;
    }
  }
}

for (const file of entityFiles) {
  const filePath = path.join(META_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const chapter = data.chapter_id || file.replace('.json', '');
  
  // Characters
  if (data.characters_appeared) {
    for (const c of data.characters_appeared) mergeEntity(merged.characters_master, c, chapter);
  }
  // Locations
  if (data.locations_mentioned) {
    for (const l of data.locations_mentioned) mergeEntity(merged.locations_master, l, chapter);
  }
  // Items
  if (data.items_introduced) {
    for (const i of data.items_introduced) mergeEntity(merged.items_master, i, chapter);
  }
  // Skills
  if (data.skills_used) {
    for (const s of data.skills_used) mergeEntity(merged.skills_master, s, chapter);
  }
  // Quests
  if (data.quests) {
    for (const q of data.quests) mergeEntity(merged.quests_master, q, chapter);
  }
  // Factions
  if (data.factions_mentioned) {
    for (const f of data.factions_mentioned) mergeEntity(merged.factions_master, f, chapter);
  }
}

// Read existing master for races/classes
const existingMaster = JSON.parse(fs.readFileSync(path.join(META_DIR, 'master_entities.json'), 'utf-8'));
merged.races_master = { ...existingMaster.races_master, ...merged.races_master };
merged.classes_master = { ...existingMaster.classes_master, ...merged.classes_master };

// Add Buch 2 specific races/classes from entities
const buch2Races = {
  'Tiermensch': { type: 'Standard', first_appearance: 'ch002', description: 'Neue Rasse nach globalem Event' },
  'Dämon': { type: 'Boss', first_appearance: 'ch002', description: 'Mächtige Gegner mit eigenen Dungeons' }
};
const buch2Classes = {
  'Dämonenlord': { type: 'Legendär', first_appearance: 'ch002', description: 'Neue Klasse nach Anubara-Sieg' },
  'Spruchschmied': { type: 'Handwerklich', first_appearance: 'ch002', description: 'Runen- und Manakern-Veredelung' },
  'Edelstein Veredlung': { type: 'Handwerklich', first_appearance: 'ch002', description: 'Edelstein-Veredelung mit Erschöpfungszustand' }
};

Object.assign(merged.races_master, buch2Races);
Object.assign(merged.classes_master, buch2Classes);

fs.writeFileSync(path.join(META_DIR, 'master_entities.json'), JSON.stringify(merged, null, 2));
console.log('✅ master_entities.json updated');
console.log(`Characters: ${Object.keys(merged.characters_master).length}`);
console.log(`Locations: ${Object.keys(merged.locations_master).length}`);
console.log(`Items: ${Object.keys(merged.items_master).length}`);
console.log(`Skills: ${Object.keys(merged.skills_master).length}`);
console.log(`Quests: ${Object.keys(merged.quests_master).length}`);
console.log(`Factions: ${Object.keys(merged.factions_master).length}`);
console.log(`Races: ${Object.keys(merged.races_master).length}`);
console.log(`Classes: ${Object.keys(merged.classes_master).length}`);
