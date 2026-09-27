# Changelog

## 2026-09-06 — v1.0.0
- Wiki-Ordnerstruktur erstellt (characters, locations, items, skills, classes-races, quests, lore, chapters, meta)
- Phase 1: Inventory & Chunking — 2 Kapitel identifiziert (ch001: 663 Wörter, ch002: 108.716 Wörter)
- Phase 2: Entity-Extraktion für Kapitel 1 (Eternity_Buch_1_excerpt.txt) abgeschlossen
- Phase 3: Konsolidierung — meta/master_entities.json erstellt
- Phase 4: Wiki-Content-Generierung für Kapitel 1 abgeschlossen:
  - 1 Charakter: Ben
  - 2 Orte: Tropfsteinhöhle, Reich der Dämonen
  - 3 Gegenstände: Fackel, Feuerstein, Abenteuer-Paket
  - 2 Fähigkeiten: Kreativität, Rollenspielmeister
  - 4 Klassen/Rassen: Mensch, Drache, Amateur Schriftsteller, Erzmagier
  - 1 Quest: Quest des Helden
  - 1 Lore-Datei: Lore.md
  - 1 Kapitel-Zusammenfassung: Buch_1.md
- Phase 5: wiki_index.md als Hauptseite erstellt
- Nächster Schritt: Kapitel 2 verarbeiten

## Geplante Änderungen
- Kapitel 2 (Buch_2_Rohfassung.txt) entity-extrahieren
- Master-Dateien aktualisieren
- Wiki-Content für Kapitel 2 generieren
- HTML-Export für Netlify/Vercel
## 2026-09-10
- 🔨 Neuer Build-Prozess mit `build-wiki.js` implementiert
- ✅ Alle Markdown-Dateien werden mit `marked` in einheitliche HTML konvertiert
- ✅ Externes CSS (`css/wiki-style.css`) für konsistentes Design über alle Seiten
- ✅ Wiki-Links `[[Name]]` werden automatisch auf Entity-Seiten aufgelöst
- ✅ Master entities.json mit Kapitel 2 Daten aktualisiert
- ✅ Root duplicate `charakter_*.md` Dateien bereinigt (charakter_marcel.md entfernt)
- ✅ Netlify Deployment erfolgreich: 77 Dateien deployed
- 🔗 Produktive URL: https://eternitylitrpg.netlify.app
- 📊 Entity-Zahlen: 6 Charaktere, 12 Orte, 7 Items, 9 Skills, 1 Quest, 6 Fraktionen, 4 Rassen, 5 Klassen
