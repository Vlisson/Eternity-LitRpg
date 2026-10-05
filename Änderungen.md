# Änderungen

*Diese Seite dokumentiert alle Aktualisierungen, Korrekturen und neuen Inhalte, die auf dem Eternity Wiki vorgenommen wurden.*

## 🔄 Aktualisierungen

### 2026-10-05
- **H1-Überschrift geändert**: Startseite zeigt jetzt `Eternity LitRPG` statt `Eternity Wiki — Lore & Mechaniken`
- **Footer-Text aktualisiert**: `Wiki zum Roman Eternity LitRPG – Inhalt basiert auf Büchern von Vlisson | Plattform, Struktur & Pflege durch Draco Codex (KI) | Stand: YYYY-MM-DD`
- **Buchcover auf Startseite**: `cover.jpg` (60 KB) im Abschnitt `📖 Buch-Overview` eingebunden
- **Quests-Seite optimiert**: Quest-Karten mit Icon, Titel, Rang-Badge, Sterne-Bewertung, Statistiken-Panel (7 Quests, 45+ Schritte, 120+ Std.)
- **GitHub Pages flache Struktur**: `public/`-Verzeichnis an Branch-Root kopiert, redundanten Ordner entfernt
- **Tägliche Draco-Automation eingerichtet**: Analysiert Wiki täglich 9:00 MEZ, wählt eine Seite zur Optimierung, lädt sie hoch
- **Cache-Busting durchgeführt**: Leerer Commit `65602503` zur Zwangserneuerung der GitHub-Pages-Cache
- **Deploy-Status**: Letzter Commit `5d494c12` – H1 + Cover + Footer alle live

### 2026-10-04
- **Footer-Datum aktualisiert**: Alle 148 HTML-Dateien erhalten neues Datum `2026-10-04` statt altem `2026-09-27 16:18`
- **Build-Skript erweitert**: Dynamische `getCurrentDate()`-Funktion für automatisches Datum
- **FOOTER in DRACO_HANDOFF**: `build-wiki.js` Datum von `2026-09-10` → `2026-10-04` aktualisiert
- **Navigation korrigiert**: Relativen Links (`index.html`, `../index.html`) auf allen Seiten
- **GitHub Actions Workflow**: Trigger erweitert um `gh-pages` Branch
- **Deploy-Status**: Commit `c6ad501e` – alle Seiten neu aufgebaut und gepushed

### 2026-09-24
- **Wiki-Konfiguration aktualisiert**: Workflow (`deploy.yml`) auf `main`-Branch hinzugefügt und von `gh-pages` entfernt
- **GitHub Pages-Pipeline korrigiert**: `netlify-cli`-Abhängigkeit aus `package.json` entfernt → Build-Fehler behoben
- **GitHub Actions-Workflow wiederhergestellt**: Vollständige `deploy.yml` auf `main`-Branch kopiert für erfolgreiche GitHub Pages-Builds
- **GitHub Pages Deployment ausgelöst**: Leerer Commit auf `gh-pages`-Branch für Cache-Busting
- **GitHub Pages jetzt live**: Dark/LitRPG-Design aktiv – https://vlisson.github.io/Eternity-LitRpg/
- **Cloudflare Workers**: Dark/LitRPG-Design bereits live – https://eternity-litrpg.cobalt-rain.workers.dev/

### 2026-09-23
- **Erster GitHub Actions-Workflow auf `main` hinzugefügt** (teilweise unvollständig)
- **Wiki neu aufgebaut** mit modernem Dark/LitRPG-Design auf `gh-pages`
- **Cloudflare Workers**-Bereitstellung erfolgreich (vorübergehend)
- **GitHub Pages** ist alt (Blau/Silber-Design) aufgrund fehlerhafter Workflow auf `main`

### 2026-09-24
- **Erste Versionsveröffentlichung des Eternity Wiki**
- **Build-Skript (`build_wiki.js`)** erstellt
- **Grundlegende Wiki-Seiten**: Startseite, Charaktere, Skills, Items, Orte, Klassen/Rassen, Quests, Lore, Impressum
- **GitHub Pages** zuerst veröffentlicht – Blau/Silber-Design
- **Cloudflare Workers** Dienst bereitgestellt – gleiches Design wie GitHub Pages

### 2026-09-17
- **Eternity Wiki vom Grund auf erstellt**
- **Erste Markdown-Dateien**: Characters, Skills, Items, Locations, Classes/Races, Quests, Lore, Timeline, Actions, Artifacts
- **Markdown-zu-HTML-Generierung** implementiert
- **Erste Wiki-Version online** – schlichtes, funktionales Design

### 2026-09-13
- **Projekt initiiert**
- **Repository erstellt**: Eternity-LitRpg
- **Grundlagen gelegt**: README, Projektübersicht, GDD (Game Design Document)

## 📂 Bearbeitete Dateien

- **build_wiki.js** – Ausbau des Build-Skripts, Hinzufügung neuer Seiten (entity_report, timeline)
- **package.json** – `netlify-cli` entfernt, Wrangler 4 hinzugefügt
- **style.css** – Dark/LitRPG-Design aktualisiert
- **verschiedene Markdown-Dateien** – Korrekturen und neue Inhalte hinzugefügt (Characters, Skills, etc.)

## 🕐 Timeline

- **2026-09-13** – Projekt initiiert
- **2026-09-17** – Erste Wiki-Version online
- **2026-09-24** – Erste öffentliche Veröffentlichung
- **2026-09-23** – Design aktualisiert, Pipelines bereinigt
- **2026-09-24** – Aktuelle Korrekturen und GitHub Pages bereitgestellt

## 📋 Verzeichnisse

- **Charaktere** → https://vlisson.github.io/Eternity-LitRpg/characters.html
- **Skills** → https://vlisson.github.io/Eternity-LitRpg/skills.html
- **Items** → https://vlisson.github.io/Eternity-LitRpg/items.html
- **Orte** → https://vlisson.github.io/Eternity-LitRpg/locations.html
- **Klassen/Rassen** → https://vlisson.github.io/Eternity-LitRpg/classes-races.html
- **Quests** → https://vlisson.github.io/Eternity-LitRpg/quests.html
- **Lore** → https://vlisson.github.io/Eternity-LitRpg/lore.html

## 📊 Build-Zusammenfassung

| Komponente | Status | Letzte Änderung |
|-----------|--------|-------------|
| GitHub Actions Workflow | ✅ Repariert | 2026-09-24 |
| GitHub Pages | ✅ Live (Dark) | 2026-09-24 |
| Cloudflare Workers | ✅ Live (Dark) | 2026-09-24 |
| Build-Skript | ✅ Funktional | 2026-09-24 |
| Wiki-Inhalte | ✅ Aktualisiert | 2026-09-24 |

## 🌐 Zugriff auf Wiki

- **GitHub Pages**: https://vlisson.github.io/Eternity-LitRpg/
- **Cloudflare Workers**: https://eternity-litrpg.cobalt-rain.workers.dev/

## 📞 Kontakt

GitHub: Vlisson  
E-Mail: Eternity-LitRpg@online.de