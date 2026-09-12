#!/usr/bin/env python3
import json
import re
from datetime import datetime

with open("/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/analysis_buch1.md", "r") as f:
    lines = f.readlines()

entities = {
    "characters": [],
    "races": [],
    "locations": [],
    "items": [],
    "skills": [],
    "quests": [],
    "classes": [],
    "mechanics": []
}

# Parse alle Tabellen
def parse_md_table(lines, start_idx):
    """Parse eine Markdown-Tabelle ab start_idx"""
    rows = []
    i = start_idx
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith('|') and not line.startswith('|---'):
            cells = [c.strip() for c in line.split('|')[1:-1]]
            rows.append(cells)
        elif rows and not line.startswith('|'):
            break
        i += 1
    return rows, i

# States
current_section = ""
in_table = False
table_header = []

i = 0
while i < len(lines):
    line = lines[i].rstrip()
    
    # Section headers
    if line.startswith('## 🐉 RASSEN & KREATUREN'):
        current_section = "races"
    elif line.startswith('## 🗺️ ORTE & LOCATIONS'):
        current_section = "locations"
    elif line.startswith('## 🔮 ITEMS & ARTIFAKTE'):
        current_section = "items"
    elif line.startswith('## ⚔️ SKILLS & FÄHIGKEITEN'):
        current_section = "skills"
    elif line.startswith('## 📊 SYSTEM & MECHANIKEN'):
        current_section = "mechanics"
    elif line.startswith('## 🎯 QUEST & STORY'):
        current_section = "quests"
    elif line.startswith('## 🔍 WICHTIGE ENTHÜLLUNGEN'):
        current_section = "revelations"
    elif line.startswith('## 👤 PROTAGONIST'):
        current_section = "protagonist"
    elif line.startswith('## '):
        current_section = line[3:].strip()
    
    # Protagonist: Ben (Dhark)
    if current_section == "protagonist" and '### Ben (Dhark)' in line:
        # Lies bis zum nächsten ### oder ##
        j = i + 1
        char_data = {"name": "Ben (Dhark)", "aliases": ["Ben", "Shadow", "Dhark", "Drache"], "role": "Protagonist", "first_mention": "Kapitel 1", "status": "active"}
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    if key == 'Startname':
                        char_data['start_name'] = val
                    elif key == 'Endname':
                        char_data['end_name'] = val
                    elif key == 'Rasse':
                        char_data['race'] = val
                    elif key == 'Altersstufe':
                        char_data['age_stage'] = val
                    elif key == 'Klasse':
                        char_data['class'] = val
                    elif key == 'Titel':
                        char_data['titles'] = val
                    elif key == 'Einzigartige Fähigkeit':
                        char_data['unique_ability'] = val
                    elif key == 'Status':
                        char_data['status_desc'] = val
            j += 1
        entities["characters"].append(char_data)
        i = j
        continue
    
    # Rassen - Wahrer Drache
    if current_section == "races" and '### Wahrer Drache' in line:
        j = i + 1
        race_data = {"name": "Wahrer Drache (Schatten)", "type": "Legendär", "element": "Schatten"}
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    race_data[key.lower().replace(' ', '_')] = val
            elif l.startswith('- ') and ':' in l:
                key, val = l[2:].split(':', 1)
                race_data[key.strip().lower().replace(' ', '_')] = val.strip()
            j += 1
        entities["races"].append(race_data)
        i = j
        continue
    
    # Rassen - Drachenschnecke
    if current_section == "races" and '### Drachenschnecke' in line:
        j = i + 1
        race_data = {"name": "Drachenschnecke (Bazug)", "type": "Dungeon-Wesen"}
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    race_data[key.lower().replace(' ', '_')] = val
            j += 1
        entities["races"].append(race_data)
        i = j
        continue
    
    # Orte
    if current_section == "locations" and line.startswith('### '):
        loc_name = line[4:].strip()
        j = i + 1
        loc_data = {"name": loc_name, "type": "", "description": ""}
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    if key == 'Typ':
                        loc_data['type'] = val
                    elif key == 'Beschreibung':
                        loc_data['description'] = val
                    elif key == 'Lage':
                        loc_data['description'] += f" Lage: {val}"
                    elif key == 'Befund':
                        loc_data['description'] += f" Befund: {val}"
                    elif key == 'Status':
                        loc_data['description'] += f" Status: {val}"
                    elif key == 'Zugang':
                        loc_data['description'] += f" Zugang: {val}"
                    elif key == 'Kampf':
                        loc_data['description'] += f" Kampf: {val}"
            j += 1
        entities["locations"].append(loc_data)
        i = j
        continue
    
    # Items - Tabellen
    if current_section == "items" and line.startswith('| Orb'):
        rows, i = parse_md_table(lines, i)
        for row in rows:
            if len(row) >= 4 and row[0] not in ['Orb', '---']:
                entities["items"].append({
                    "name": row[0],
                    "element": row[1],
                    "affinity": row[2],
                    "status": row[3],
                    "type": "Magischer Orb"
                })
        continue
    
    if current_section == "items" and '### Orbs-Konstrukt' in line:
        j = i + 1
        desc = ""
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            if lines[j].strip():
                desc += lines[j].strip() + " "
            j += 1
        entities["items"].append({"name": "Orbs-Konstrukt", "type": "Magisches Konstrukt", "description": desc.strip()})
        i = j
        continue
    
    if current_section == "items" and '### Ausrüstung' in line:
        j = i + 1
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    if key == 'Abenteurer-Paket':
                        entities["items"].append({"name": "Abenteuer-Paket", "type": "Startausrüstung", "contents": val.split(', '), "description": "Standard-Ausrüstung für neue Spieler"})
                    elif key == 'Drachenschuppen':
                        entities["items"].append({"name": "Drachenschuppen", "type": "Natürliche Rüstung", "description": val})
                    elif key == 'Chitinpanzer':
                        entities["items"].append({"name": "Chitinpanzer", "type": "Rüstung", "description": val})
            j += 1
        i = j
        continue
    
    # Skills - Erworbene Fähigkeiten
    if current_section == "skills" and '### Erworbene Fähigkeiten' in line:
        j = i + 1
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            match = re.match(r'\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*)', l)
            if match:
                entities["skills"].append({
                    "name": match.group(1),
                    "type": "Aktiv/Passiv",
                    "description": match.group(2),
                    "cooldown": "N/A"
                })
            j += 1
        i = j
        continue
    
    # Skills - Titel-Boni
    if current_section == "skills" and '### Titel-Boni' in line:
        j = i + 1
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            match = re.match(r'-\s+\*\*(.*?)\*\*:\s+(.*)', l)
            if match:
                entities["skills"].append({
                    "name": f"Titel: {match.group(1)}",
                    "type": "Titel-Bonus",
                    "description": match.group(2),
                    "cooldown": "Passiv"
                })
            j += 1
        i = j
        continue
    
    # Skills - Status-Effekte
    if current_section == "skills" and '### Status-Effekte' in line:
        j = i + 1
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            match = re.match(r'-\s+\*\*(.*?)\*\*:\s+(.*)', l)
            if match:
                entities["skills"].append({
                    "name": match.group(1),
                    "type": "Status-Effekt",
                    "description": match.group(2),
                    "cooldown": "N/A"
                })
            j += 1
        i = j
        continue
    
    # Mechanics - Attribut-System
    if current_section == "mechanics" and '### Attribut-System' in line:
        j = i + 1
        desc = ""
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            if lines[j].strip():
                desc += lines[j].strip() + " "
            j += 1
        entities["mechanics"].append({"name": "Attribut-System", "type": "System", "description": desc.strip()})
        i = j
        continue
    
    if current_section == "mechanics" and '### Level-System' in line:
        j = i + 1
        desc = ""
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            if lines[j].strip():
                desc += lines[j].strip() + " "
            j += 1
        entities["mechanics"].append({"name": "Level-System", "type": "Progression", "description": desc.strip()})
        i = j
        continue
    
    if current_section == "mechanics" and '### XP-System' in line:
        j = i + 1
        desc = ""
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            if lines[j].strip():
                desc += lines[j].strip() + " "
            j += 1
        entities["mechanics"].append({"name": "XP-System", "type": "Progression", "description": desc.strip()})
        i = j
        continue
    
    if current_section == "mechanics" and '### Inventar' in line:
        j = i + 1
        desc = ""
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            if lines[j].strip():
                desc += lines[j].strip() + " "
            j += 1
        entities["mechanics"].append({"name": "Inventar-System", "type": "System", "description": desc.strip()})
        i = j
        continue
    
    # Quest
    if current_section == "quests" and '### Quest des Helden' in line:
        j = i + 1
        quest_data = {"name": "Quest des Helden", "type": "Main-Quest"}
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    quest_data[key.lower().replace(' ', '_')] = val
            j += 1
        entities["quests"].append(quest_data)
        i = j
        continue
    
    # Globale Ereignisse
    if current_section == "quests" and '### Globale Ereignisse' in line:
        j = i + 1
        while j < len(lines) and not lines[j].startswith('### ') and not lines[j].startswith('## '):
            l = lines[j].strip()
            if l.startswith('- **'):
                key_val = l[4:].split('**:', 1)
                if len(key_val) == 2:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    entities["mechanics"].append({"name": f"Globales Ereignis: {key}", "type": "World Event", "description": val})
            j += 1
        i = j
        continue
    
    # Enthüllungen
    if current_section == "revelations":
        match = re.match(r'\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*)', line)
        if match:
            entities["mechanics"].append({
                "name": f"Enthüllung: {match.group(1)}",
                "type": "Lore",
                "description": match.group(2)
            })
    
    i += 1

# Charaktere manuell hinzufügen (aus analysis_buch1.md PROTAGONIST)
entities["characters"] = [{
    "name": "Ben (Dhark)",
    "aliases": ["Ben", "Shadow", "Dhark", "Drache"],
    "role": "Protagonist",
    "first_mention": "Kapitel 1",
    "status": "active",
    "start_name": '"keiner" (kein Name vergeben)',
    "end_name": "Ben (im Text erwähnt als Spieler aus Deutschland)",
    "race": "Wahrer Drache (Element: Schatten)",
    "age_stage": "Frisch Geschlüpft → Jugendlich (Stufe 0→7)",
    "class": "Keine (Questbelohnung Rasse gewählt, Klasse nicht gewählt)",
    "titles": "erste Legende des fünften Zeitalters - verfluchter Held → Unheilsbringer, Freund der Schatten → Letzter seiner Art, legendärer Fressfeind der falschen Götter, Meister der Elemente, Meistermagier der verbotenen Elemente",
    "unique_ability": "Aasfresser",
    "status_desc": "Verwirrt, frustriert → selbstbewusst"
}]

# Speichern
chapter_001 = {
    "chapter_id": "ch001",
    "chapter_title": "Buch 1 - Der Anfang (Vollständig aus PDF 269 Seiten)",
    "source_file": "Eternity_Buch_1.pdf",
    "wordcount": 748000,
    "extracted_at": datetime.now().isoformat(),
    "status": "processed",
    **entities
}

with open("/home/openclaw/projects/eternity-wiki/meta/chapter_001_entities.json", "w") as f:
    json.dump(chapter_001, f, indent=2, ensure_ascii=False)

print("✅ chapter_001_entities.json geschrieben")
for k, v in entities.items():
    print(f"  {k}: {len(v)}")

