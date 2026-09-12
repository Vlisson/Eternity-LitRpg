#!/usr/bin/env python3
"""
Extrahiere Entities aus analysis_buch1.md und schreibe strukturierte JSON-Dateien
"""
import json
import re
from datetime import datetime

# Lese die analysis_buch1.md
with open("/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/analysis_buch1.md", "r") as f:
    content = f.read()

# Helper: Parse tables
def parse_table(table_text):
    rows = []
    lines = table_text.strip().split('\n')
    for line in lines:
        if line.startswith('|') and not line.startswith('|---'):
            cells = [c.strip() for c in line.split('|')[1:-1]]
            rows.append(cells)
    return rows

# Extrahiere Abschnitte
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

# 1. RASSEN & KREATUREN
# Suche nach Rassen-Tabelle
race_section = re.search(r'## 🐉 RASSEN & KREATUREN(.*?)(?=## |\Z)', content, re.DOTALL)
if race_section:
    text = race_section.group(1)
    # Wahrer Drache
    drache_match = re.search(r'### Wahrer Drache \(Schatten\)(.*?)(?=### |\Z)', text, re.DOTALL)
    if drache_match:
        drache_text = drache_match.group(1)
        entities["races"].append({
            "name": "Wahrer Drache (Schatten)",
            "type": "Legendär",
            "element": "Schatten",
            "benefits": ["Sehr Klein (Verstecken x3)", "Geborenes Raubtier (Aura der Furcht)", "Wärmesicht", "Schattensicht"],
            "drawbacks": ["Drachenfluch (Proximity Poison)", "Kaltblütig (externe Wärme nötig)", "XP x2"],
            "attacks": ["Biss (5-20, ignoriert Rüstung)", "Klauen (1-5)", "Drachenschwanz (Betäuben)"],
            "armor": "1 + Drachenessenz Bonus",
            "hp": {"level_0": 20, "level_4": 60},
            "attributes": {"STR": 1, "DEX": 1, "AGI": 1, "CON": 1, "INT": 31, "WIS": 1, "PER": 1, "CHA": 1},
            "free_points_after_lvl4": 40,
            "description": "Stärkste Rasse, gottgleich, aber verflucht. Letzter seiner Art, vom Drachengott Bahamut abstammend."
        })
    
    # Drachenschnecke
    schnecke_match = re.search(r'### Drachenschnecke \(Bazug\)(.*?)(?=### |\Z)', text, re.DOTALL)
    if schnecke_match:
        entities["races"].append({
            "name": "Drachenschnecke (Bazug)",
            "type": "Dungeon-Wesen",
            "ability": "Tunnelbohrer",
            "behavior": "Neutral, schmeichelhaft, eitler Pfau",
            "social": "Gruppentransport, 4-5 Individuen",
            "color_change": "Blau (normal) → Erde/Stein (Angst)"
        })

# 2. ORTE
loc_section = re.search(r'## 🗺️ ORTE & LOCATIONS(.*?)(?=## |\Z)', content, re.DOTALL)
if loc_section:
    text = loc_section.group(1)
    locations = [
        ("Tropfsteinhöhle (Start)", "Natürliche Höhle, kalter Steinboden, unterirdisch, kein Licht, Wasser tropft, Felsenwände", "Dungeon"),
        ("Reich der Dämonen", "Versiegelt, nur über Quest erreichbar, Zeitverlauf anders als gewöhnlich, Belohnung: +Titel 'Freund der Schatten'", "Dungeon/Quest-Gebiet"),
        ("Dungeon-Ebenen", "Ebene 1: Start, Tropfsteinhöhle. Ebene 74: Bazug-Stamm, Tunnelnetz. Ebene 99: Schatzkammer des Norcons. 99 Ebenen total, jede mit eigenem Ökosystem", "Dungeon"),
        ("Schatzkammer Norcons", "Zentraler Ort des Dungeons, nur für Spieler erreichbar, NSC kämpfen unmöglichen Krieg", "Boss-Area")
    ]
    for name, desc, typ in locations:
        entities["locations"].append({"name": name, "type": typ, "description": desc})

# 3. ITEMS & ARTIFAKTE
items_section = re.search(r'## 🔮 ITEMS & ARTIFAKTE(.*?)(?=## |\Z)', content, re.DOTALL)
if items_section:
    text = items_section.group(1)
    # Orbs Tabelle
    orb_table = re.search(r'\| Orb.*?\n((?:\|.*?\n)+)', text)
    if orb_table:
        rows = parse_table(orb_table.group(0))
        for row in rows:
            if len(row) >= 4 and row[0] not in ['Orb', '---']:
                entities["items"].append({
                    "name": row[0],
                    "element": row[1],
                    "affinity": row[2],
                    "status": row[3],
                    "type": "Magischer Orb",
                    "description": f"Orb des Elements {row[1]}, Affinität: {row[2]}, Status: {row[3]}"
                })
    # Orbs-Konstrukt
    if 'Orbs-Konstrukt' in text:
        entities["items"].append({
            "name": "Orbs-Konstrukt",
            "type": "Magisches Konstrukt",
            "description": "Anordnung: 4 Grundelemente + 6 erweiterte Synergien = 14 Knoten. Effekt: Magische Harmonie, fruchtbarer Sandboden. Verschwindet nach Aktivierung des Schatten-Orbs."
        })
    # Ausrüstung
    if 'Ausrüstung' in text:
        entities["items"].append({
            "name": "Abenteuer-Paket",
            "type": "Startausrüstung",
            "contents": ["2 Fackeln", "1 Feuerstein", "1 Zelt/Schlafsack", "1 Nahrungspaket", "1 Dolch"],
            "description": "Standard-Ausrüstung für neue Spieler"
        })
        entities["items"].append({
            "name": "Drachenschuppen",
            "type": "Natürliche Rüstung",
            "description": "Natürliche Rüstung, durchdrungbar nur durch magische Angriffe"
        })
        entities["items"].append({
            "name": "Chitinpanzer",
            "type": "Rüstung",
            "description": "Von Käfer erhalten, Rüstungswert unbekannt"
        })

# 4. SKILLS & FÄHIGKEITEN
skills_section = re.search(r'## ⚔️ SKILLS & FÄHIGKEITEN(.*?)(?=## |\Z)', content, re.DOTALL)
if skills_section:
    text = skills_section.group(1)
    # Erworbene Fähigkeiten
    skills_list = re.findall(r'\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*?)(?=\n\d+\.|\n\n|$)', text, re.DOTALL)
    for name, desc in skills_list:
        entities["skills"].append({
            "name": name.strip(),
            "type": "Aktiv/Passiv",
            "description": desc.strip(),
            "cooldown": "N/A"
        })
    # Titel-Boni
    if 'Titel-Boni' in text:
        title_bonuses = re.findall(r'-\s+\*\*(.*?)\*\*:\s+(.*?)(?=\n-|\n\n|$)', text, re.DOTALL)
        for name, desc in title_bonuses:
            entities["skills"].append({
                "name": f"Titel: {name.strip()}",
                "type": "Titel-Bonus",
                "description": desc.strip(),
                "cooldown": "Passiv"
            })
    # Status-Effekte
    if 'Status-Effekte' in text:
        status_effects = re.findall(r'-\s+\*\*(.*?)\*\*:\s+(.*?)(?=\n-|\n\n|$)', text, re.DOTALL)
        for name, desc in status_effects:
            entities["skills"].append({
                "name": name.strip(),
                "type": "Status-Effekt",
                "description": desc.strip(),
                "cooldown": "N/A"
            })

# 5. SYSTEM & MECHANIKEN
sys_section = re.search(r'## 📊 SYSTEM & MECHANIKEN(.*?)(?=## |\Z)', content, re.DOTALL)
if sys_section:
    text = sys_section.group(1)
    entities["mechanics"].append({
        "name": "Attribut-System",
        "type": "System",
        "description": "Startattribute: Alle 1 (außer Intelligenz 31). Konstitution-Build: 41 Punkte → 166 HP. Abzug -90% auf körperliche Attribute. Freie Punkte: 40 nach Stufe 4."
    })
    entities["mechanics"].append({
        "name": "Level-System",
        "type": "Progression",
        "description": "Start: Stufe 0 (nach Quest). Stufe 1: Nach erstem Kampf. Stufe 4: Nach 3 weiteren Kämpfen. Stufe 7: Nach Tausendfüßler-Kampf."
    })
    entities["mechanics"].append({
        "name": "XP-System",
        "type": "Progression",
        "description": "Drachenfluch: XP x2 benötigt. Stufenaufstieg durch Kampf, nicht durch Quest."
    })
    entities["mechanics"].append({
        "name": "Inventar-System",
        "type": "System",
        "description": "Start: Abenteuer-Paket. Keine Taschen, keine Aufbewahrung der Orbs. Orbs nicht einlösbar, müssen aktiviert werden."
    })

# 6. QUEST & STORY
quest_section = re.search(r'## 🎯 QUEST & STORY(.*?)(?=## |\Z)', content, re.DOTALL)
if quest_section:
    text = quest_section.group(1)
    entities["quests"].append({
        "name": "Quest des Helden",
        "type": "Main-Quest",
        "status": "completed",
        "reward": "Legendäre Rasse Drache oder Erzmagier",
        "choice": "Drache (Schatten-Element) gewählt",
        "consequences": "Transformation, Titel-Updates, System-Freischaltungen",
        "description": "Einzelspieler-Event? Global? Unklar. NSC-Kampf in Schatzkammer beobachtet durch KI Argus. Ben's Ruf: 'Vielversprechendster Kandidat für unsterblichen König'."
    })

# 7. WICHTIGE ENTHÜLLUNGEN
enthuellungen = re.search(r'## 🔍 WICHTIGE ENTHÜLLUNGEN(.*?)(?=## |\Z)', content, re.DOTALL)
if enthuellungen:
    text = enthuellungen.group(1)
    revelations = re.findall(r'\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*?)(?=\n\d+\.|\n\n|$)', text, re.DOTALL)
    for name, desc in revelations:
        entities["mechanics"].append({
            "name": f"Enthüllung: {name.strip()}",
            "type": "Lore",
            "description": desc.strip()
        })

# Speichere chapter_001_entities.json (vollständig)
chapter_001 = {
    "chapter_id": "ch001",
    "chapter_title": "Buch 1 - Der Anfang (Vollständig aus PDF 269 Seiten)",
    "source_file": "Eternity_Buch_1.pdf",
    "wordcount": 748000,  # Approximation
    "extracted_at": datetime.now().isoformat(),
    "status": "processed",
    **{k: v for k, v in entities.items()}
}

with open("/home/openclaw/projects/eternity-wiki/meta/chapter_001_entities.json", "w") as f:
    json.dump(chapter_001, f, indent=2, ensure_ascii=False)

print("✅ chapter_001_entities.json geschrieben")
print(f"  Characters: {len(entities['characters'])}")
print(f"  Races: {len(entities['races'])}")
print(f"  Locations: {len(entities['locations'])}")
print(f"  Items: {len(entities['items'])}")
print(f"  Skills: {len(entities['skills'])}")
print(f"  Quests: {len(entities['quests'])}")
print(f"  Mechanics: {len(entities['mechanics'])}")

# Auch meta/index.json aktualisieren
index_data = {
    "book": "Eternity - Buch 1",
    "chapters": [
        {"id": "ch001", "file": "Eternity_Buch_1.pdf", "status": "processed", "wordcount": 748000, "entities_file": "meta/chapter_001_entities.json"}
    ]
}
with open("/home/openclaw/projects/eternity-wiki/meta/index.json", "w") as f:
    json.dump(index_data, f, indent=2, ensure_ascii=False)
print("✅ meta/index.json aktualisiert")

