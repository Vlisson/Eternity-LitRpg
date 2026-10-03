# SEO-Optimierung - Aufgabennotiz

## Status: Lokale Optimierung abgeschlossen, Deployment ausstehend

**Datum:** 2026-09-27  
**Aufgabe:** Alle SEO-optimierten Dateien auf GitHub pushen, damit die Live-Website unter https://vlisson.github.io/Eternity-LitRpg/ die neuen Meta-Tags, Canonical-URLs und Struktur-Daten erhält.

---

## Was wurde lokal erledigt:

### 1. Alle HTML-Dateien SEO-optimiert
**Verzeichnis:** `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/`

**Dateien mit SEO-Updates (9 Stück):**
- ✅ `index.html` - Startseite mit vollständiger SEO-Struktur
- ✅ `characters.html` - Charaktere-Übersicht
- ✅ `skills.html` - Fähigkeiten & Skills
- ✅ `items.html` - Items & Gegenstände
- ✅ `lore.html` - Lore & Weltinformationen
- ✅ `quests.html` - Quests-Übersicht
- ✅ `timeline.html` - Zeitlinie & Chronologie
- ✅ `world.html` - Welt & Setting
- ✅ `search.html` - Suchseite

**SEO-Elemente hinzugefügt:**
- Titel-Tags mit Keywords
- Meta-Descriptions (deutsch, relevant)
- Meta-Keywords
- Canonical-URLs → `https://vlisson.github.io/Eternity-LitRpg/` (NETLIFY-FIX!)
- Open Graph Tags (og:title, og:description, og:url, og:image)
- Twitter Card Tags
- JSON-LD Strukturierte Daten (Schema.org)
- Author-Tag: Vlisson (Markus)

### 2. Technische SEO-Dateien aktualisiert
- ✅ `robots.txt` - Verweist korrekt auf GitHub Pages Sitemap
- ✅ `sitemap.xml` - Alle 13 URLs mit korrekten GitHub-Pages-Links

### 3. Git-Status
- Lokale Commits vorhanden (Hash: `501a7980`)
- Remote `origin` konfiguriert: `https://github.com/Vlisson/Eternity-LitRpg.git`
- **Problem:** Keine GitHub-Authentifizierung verfügbar → Push fehlgeschlagen

---

## Zu erledigen bei nächstem Update:

### Schritt 1: GitHub-Authentifizierung
- GitHub-Token oder SSH-Key konfigurieren
- Alternative: GitHub Pages direkt über GitHub UI aktualisieren

### Schritt 2: Dateien pushen
```bash
cd /home/openclaw/.openclaw/workspace-main/1.\ Eternity\ LitRpg
git add -A
git commit -m "SEO Optimization: meta tags, canonical URLs, structured data"
git push origin master
```

### Schritt 3: GitHub Pages Deployment prüfen
- Warte auf GitHub Pages Cache-Invalidierung (ca. 5-10 Minuten)
- Prüfe Live-Seite: https://vlisson.github.io/Eternity-LitRpg/
- Verifiziere Canonical-URLs in der Live-Version

### Schritt 4: Google Search Console
- Sitemap einreichen: https://vlisson.github.io/Eternity-LitRpg/sitemap.xml
- Seite auf Indexierung prüfen

---

## Dateien im Workspace:
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/index.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/robots.txt`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/sitemap.xml`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/characters.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/skills.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/items.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/lore.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/quests.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/timeline.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/world.html`
- `/home/openclaw/.openclaw/workspace-main/1. Eternity LitRpg/search.html`

---

## Wichtige Hinweise:
- Die **GitHub-Seite** wird über `gh-pages` Branch oder `main` Branch bedient
- Die **Canonical-URLs** dürfen **NICHT** wieder auf `eternitylitrpg.netlify.app` zeigen
- Die **Sitemap-URL** muss auf `https://vlisson.github.io/Eternity-LitRpg/sitemap.xml` zeigen
- Alle 13 Seiten müssen in der Sitemap enthalten sein

---

**Erstellt:** 2026-09-27 17:29  
**Status:** 🟡 Lokal abgeschlossen, Deployment ausstehend
