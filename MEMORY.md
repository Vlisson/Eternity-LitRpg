# MEMORY.md - Durable Facts and Decisions

- **2026-09-06**: Draco Codex ist bereit für Eternity LitRPG-Wiki-Erstellung
- **Modell**: ollama/qwen3.8:27b (27B lokal), openrouter/free als Fallback
- **Gespräch**: Immer Deutsch, außer Fachbegriffen gefragt
- **Tools**: read, write, edit, pdf erlaubt
- **Sandbox**: aus (VOLLZugriff auf Workspace)

## Literaturhinweise
- Web3-LitRPG-Elemente, Blockchain-Spielmechaniken
- Tierische Companion-Systeme
- Realm-basiertes PvP

## Deploy-Notizen (Netlify)
- `netlify login` → Browser-login, Site-ID notieren
- `netlify sites:list` → Site-ID/Name für eternitylitrpg ermitteln
- `cd /home/openclaw/projects/eternity-wiki` → In Projektordner wechseln
- `netlify deploy --prod --dir=public` → Live-URL bereitstellen (z. B. https://eternitylitrpg.netlify.app)
- Alternative: `netlify dev` für lokale Vorschau (http://localhost:8888)

## Verzeichnis
- `index.md` – Überblick über alle Kapitel
- `characters.md` – Charakter-Datenbank
- `Eternity_Simulation_GDD.md` – Haupt-GDD
- `daily-suggestions/` – tägliche Arbeitsblätter

---
<!-- project: path:/home/openclaw/.openclaw/workspace-main -->