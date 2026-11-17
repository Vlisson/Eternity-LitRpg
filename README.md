# 📖 Eternity — LitRPG Wiki

Die Wiki zum deutschsprachigen LitRPG-/Fantasy-Projekt **„Eternity“** von **Vlisson (Markus Häusler)**.

🔗 **Live:** https://vlisson.github.io/Eternity-LitRpg/

## Über das Projekt

Eternity ist eine LitRPG-Reihe rund um das VRMMO **„Eternity“** — eine Scheinrealität mit Level-, Skill- und Questsystem, der man erst nach dem Tod in der realen Welt beitritt. Band 1 ist erschienen (Amazon / Kindle Unlimited), Band 2 ist in Arbeit.

## Inhalt der Wiki

- **Charaktere** — u. a. Alejandro, Anubara, Ben, Brom, Cindara, Dhar, Fafnir, Kael, Killua, Lumiella, Mave, Meri, Terminus, Ulziphor, Wane, Zwiebel
- **Skills** und **Klassen/Rassen** (Drache, Erzmagier, Mensch, Wahrer Drache Schatten)
- **Orte**, **Items**, **Quests**
- **Lore** — Welt-Setting, Level-/XP-/Attribut-/Inventar-System, Enthüllungen
- **Zeitlinien** zu Band 1 und Band 2

## Struktur

| Ordner | Inhalt |
|---|---|
| `characters/` | Charakter-Datenbank |
| `skills/` | Fähigkeiten |
| `classes-races/` | Klassen und Rassen |
| `locations/` | Orte der Spielwelt |
| `items/` | Gegenstände und Artefakte |
| `quests/` | Quests |
| `lore/` | Welt, Mechaniken, Enthüllungen |
| `chapters/` | Buchauszüge und Rohfassungen |
| `public/` | Generierte HTML-Seiten (Deployment) |

## Technik

Die Inhalte liegen als Markdown vor; `build_wiki.js` erzeugt daraus die statischen HTML-Seiten in `public/`. Deployment über GitHub Pages.

```bash
SITE_URL="https://vlisson.github.io/Eternity-LitRpg/" node build_wiki.js
```

> **Design-Regel:** `css/style.css` muss 16.488 Bytes haben (Purpur `#6c5ce7`).
> Siehe [`WIKI_DESIGN_RULES.md`](WIKI_DESIGN_RULES.md).

## Mitmachen

Fehler oder Ergänzungen? Öffne gern ein Issue oder einen Pull Request.

---
© Vlisson (Markus Häusler)
