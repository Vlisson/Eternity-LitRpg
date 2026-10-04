# ETERNITY WIKI – Vollständige Struktur (Export 2026-10-04)

> Gespeichert aus dem Deployment-Session. Enthält alle Wiki-Seiten, Navigation, Footer-Regeln und Build-Logik.

---

## Navigation (14 Hauptseiten + Unterkategorien)

| Link | Label | Icon |
|------|-------|------|
| index.html | Startseite | 🏠 |
| characters.html | Charaktere | ⚔️ |
| skills.html | Skills | ⚡ |
| items.html | Items | 🗡️ |
| locations.html | Orte | 🌍 |
| classes-races.html | Klassen/Rassen | ⚙️ |
| quests.html | Quests | 📜 |
| lore.html | Lore | 📚 |
| timeline.html | Zeitlinie | ⏳ |
| factions.html | Fraktionen | 🏛️ |
| artifacts.html | Artefakte | 🎁 |
| entity_report.html | Entity-Report | 📊 |
| guestbook.html | Gästebuch | ✍️ |
| comments.html | Kommentare | 💬 |
| impressum.html | Impressum | ℹ️ |
| Änderungen.html | Änderungen | 📋 |

---

## Footer (dynamisch via `getCurrentDate()` in build_wiki.js)

```
Eternity Wiki – Inhalt basiert auf Büchern von Vlisson
| Plattform, Struktur & Pflege durch Draco Codex (KI)
| Stand: YYYY-MM-DD
[Impressum & KI-Hinweis] [Änderungen] [Gästebuch] [Kommentare] [Sitemap]
```

---

## Design-Variablen (Purpur/Silber – `css/style.css` & `css/wiki-style.css`)

```css
:root {
  --primary: #6c5ce7;        /* Purpur */
  --primary-light: #a29bfe;
  --primary-dark: #5641c3;
  --primary-glow: rgba(108, 92, 231, 0.25);
  --accent: #74b9ff;         /* Silber-Blau */
  --bg-primary: #0a0e1a;     /* Tiefer Dunkel-Hintergrund */
  --bg-secondary: #131829;
  --bg-card: #1a1f35;
  --text-primary: #e2e8f0;
  --text-secondary: #a0aec0;
  --border-color: rgba(108, 92, 231, 0.2);
}
```

---

## Build-Logik (`build_wiki.js`)

### Wichtige Funktionen
- `getNavigationHtml(currentPage)` – berechnet relative Pfade via `basePath` (`../` für Sub-Verzeichnisse)
- `getFooterHtml(basePath)` – dynamisches Datum, Links zu Impressum/Änderungen/Gästebuch/Kommentare/Sitemap
- `getCurrentDate()` – `YYYY-MM-DD`
- `mdToHtml()` – rendert Markdown → HTML mit Navigation, Footer, SEO-Meta, Canonical-URL
- `generateToc()` – Inhaltsverzeichnis aus `##`/`###` Überschriften
- `resolveWikiLinks()` – wandelt `[[Link]]` in HTML-Links um

### Output-Struktur (GitHub Pages = Branch-Root)
```
gh-pages branch root/
├── *.html                    (21 Hauptseiten: index, characters, skills, items, ...)
├── css/
│   ├── style.css
│   └── wiki-style.css
├── js/
│   ├── comments.js
│   ├── guestbook.js
│   └── guestbook.css
├── favicon*.svg
├── sitemap.xml
├── robots.txt
├── characters/
│   └── *.html               (22 Char-Seiten)
├── skills/
│   └── *.html               (37 Skill-Seiten)
├── items/
│   └── *.html               (20 Item-Seiten)
├── locations/
│   └── *.html               (23 Location-Seiten)
├── classes-races/
│   └── *.html               (11 Klassen/Rassen)
├── quests/
│   └── *.html               (7 Quest-Seiten)
├── chapters/
│   └── *.html               (Buch-Kapitel)
├── admin/
│   └── index.html
├── wiki/                    (Legacy/Backup)
└── DRACO_HANDOFF/           (Entwicklung/Backup)
```

---

## Deployment-Regeln (Gelernt am 2026-10-04)

1. **GitHub Pages erwartet flache Struktur am Branch-Root** – keine `public/`-Unterverzeichnisse.
2. **CSS-Pfade:**
   - Root-Seiten: `href="css/style.css"`
   - Sub-Verzeichnisse: `href="../css/style.css"`
3. **Body-Klasse:** `<body class="eternity">` für Purpur-Design zwingend.
4. **Footer-Datum:** Immer dynamisch via `getCurrentDate()` – keine Hardcodes.
5. **Cache-Busting:** Nach Push `curl "URL?cb=$(date +%s)"` prüfen (GitHub Pages cache ~5-15 Min).
6. **Workflow:** `.github/workflows/deploy.yml` triggert auf `push` zu `main` UND `gh-pages`.

---

## Letzte Fixes (Commit `955849ff`)

- `public/`-Inhalt an Root kopiert
- `public/` aus Branch entfernt
- Alle 148 HTML-Dateien haben jetzt korrekte relative Links + `class="eternity"`
- Footer auf `2026-10-04` aktualisiert
- `Änderungen.md` + `Änderungen.html` mit Tageszusammenfassung ergänzt

---

## Live-URLs

- **GitHub Pages:** https://vlisson.github.io/Eternity-LitRpg/
- **Cloudflare Workers:** https://eternity-litrpg.cobalt-rain.workers.dev/

---

## Repository

- **GitHub:** Vlisson/Eternity-LitRpg
- **Branch:** `gh-pages` (Deployment), `main` (Source)
- **Workflow:** `Deploy Eternity Wiki` (`.github/workflows/deploy.yml`)

---

*Generiert und gespeichert von Shadow (Draco Codex) am 2026-10-04*