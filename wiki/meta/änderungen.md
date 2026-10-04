# Changelog

## 2026-10-04 — v2.0.0
- **Design komplett überarbeitet**: Modernes Dark/LitRPG-Design von Netlify-Vorlage übernommen (Blau/Silber-Farbschema)
- **Alle 1.399 Links repariert**: Absolute Pfade durch relative Pfade ersetzt → 0 kaputte Links
- **CSS konsolidiert**: Einheitliches CSS für alle 203 HTML-Seiten
- **Build-Skript optimiert**: CSS-Pfad auf relativ (`../css/wiki-style.css`) korrigiert
- **Änderungen-Seite hinzugefügt**: Vollständige Historie dokumentiert

## 2026-09-24
- **Wiki-Konfiguration aktualisiert**: Workflow (`deploy.yml`) auf `main`-Branch hinzugefügt und von `gh-pages` entfernt
- **GitHub Pages-Pipeline korrigiert**: `netlify-cli`-Abhängigkeit aus `package.json` entfernt → Build-Fehler behoben
- **GitHub Actions-Workflow wiederhergestellt**: Vollständige `deploy.yml` auf `main`-Branch kopiert für erfolgreiche GitHub Pages-Builds
- **GitHub Pages Deployment ausgelöst**: Leerer Commit auf `gh-pages`-Branch für Cache-Busting
- **GitHub Pages jetzt live**: Dark/LitRPG-Design aktiv – https://vlisson.github.io/Eternity-LitRpg/
- **Cloudflare Workers**: Dark/LitRPG-Design bereits live – https://eternity-litrpg.cobalt-rain.workers.dev/

## 2026-09-23
- **Erster GitHub Actions-Workflow auf `main` hinzugefügt** (teilweise unvollständig)
- **Wiki neu aufgebaut** mit modernem Dark/LitRPG-Design auf `gh-pages`
- **Cloudflare Workers**-Bereitstellung erfolgreich (vorübergehend)
- **GitHub Pages** ist alt (Blau/Silber-Design) aufgrund fehlerhafter Workflow auf `main`

## 2026-09-24 (Initial Release)
- **Erste Versionsveröffentlichung des Eternity Wiki**
- **Build-Skript (`build_wiki.js`)** erstellt
- **Grundlegende Wiki-Seiten**: Startseite, Charaktere, Skills, Items, Orte, Klassen/Rassen, Quests, Lore, Impressum
- **GitHub Pages** zuerst veröffentlicht – Blau/Silber-Design
- **Cloudflare Workers** Dienst bereitgestellt – gleiches Design wie GitHub Pages

## 2026-09-17
- **Eternity Wiki vom Grund auf erstellt**
- **Erste Markdown-Dateien**: Characters, Skills, Items, Locations, Classes/Races, Quests, Lore, Timeline, Actions, Artifacts
- **Markdown-zu-HTML-Generierung** implementiert
- **Erste Wiki-Version online** – schlichtes, funktionales Design

---

*Letzte Aktualisierung: 2026-10-04*
*Pflegeagent: Draco Codex (KI)*
*Inhalte: Basierend auf Büchern von Vlisson – Eternity: Ein LitRPG Fantasy Abenteuer*
