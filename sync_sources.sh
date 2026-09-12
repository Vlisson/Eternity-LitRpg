#!/usr/bin/bash
set -e

SRC="/home/openclaw/.openclaw/workspace/Projekte/01_Eternity_LitRPG/04_Wiki"
DST="/home/openclaw/projects/eternity-wiki"

# Verzeichnisse aus der größeren Quelle, die kopiert werden sollen
DIRECTORIES=(
  "wiki"
  "meta"
  "skills"
  "items"
  "locations"
  "classes-races"
  "quests"
  "lore"
  "factions"
  "artifacts"
  "chapters"
  "daily-suggestions"
  "ANALYSIS"
)

for dir in "${DIRECTORIES[@]}"; do
  if [ -d "$SRC/$dir" ]; then
    echo "Kopiere $dir..."
    # Überspringe build_wiki.js, andere interne Skripte, node_modules, .git usw.
    rsync -a --exclude='build_wiki.js' --exclude='*.py' --exclude='node_modules' --exclude='.git' --exclude='*.DS_Store' --exclude='*.log' "$SRC/$dir/" "$DST/$dir/" 2>/dev/null || true
  fi
done

# Einzelne Dateien kopieren (überschreiben, falls vorhanden)
cp -v "$SRC/index.md" "$DST/" 2>/dev/null || true
cp -v "$SRC/characters.md" "$DST/" 2>/dev/null || true
cp -v "$SRC/README.md" "$DST/" 2>/dev/null || true
cp -v "$SRC/README_DEPLOY.md" "$DST/" 2>/dev/null || true
cp -v "$SRC/Eternity_Simulation_GDD.md" "$DST/" 2>/dev/null || true
cp -v "$SRC/PROJEKTE_UEBERSICHT.md" "$DST/" 2>/dev/null || true

echo "✅ Quellintegrität aus größeren Wiki integriert."
