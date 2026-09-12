---
name: "eternity-wiki-generator"
description: "Regeneriert die Eternity LitRPG Wiki-Website mit einheitlichem CSS-Design, KI-Attribution und automatischem Build-Prozess"
---

# Eternity Wiki Generator Skill

## Beschreibung
Dieser Skill automatisiert die vollständige Regenerierung der Eternity LitRPG Wiki-Website. Er erstellt ein konsistentes Blau/Silber-Design, platziert KI-Attribution korrekt (Footer + Impressum-Seite), kopiert Assets, generiert alle HTML-Seiten aus Markdown-Quellen und stellt die Website auf Netlify bereit.

## Wann verwenden?
- Nach Änderungen an Markdown-Quellen.
- Nach Design-Änderungen (Farben, Nav, Footer).
- Um die Website mit der aktuellen Struktur und Modernen CSS zu neu generieren.
- Nach Hinzufügen neuer Kapitel oder Character-Daten.

## Schritte

1. **Vorbereitung**
   - Stellen Sie sicher, dass der aktuelle Arbeitsverzeichnis `/home/openclaw/projects/eternity-wiki` ist.
   - Stellen Sie sicher, dass die benötigten Node.js-Abhängigkeiten installiert sind (marked für Markdown-Konvertierung, optional netlify-cli für die Bereitstellung).

2. **Assets kopieren**
   - Kopieren Sie `favicon.svg` in `public/`.
   - Kopieren Sie `style.css` (zentrales Design) in `public/css/`.

3. **Build-Skript aktualisieren**
   - Passen Sie `build_wiki.js` an:
     a. Verwenden Sie `<link rel="stylesheet" href="css/style.css">` statt inlineen Styles.
     b. Setzen Sie den Footer-Text: `Eternity Wiki – Pflege durch Draco Codex (KI) | Stand: <datum>`.
     c. Fügen Sie eine Navigation hinzu, die alle generierten Seiten verknüpft.
     d. Generieren Sie die Seite `impressum.html` aus `impress.md`.
     e. Stellen Sie sicher, dass der Prozess alle Markdown-Dateien in `index.md`, `characters.md`, `wiki/`-Unterordner und Meta-Dateien liest.

4. **Generieren Sie HTML-Dateien**
   - Führen Sie `node build_wiki.js` aus.
   - Das Skript erstellt die `public/`-Website mit allen HTML-Dateien, CSS und Favicon.
   - Für Ordner-Übersichten (Skills, Items, Orte, Klassen/Rassen, Quests) müssen Links auf die generierten `.html`-Dateien in den jeweiligen Unterordnern zeigen; die Skript-Logik muss diese Unterordner vor dem Schreiben erstellen und `README.md`-Dateien aus der Ausgabe ausschließen.

5. **Bereitstellung auf Netlify**
   - Melden Sie sich bei Netlify an (`netlify login`).
   - Führen Sie `netlify deploy --prod --dir=public` aus.
   - Die Website ist unter `https://eternitylitrpg.netlify.app` live.

6. **Verifikation**
   - Öffnen Sie die Seite und bestätigen Sie das neue Design, Footer-Attribution, Impressum-Link.
   - Stellen Sie sicher, dass alle Navigationslinks funktionieren.

## Hinweise
- Das Skript geht davon aus, dass Markdown-Quellen im Repository existieren.
- Es erstellt keine zusätzlichen Ordner; es aktualisiert nur die `public/`-Website.
- Der KI-Attributionstext ist dynamisch (ändert sich bei jedem Build mit Datum).
- Die Impressum-Seite (`impress.md`) sollte erstellt oder aktualisiert werden, bevor der Build durchgeführt wird.

## Beispielbefehle (für Menschen)

```bash
cd /home/openclaw/projects/eternity-wiki
# Assets kopieren
mkdir -p public/css
cp favicon.svg public/
cp style.css public/css/
# Skript ausführen
node build_wiki.js
# Bereitstellung
netlify deploy --prod --dir=public
```

Dieser Skill stellt sicher, dass jede Neuerstellung der Wiki-Website demselben professionellen, konsistenten Design folgt und die erforderlichen Attribution und externe Bereitstellung gewährleistet sind.
