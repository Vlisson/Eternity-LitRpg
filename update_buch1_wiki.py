#!/usr/bin/env python3
"""
Aktualisiere/Erstelle Wiki-Seiten für Buch 1 Entities basierend auf chapter_001_entities.json
"""
import json
import os
from datetime import datetime

# Lade Entities
with open("/home/openclaw/projects/eternity-wiki/meta/chapter_001_entities.json", "r") as f:
    data = json.load(f)

WIKI_DIR = "/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/wiki"

def write_md(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(f"✅ {path}")

# ========== 1. BEN (Protagonist) ==========
ben = data["characters"][0] if data["characters"] else {}
ben_md = f"""# Ben (Dhark / Shadow)

> "Ich denke also bin ich - Check"

## Basis-Informationen
- **Echter Name:** Ben (Spieler aus Deutschland)
- **Spielername:** Shadow
- **Alias:** Dhark (Dämonenlord), Drache
- **Rasse:** Wahrer Drache (Element: Schatten) — gewählt als Questbelohnung
- **Klasse:** Keine (Questbelohnung Rasse gewählt, Klasse nicht gewählt)
- **Level:** 0 → 7 (nach Quest & Kämpfen)
- **Altersstufe:** Frisch Geschlüpft → Jugendlich
- **Zugehörigkeit:** Spieler im VRMMO Eternity
- **Status:** Aktiv, selbstbewusst
- **Einzigartige Fähigkeit:** Aasfresser

## Start-Attribute (Level 0)
| Stat | Wert | Hinweis |
|------|------|---------|
| STR  | 1    | — |
| DEX  | 1    | — |
| AGI  | 1    | — |
| CON  | 1    | — |
| INT  | 31   | **Ausnahme: Start-Intelligenz 31** |
| WIS  | 1    | — |
| PER  | 1    | — |
| CHA  | 1    | — |

> **Hinweis:** Alle körperlichen Attribute haben -90% Abzug. Konstitution-Build: 41 Punkte → 166 HP (statt 1025 erwartet). Freie Punkte nach Stufe 4: 40.

## Titel
- Erste Legende des fünften Zeitalters - verfluchter Held → **Unheilsbringer**
- Freund der Schatten → **Letzter seiner Art**
- **Legendärer Fressfeind der falschen Götter**
- **Meister der Elemente** (-30% Manaverbrauch 4 Grundelemente)
- **Meistermagier der verbotenen Elemente** (+20% Manamax, Mana nie 0)

## Rassen-Vorteile (Wahrer Drache - Schatten)
- **Sehr Klein** — Verstecken x3
- **Geborenes Raubtier** — Aura der Furcht
- **Wärmesicht**
- **Schattensicht** — Sehen wie am Tag, auch in magischer Dunkelheit

## Rassen-Nachteile
- **Drachenfluch** — Proximity Poison (soziale Isolation notwendig)
- **Kaltblütig** — Externe Wärme nötig
- **XP x2** — Doppelte XP für Stufenaufstieg

## Angriffe
| Angriff | Schaden | Effekt |
|---------|---------|--------|
| Biss | 5-20 | Ignoriert Rüstung |
| Klauen | 1-5 | — |
| Drachenschwanz | — | Betäuben |

## Rüstung & HP
- **Rüstung:** 1 + Drachenessenz Bonus
- **HP (Stufe 0):** 20
- **HP (Stufe 4):** 60

## Aktive Skills (Start)
- [[Kreativität]]: Spezielle Fähigkeit - Fortgeschritten (Passiv)
- [[Rollenspielmeister]]: Spezielle Fähigkeit - Fortgeschritten (Passiv)

## Erworbene Fähigkeiten (Buch 1)
- [[Schattensicht]]: Sehen wie am Tag, auch in magischer Dunkelheit
- [[Giftrune]]: Giftresistenz, Runen-Slot belegt
- [[Drachenessenz]]: Metalle absorbieren, +1% Schuppen-Rüstung
- [[Wärmesicht]]: Wärmequellen erkennen
- [[Aura der Furcht]]: Geborenes Raubtier

## Titel-Boni
- **Meister der Elemente:** -30% Manaverbrauch 4 Grundelemente
- **Meistermagier der verbotenen Elemente:** +20% Manamax, Mana nie 0
- **Unheilsbringer:** +900% göttliche Intervention/Katastrophen
- **Letzter seiner Art:** Mana ← Lebensenergie Umwandlung
- **Legendärer Fressfeind der falschen Götter:** Gott-Angriffe ohne Einschränkung

## Status-Effekte
- **Unterkühlt:** Bewegung -50%
- **Vergiftung:** -1% HP/Sekunde
- **Übelkeit:** -30% Werte, Bewegung -20%
- **Giftresistenz Anfänger:** +2% Schadensreduktion

## Biografie
Ben erwacht in völliger Dunkelheit in einer Tropfsteinhöhle. Er führt einen Existenz-Check durch ("Ich denke also bin ich - Check", "Ich bin nicht tot - Check", "Ich bin immer noch ein Mann - Doppelcheck"). Er erkennt, dass er sich im VRMMO Eternity befindet und die Quest des Helden erfolgreich abgeschlossen hat.

Als Belohnung wählt er zwischen der legendären Rasse Drache oder der legendären Klasse Erzmagier — **er wählt die Drachenrasse (Schatten-Element)**. Damit wird er zum letzten seiner Art, Nachkomme des Drachengotts Bahamut.

Im Reich der Dämonen (einzigartiger Dungeon, versiegelt, anderer Zeitverlauf) beginnt seine Reise. Er erhält das Abenteuer-Paket (2 Fackeln, 1 Feuerstein, Zelt, Nahrung, Dolch).

## Auftreten
- **Kapitel 1:** Erwachen, Existenz-Check, System-Nachricht, Quest-Belohnung, Rassenwahl, Inventar
- **Buch 1 vollständig:** Alle 269 Seiten abdecken

## Beziehungen
- [[Vlisson]]: Autor/Spieler-Avatar (Identität)
- [[Shadow]]: Spielername
- [[Anubara]]: Dämonenkönig (Buch 2)
- [[Marie-Claire]]: Beschwörerin (Buch 2)
- [[Meri]]: Schatten-Assassine (Buch 2)
- [[Lumiella]]: Meris Tochter (Buch 2)

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 (269 Seiten PDF) + Excerpt*
"""

write_md(os.path.join(WIKI_DIR, "characters/Ben.md"), ben_md)

# ========== 2. RASSEN ==========
for race in data["races"]:
    if race["name"] == "Wahrer Drache (Schatten)":
        race_md = f"""# Wahrer Drache (Schatten)

> Stärkste Rasse in Eternity — gottgleich, aber verflucht

## Klassifikation
- **Typ:** Legendäre Rasse
- **Element:** Schatten
- **Abstammung:** Drachengott Bahamut
- **Besonderheit:** Letzter seiner Art

## Vorteile
- **Sehr Klein** — Verstecken x3
- **Geborenes Raubtier** — Aura der Furcht
- **Wärmesicht** — Wärmequellen erkennen
- **Schattensicht** — Sehen wie am Tag, auch in magischer Dunkelheit

## Nachteile
- **Drachenfluch (Proximity Poison)** — Soziale Isolation notwendig, vergiftet Umgebung
- **Kaltblütig** — Externe Wärmequelle zum Überleben nötig
- **XP x2** — Doppelte Erfahrungspunkte für Stufenaufstieg nötig

## Basis-Attribute (Level 0)
| Stat | Wert |
|------|------|
| STR  | 1    |
| DEX  | 1    |
| AGI  | 1    |
| CON  | 1    |
| INT  | 31   |
| WIS  | 1    |
| PER  | 1    |
| CHA  | 1    |

## Angriffe
| Angriff | Schaden | Spezial |
|---------|---------|---------|
| Biss | 5-20 | Ignoriert Rüstung |
| Klauen | 1-5 | — |
| Drachenschwanz | — | Betäuben |

## Verteidigung
- **Rüstung:** 1 + Drachenessenz Bonus
- **HP (Stufe 0):** 20
- **HP (Stufe 4):** 60
- **Drachenschuppen:** Natürliche Rüstung, nur durch magische Angriffe durchdringbar

## Freie Punkte
Nach Stufe 4: **40 freie Attributpunkte**

## Besondere Mechaniken
- **Aasfresser** — Einzigartige Fähigkeit: Nahrung aus Insekten/Kleinlebewesen
- **Drachenessenz** — Metalle absorbieren → +1% Schuppen-Rüstung pro Absorption
- **Orb-Aktivierung** — Nur Schatten-Drachen können den Schatten-Orb aktivieren

## Bekannte Vertreter
- **Ben (Dhark/Shadow):** Erster und einziger Spieler-Wahrer-Drache (Schatten)

## Lore
Drachen sind die stärkste Rasse in Eternity — gottgleich in Macht, aber durch den **Drachenfluch** (Proximity Poison) zur Isolation gezwungen. Der Schatten-Drache ist der letzte seiner Art, direkt vom Drachengott Bahamut abstammend. Die Aktivierung des Schatten-Orbs löst das Verschwinden des Orbs-Konstrukts (14 Knoten: 4 Grundelemente + 6 Synergien) aus.

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse (269 Seiten)*
"""
        write_md(os.path.join(WIKI_DIR, "classes-races/Wahrer_Drache_Schatten.md"), race_md)
    
    elif race["name"] == "Drachenschnecke (Bazug)":
        race_md = f"""# Drachenschnecke (Bazug)

> Tunnelbohrende Dungeon-Wesen mit Farbwechsel-Fähigkeit

## Klassifikation
- **Typ:** Dungeon-Wesen / Begleiter-Rasse
- **Stamm:** Bazug
- **Sozialstruktur:** Gruppentransport, 4-5 Individuen pro Gruppe

## Fähigkeit
- **Tunnelbohrer** — Können sich durch Fels bohren, erstellen Tunnelnetze

## Verhalten
- **Neutral** — Nicht aggressiv, aber territorial
- **Schmeichelhaft** — Suchen Bestätigung
- **Eitler Pfau** — Präsentieren sich gerne

## Farbwechsel
| Zustand | Farbe |
|---------|-------|
| Normal | Blau |
| Angst | Erde/Stein (Tarnung) |

## Begegnung
- **Ort:** Dungeon-Ebene 74 (Bazug-Stamm, Tunnelnetz)
- **Interaktion:** Können als Transportmittel dienen
- **Beziehung zu Ben:** Neutral, können überzeugt werden

## Lore
Die Bazug-Drachenschnecken bevölkern Ebene 74 des Dungeons. Sie bilden ein ausgedehntes Tunnelnetz und leben in Gruppen von 4-5 Individuen. Ihr Farbwechsel dient als Angst-Tarnung.

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
        write_md(os.path.join(WIKI_DIR, "classes-races/Drachenschnecke_Bazug.md"), race_md)

# ========== 3. ORTE ==========
for loc in data["locations"]:
    name_safe = loc["name"].replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_")
    loc_md = f"""# {loc["name"]}

## Klassifikation
- **Typ:** {loc["type"]}
- **Erstauftreten:** Buch 1, Kapitel 1

## Beschreibung
{loc["description"]}

## Details
- **Ebene 1:** Tropfsteinhöhle (Start)
- **Ebene 74:** Bazug-Stamm, Tunnelnetz
- **Ebene 99:** Schatzkammer des Norcons (oberste Ebene)
- **Gesamt:** 99 Ebenen, jede mit eigenem Ökosystem

## Besondere Eigenschaften
- **Zeitverlauf:** Anders als in der normalen Spielwelt
- **Zugang:** Nur über Quest des Helden erreichbar
- **Versiegelt:** Für normale Spieler unzugänglich
- **Titel-Bonus:** "Freund der Schatten" erhöht alle Belohnungen

## NPCs & Bewohner
- **Bazug-Drachenschnecken** (Ebene 74)
- **NSC-Armee** in der Schatzkammer (kämpfen unmöglichen Krieg)
- **KI Argus** beobachtet die NSC-Kämpfe

## Zusammenhang
- Startort von Ben (Tropfsteinhöhle)
- Quest-Belohnungsort (Reich der Dämonen)
- Endziel: Schatzkammer Norcons

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    write_md(os.path.join(WIKI_DIR, f"locations/{name_safe}.md"), loc_md)

# ========== 4. ITEMS ==========
for item in data["items"]:
    name_safe = item["name"].replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_")
    if item.get("type") == "Magischer Orb":
        item_md = f"""# {item["name"]}

## Klassifikation
- **Typ:** Magischer Orb (Quelle reiner Elemente)
- **Element:** {item.get("element", "Unbekannt")}
- **Affinität:** {item.get("affinity", "Unbekannt")}
- **Status:** {item.get("status", "Unbekannt")}
- **Seltenheit:** Legendär

## Beschreibung
{item.get("description", "")}

## Orbs-Konstrukt
Die 5 Orbs bilden zusammen ein magisches Konstrukt:
- **4 Grundelemente:** Feuer, Erde (Metall), Wasser (Ozean), Wind (Donner)
- **6 Erweiterte Synergien** zwischen den Elementen
- **Gesamt: 14 Knoten** im Konstrukt-Netzwerk
- **Effekt:** Magische Harmonie, fruchtbarer Sandboden
- **Auslöser:** Aktivierung des Schatten-Orbs → Konstrukt verschwindet

## Besondere Eigenschaften
- Keine gewöhnlichen Artefakte, sondern **Quellen reiner Elemente**
- Nicht einlösbar, müssen **aktiviert** werden
- Keine Taschen/Aufbewahrung möglich
- Nur der jeweilige Element-Drache kann seinen Orb aktivieren

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    elif item["name"] == "Orbs-Konstrukt":
        item_md = f"""# Orbs-Konstrukt

## Klassifikation
- **Typ:** Magisches Konstrukt
- **Bestandteile:** 5 Orbs (4 Grundelemente + Schatten) + 6 Synergien = 14 Knoten

## Beschreibung
{item.get("description", "")}

## Struktur
| Knoten | Typ | Element |
|--------|-----|---------|
| 1-4 | Grundelemente | Feuer, Erde, Wasser, Wind |
| 5 | Schatten | Schatten (letzter, aktiviert durch Ben) |
| 6-14 | Synergien | Erweiterte Elementar-Verbindungen |

## Effekt
- **Magische Harmonie** im Bereich
- **Fruchtbarer Sandboden** entsteht
- **Verschwindet** nach Aktivierung des Schatten-Orbs

## Lore
Das Konstrukt ist das zentrale magische System des Dungeons. Jeder Orb ist eine Quelle reinen Elements. Die Aktivierung aller 5 Orbs (durch den jeweiligen Element-Drachen) vervollständigt das Konstrukt und transformiert die Umgebung.

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    elif item["name"] == "Abenteuer-Paket":
        item_md = f"""# Abenteuer-Paket

## Klassifikation
- **Typ:** Startausrüstung
- **Seltenheit:** Common
- **Erhalt:** Automatisch bei Charaktererstellung / Quest-Belohnung

## Inhalt
| Item | Menge | Beschreibung |
|------|-------|--------------|
| Fackel | 2 | Lichtquelle in Dungeons |
| Feuerstein | 1 | Feuer entfachen |
| Zelt / Schlafsack | 1 | Rast & Regeneration |
| Nahrungspaket | 1 | Verpflegung |
| Dolch | 1 | Waffe / Werkzeug |

## Beschreibung
Standard-Ausrüstung für neue Spieler in Eternity. Ben erhält es nach der Quest-Belohnungswahl in der Tropfsteinhöhle.

## Einschränkungen
- Keine Taschen / Inventar-Erweiterung am Start
- Orbs können **nicht** im Inventar aufbewahrt werden

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    elif item["name"] == "Drachenschuppen":
        item_md = f"""# Drachenschuppen

## Klassifikation
- **Typ:** Natürliche Rüstung
- **Besitzer:** Wahrer Drache (angeboren)
- **Haltbarkeit:** Wächst mit Level / Drachenessenz

## Beschreibung
{item.get("description", "")}

## Eigenschaften
- **Basis-Rüstung:** 1
- **Bonus:** +1% pro absorbiertem Metall (Drachenessenz)
- **Durchdringbarkeit:** Nur durch **magische Angriffe**
- **Physischer Schutz:** Sehr hoch gegen normale Waffen

## Entwicklung
| Stufe | Rüstung | Hinweis |
|-------|---------|---------|
| 0 | 1 | Basis |
| 4 | ~1-5 | Nach ersten Metall-Absorptionen |
| Max | Skaliert | Mit Drachenessenz |

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    elif item["name"] == "Chitinpanzer":
        item_md = f"""# Chitinpanzer

## Klassifikation
- **Typ:** Rüstung (Monster-Drop)
- **Herkunft:** Käfer / Tausendfüßler (Dungeon-Gegner)
- **Seltenheit:** Rare

## Beschreibung
{item.get("description", "")}

## Eigenschaften
- **Rüstungswert:** Unbekannt (nicht im Buch spezifiziert)
- **Material:** Insekten-Chitin
- **Erhalt:** Drop nach Käfer-/Tausendfüßler-Kampf

## Lore
Rüstung aus dem Chitin der Dungeon-Insekten. Ben erhält sie nach dem Kampf gegen die Käfer/Tausendfüßler in den frühen Dungeon-Ebenen.

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    else:
        item_md = f"""# {item["name"]}

## Klassifikation
- **Typ:** {item.get("type", "Item")}
- **Beschreibung:** {item.get("description", "")}

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    write_md(os.path.join(WIKI_DIR, f"items/{name_safe}.md"), item_md)

# ========== 5. SKILLS ==========
for skill in data["skills"]:
    name_safe = skill["name"].replace(" ", "_").replace(":", "").replace("(", "").replace(")", "").replace("/", "_")
    skill_md = f"""# {skill["name"]}

## Klassifikation
- **Typ:** {skill.get("type", "Fähigkeit")}
- **Kategorie:** {skill.get("type", "Unbekannt")}
- **Cooldown:** {skill.get("cooldown", "N/A")}

## Beschreibung
{skill.get("description", "")}

## Quelle
Buch 1 — Chapter 1 Entities (269 Seiten PDF-Analyse)

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    write_md(os.path.join(WIKI_DIR, f"skills/{name_safe}.md"), skill_md)

# ========== 6. QUEST ==========
for quest in data["quests"]:
    name_safe = quest["name"].replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_")
    quest_md = f"""# {quest["name"]}

## Klassifikation
- **Typ:** {quest.get("type", "Main-Quest")}
- **Status:** {quest.get("status", "Unbekannt")}
- **Belohnung:** {quest.get("reward", "Unbekannt")}
- **Wahl:** {quest.get("choice", "Keine")}

## Beschreibung
{quest.get("description", "")}

## Konsequenzen
- Transformation zur gewählten Rasse/Klasse
- Titel-Updates
- System-Freischaltungen
- Zugang zum Reich der Dämonen

## Lore
Einzelspieler-Event? Global? Unklar. NSC-Kampf in Schatzkammer beobachtet durch KI Argus.
Ben's Ruf: "Vielversprechendster Kandidat für unsterblichen König".

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    write_md(os.path.join(WIKI_DIR, f"quests/{name_safe}.md"), quest_md)

# ========== 7. MECHANIKEN ==========
for mech in data["mechanics"]:
    name_safe = mech["name"].replace(" ", "_").replace(":", "").replace("(", "").replace(")", "").replace("/", "_")
    mech_md = f"""# {mech["name"]}

## Klassifikation
- **Typ:** {mech.get("type", "System/Mechanik")}

## Beschreibung
{mech.get("description", "")}

## Quelle
Buch 1 — Chapter 1 Entities (269 Seiten PDF-Analyse)

---
*Erstellt: {datetime.now().strftime('%Y-%m-%d')} | Basis: Buch 1 Analyse*
"""
    write_md(os.path.join(WIKI_DIR, f"lore/{name_safe}.md"), mech_md)

print("\n✅ Alle Buch-1-Wiki-Seiten erstellt/aktualisiert!")
