# 🎨 Eternity Wiki – Design-Schutz-Regeln

> ⚠️ **WICHTIG: Diese Datei MUSS vor jeder Wiki-Änderung gelesen werden!**

---

## 🔴 **Design-Problem (behoben)**

Am 30.09.2026 wurde das Design durch einen Build-Prozess überschrieben.
Die Live-Seite lud `/css/wiki-style.css` (Gold/Blau) statt unseres Designs.

### **Ursache:**
- `css/style.css` = 5.987 Bytes (altes Gold/Blau-Design)
- `public/css/style.css` = 16.488 Bytes (korrektes Purpur/Blau-LitRPG-Design)
- HTML-Dateien referenzierten `css/style.css` → lud das alte Design

### **Lösung (erledigt):**
```bash
cp public/css/style.css css/style.css
cp public/css/style.css css/wiki-style.css
```

---

## 📏 **Regeln für Wiki-Änderungen**

### **VOR jeder Änderung:**
1. ✅ **Lies diese Datei** (`WIKI_DESIGN_RULES.md`)
2. ✅ Prüfe welche CSS-Datei geladen wird: `grep -r "css/" public/ --include="*.html"`
3. ✅ Prüfe ob `css/style.css` die korrekten Farben hat (Purpur #6c5ce7)

### **NACH jeder Änderung:**
1. ✅ Teste die Live-Seite: `curl -s https://vlisson.github.io/Eternity-LitRpg/ | grep "css/style.css"`
2. ✅ Verifiziere die Farben: `curl -s https://vlisson.github.io/Eternity-LitRpg/ | grep "#6c5ce7"`
3. ✅ Prüfe Navigation: Gästebuch & Kommentare sichtbar?

### **BEI Verdacht auf Design-Überschreibung:**
1. Prüfe `css/style.css` Größe: Sollte 16.488 Bytes sein
2. Prüfe `css/wiki-style.css` Größe: Sollte 16.488 Bytes sein
3. Falls kleiner → `cp public/css/style.css css/style.css`
4. Rebuild ausführen: `SITE_URL="https://vlisson.github.io/Eternity-LitRpg/" node build_wiki.js`
5. Deploy: `git add -f public/ && git commit -m "fix: design restored" && git push origin gh-pages`

---

## 🎨 **Korrektes Design (Purpur/Silber)**

```css
:root {
  --primary: #6c5ce7;           /* Purpur */
  --primary-light: #a29bfe;     /* Helles Purpur */
  --primary-dark: #5641c3;      /* Dunkles Purpur */
  --accent: #74b9ff;            /* Magisches Blau */
  --accent-gold: #fdcb6e;       /* Goldene Akzente */
  --bg-primary: #0a0e1a;        /* Tiefes Dunkel */
}
```

---

## 🔗 **Wichtige Pfade**

| Datei | Pfad | Größe |
|-------|------|-------|
| Korrektes CSS | `public/css/style.css` | 16.488 Bytes |
| Korrektes CSS (Root) | `css/style.css` | 16.488 Bytes |
| Korrektes CSS (Backup) | `css/wiki-style.css` | 16.488 Bytes |
| HTML-Seiten | `public/*.html` | Referenziert `css/style.css` |
| Build-Skript | `build_wiki.js` | Generiert HTML |

---

## 🚨 **Notfall-Reparatur (falls Design wieder kaputt)**

```bash
cd /home/openclaw/projects/eternity-wiki

# 1. CSS wiederherstellen
cp public/css/style.css css/style.css
cp public/css/style.css css/wiki-style.css

# 2. HTML neu bauen
SITE_URL="https://vlisson.github.io/Eternity-LitRpg/" node build_wiki.js

# 3. Deploy
git add -f public/ css/style.css css/wiki-style.css
git commit -m "fix: design restored"
git push origin gh-pages
```

---

**Letzte Prüfung:** 30.09.2026 20:52 – CSS synchronisiert
**Status:** ✅ Design aktiv auf allen Seiten

---### 📝 Gastbuch & Kommentare (Entwicklung)
**Status:** ⚠️ Unter Entwicklung – Nicht funktionsfähig

Das Gästebuch und die Kommentarfunktion nutzen geplante **Firebase Firestore** Integration für Cloud-Speicherung.

⚠️ **Aktueller Stand (03.10.2026):**
- `.env` Datei fehlt (Konfiguration erforderlich)
- `public/js/firebase-config.js` enthält nur Platzhalter (`***`)
- HTML-Seiten zeigen nun <code>🔧 Noch in Arbeit!</code>-Hinweise
- Fertigstellung: Nach Firebase-Konfiguration einsetzen

### Sofortmaßnahmen:
1. Firebase Console: https://console.firebase.google.com/
2. Projekt: `eternity-litrpg-wiki` erstellen
3. Web-App registrieren (</> Symbol)
4. SDK-Snippet kopieren (6 Werte)
5. `.env` und `public/js/firebase-config.js` eintragen
6. `git add -f public/ && git commit -m "feat: firebase config" && git push origin gh-pages`

### Nach Fertigstellung:
- Gästebuch: Sofort für alle Besucher sichtbar
- Kommentare: Pro Seiten-spezifische Anzeige
- Echtzeit-Updates für alle Gäste