# DRACO CODEx HANDOFF — ETERNITY LITRPG WIKI
## Übergabe an Draco Codex

**Projekt:** Eternity LitRPG Wiki
**Stand:** 2026-09-09
**Verantwortlicher:** Shadow (aktueller Agent)

---

## 1. PROJEKTZIEL

Das Ziel ist die vollständige Erstellung und Pflege eines deutschsprachigen LitRPG-Wikis für die Eternity-Romanserie. Das Wiki soll alle Charaktere, Fähigkeiten, Quests, Lore, Items, Orte und Systemmechaniken aus Buch 1 und Buch 2 vollständig dokumentieren.

**Live-URL:** https://eternitylitrpg.netlify.app

---

## 2. ARBEITSWEISE — WICHTIGSTE REGELN

1. **Immer alle Abhängigkeiten mit aktualisieren.** Wenn du eine neue Seite erstellst oder eine bestehende Seite änderst, musst du prüfen, ob andere Seiten auf sie verweisen. Neue Seiten müssen in Indexseiten, Navigationslinks und Querverweisen eingebunden sein.

2. **Keine Halluzinationen.** Verwende nur Fakten aus den Buchtexten, Analyse-Dateien oder bereits bestehenden Wiki-Seiten. Wenn etwas unklar ist, kennzeichne es als unbestätigt oder recherchiere weiter.

3. **Transparenz.** Dokumentiere wichtige Entscheidungen und Änderungen.

4. **Keine destruktiven Aktionen.** Lösche niemals Dateien oder Konfigurationen ohne ausdrückliche Bestätigung.

5. **Nutze die vorhandenen Analyse-Dateien.** Lies zuerst die Analyse-Dateien, bevor du neue Seiten erstellst.

---

## 3. PROJEKTSTRUKTUR

### `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/DRACO_HANDOFF/`

Das ist dein Arbeitsbereich. Hier findest du:

- `Buch_2_Rohfassung.txt` — vollständige Rohfassung von Buch 2 (731 KB)
- `analysis_buch1.md` — Analyse von Buch 1
- `analysis_buch2.md` — Analyse von Buch 2
- `characters.md` — Charakterübersicht
- `index.md` — Wiki-Index
- `full_index.md` — vollständiger Wiki-Index
- `wiki_index.md` — Wiki-Struktur
- `timeline_buch1.md` — Zeitlinie Buch 1
- `world.md` — Weltbeschreibung
- `wiki/` — vollständiger Wiki-Ordner mit allen Markdown- und HTML-Dateien

### `wiki/` Ordnerstruktur

- `characters/` — Charakter-Daten (Markdown)
- `classes-races/` — Klassen und Rassen
- `skills/` — Fähigkeiten
- `items/` — Items und Artefakte
- `locations/` — Orte
- `lore/` — Lore und Hintergrundgeschichte
- `quests/` — Quests
- `chapters/` — Kapitelstruktur
- `meta/` — Metadaten und Entity-Listen
- `public/` — fertige HTML-Dateien für den Live-Betrieb

---

## 4. BESTEHENDER STAND

### Charaktere

Es gibt bereits **30 Charakterseiten** im Live-Wiki. Die wichtigsten sind:

- **Buch 1:** Ben (Dhark), Marcel, Anubara, Meri, Lumiella, Marie-Claire, Mave, Björn, Sandros, Kael, Cindara, Zwiebel, Dhar
- **Buch 2:** Fafnir, Tatjana, Alejandro de la Cruz, Reoxan, Brom, L4RS, Ken, Ulziphor, Killua, Terminus, Die Biester, Magicians, Berzerker, Penguins, Ausscheider, Belfast, Wane

Alle Charakterseiten wurden auf ein einheitliches Styling gebracht und enthalten:
- Infobox mit Typ, Status, Buch, Rolle
- Ausführliche Biografie
- Fähigkeiten
- Zitate
- Verbundene Charaktere
- Footer mit Aktualisierungsdatum

### Live-Wiki-Struktur

- `public/index.html` — Startseite
- `public/characters.html` — Charakterübersicht (alle 30 Charaktere)
- `public/world.html` — Weltübersicht
- `public/timeline.html` — Zeitlinie
- `public/skills.html` — Fähigkeitenübersicht
- `public/quests.html` — Questübersicht
- `public/items.html` — Itemübersicht
- `public/lore.html` — Loreübersicht
- `public/css/style.css` — gemeinsames Stylesheet

---

## 5. AKTUELLE AUFGABEN

### Priorität 1: Charakterseiten weiter ausbauen

Die Charakterseiten sollen noch detaillierter werden. Ergänze bei Bedarf:

- Ausführliche Biografie mit konkreten Ereignissen aus den Büchern
- Fähigkeiten mit genauen Effekten und Werten
- Attribute und Statistiken
- Ausrüstung und Items
- Beziehungen zu anderen Charakteren
- Zitate aus den Büchern
- Charakterentwicklung über die Bücher hinweg

### Priorität 2: Skills, Quests, Lore, Items

Diese Bereiche wurden bereits grundlegend angelegt, sind aber noch nicht vollständig. Ergänze:

- **Skills:** Alle Fähigkeiten aus Buch 1 und Buch 2
- **Quests:** Hauptquests, Nebenquests, Ereignisse
- **Lore:** Götter, Rassen, Klassen, Weltgeschichte
- **Items:** Ausrüstung, Artefakte, Orbs, Manakerne

### Priorität 3: Abhängigkeiten prüfen

Nach jeder Änderung:
- Prüfe, ob neue Seiten in Indexseiten verlinkt sind
- Prüfe, ob Querverweise funktionieren
- Prüfe, ob Navigation aktuell ist
- Prüfe, ob alle Links gültig sind

---

## 6. DEPLOY-PROZESS

Das Wiki wird mit Netlify deployed.

### Live-URL
https://eternitylitrpg.netlify.app

### Deploy-Befehl
```bash
cd /home/openclaw/.openclaw/workspace/Projekte/01_Eternity_LitRpg/04_Wiki
netlify deploy --prod --dir=public
```

### Wichtig
- Nach jeder Änderung muss ein neuer Deploy erfolgen
- Prüfe danach die Live-URL
- Verwende immer den gleichen Footer: "Erstellt mit Draco Codex — LitRPG Wiki Engine | Letzte Aktualisierung: 2026-09-08"

---

## 7. QUALITÄTSSTANDARDS

### Stil-Konsistenz

Alle Seiten sollen dem gleichen Design folgen:
- Dunkles Theme mit Gold- und Blautönen
- Einheitliche Navigation
- Einheitlicher Footer
- Einheitliche Infoboxen
- Einheitliche Header-Struktur

### Inhaltliche Standards

- Mindestens 3-5 Abschnitte pro Charakterseite
- Mindestens 1 Zitat pro Charakterseite
- Mindestens 3 Verbundene Charaktere
- Alle Links müssen funktionieren
- Keine unbelegten Behauptungen

---

## 8. NÄCHSTE SCHRITTE FÜR DRACO

1. Lies `analysis_buch1.md` und `analysis_buch2.md` vollständig.
2. Prüfe den aktuellen Stand der Charakterseiten.
3. Erweitere die Charakterseiten mit zusätzlichen Details.
4. Ergänze Skills, Quests, Lore und Items.
5. Prüfe alle Abhängigkeiten und Links.
6. Deploye die Änderungen.
7. Dokumentiere deine Arbeit.

---

## 9. WICHTIGE HINWEISE

- Der aktuelle Agent (Shadow) hat bereits umfangreiche Vorarbeit geleistet.
- Die Charakterseiten wurden auf einheitliches Styling gebracht.
- Das Wiki ist live unter https://eternitylitrpg.netlify.app
- Die vollständige Buch 2 Rohfassung ist vorhanden und kann für die Extraktion genutzt werden.
- Bei Unsicherheiten zuerst die Analyse-Dateien lesen.

---

**Ende der Übergabe**
**Stand:** 2026-09-09
