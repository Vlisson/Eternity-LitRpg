#!/usr/bin/env python3
"""
Aktualisiere master_entities.json mit Buch-1-Entities
"""
import json
from datetime import datetime

# Lade bestehende master_entities
with open("/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/wiki/meta/master_entities.json", "r") as f:
    master = json.load(f)

# Lade chapter_001_entities
with open("/home/openclaw/projects/eternity-wiki/meta/chapter_001_entities.json", "r") as f:
    ch1 = json.load(f)

# Merge Characters
for char in ch1.get("characters", []):
    name = char["name"]
    if name not in master["characters_master"]:
        master["characters_master"][name] = char
        master["characters_master"][name]["first_appearance"] = "ch001"
    else:
        # Update mit fehlenden Details
        master["characters_master"][name].update(char)

# Merge Races
for race in ch1.get("races", []):
    name = race["name"]
    if name not in master["races_master"]:
        master["races_master"][name] = race
        master["races_master"][name]["first_appearance"] = "ch001"

# Merge Locations
for loc in ch1.get("locations", []):
    name = loc["name"]
    if name not in master["locations_master"]:
        master["locations_master"][name] = loc
        master["locations_master"][name]["first_appearance"] = "ch001"

# Merge Items
for item in ch1.get("items", []):
    name = item["name"]
    if name not in master["items_master"]:
        master["items_master"][name] = item
        master["items_master"][name]["first_appearance"] = "ch001"

# Merge Skills
for skill in ch1.get("skills", []):
    name = skill["name"]
    if name not in master["skills_master"]:
        master["skills_master"][name] = skill
        master["skills_master"][name]["first_appearance"] = "ch001"

# Merge Quests
for quest in ch1.get("quests", []):
    name = quest["name"]
    if name not in master["quests_master"]:
        master["quests_master"][name] = quest
        master["quests_master"][name]["first_appearance"] = "ch001"

# Merge Mechanics als Lore/Classes
for mech in ch1.get("mechanics", []):
    name = mech["name"]
    if name not in master["classes_master"] and name not in master["skills_master"]:
        # Als Mechanik in skills_master oder neues Feld
        if "mechanics_master" not in master:
            master["mechanics_master"] = {}
        master["mechanics_master"][name] = mech
        master["mechanics_master"][name]["first_appearance"] = "ch001"

master["last_updated"] = datetime.now().isoformat().split("T")[0]
master["total_chapters_processed"] = 2  # ch001 + ch002

# Speichern
with open("/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/wiki/meta/master_entities.json", "w") as f:
    json.dump(master, f, indent=2, ensure_ascii=False)

# Auch in projects/eternity-wiki kopieren
import shutil
shutil.copy(
    "/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/wiki/meta/master_entities.json",
    "/home/openclaw/projects/eternity-wiki/meta/master_entities.json"
)

print("✅ master_entities.json aktualisiert")
print(f"  Characters: {len(master['characters_master'])}")
print(f"  Locations: {len(master['locations_master'])}")
print(f"  Items: {len(master['items_master'])}")
print(f"  Skills: {len(master['skills_master'])}")
print(f"  Quests: {len(master['quests_master'])}")
print(f"  Races: {len(master['races_master'])}")
print(f"  Classes: {len(master['classes_master'])}")
print(f"  Factions: {len(master['factions_master'])}")

