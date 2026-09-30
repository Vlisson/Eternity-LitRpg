# Eternity Wiki - Deployment Instructions

## Kostenlose Hosting-Optionen

### Option 1: Netlify Drop (einfachste Methode - kein Account nötig)
1. Gehe zu: https://app.netlify.com/drop
2. Ziehe den gesamten `public` Ordner per Drag&Drop auf die Seite
3. Netlify gibt dir eine zufällige Subdomain wie `https://xyz.netlify.app`
4. Optional: Benenne die Site in den Site-Einstellungen um

### Option 2: Netlify CLI (für automatisierte Deployments)
1. Installiere Netlify CLI: `npm i -g netlify-cli`
2. Melde dich an: `netlify login` (oder verwende Access Token)
3. Deploy: `netlify deploy --dir=public --prod`

### Option 3: Vercel
1. Installiere Vercel CLI: `npm i -g vercel`
2. Melde dich an: `vercel login`
3. Deploy: `vercel --prod` (aus dem Wiki-Ordner)

### Option 4: Cloudflare Pages
1. Erstelle ein Git-Repo mit dem `public` Ordner
2. Verbinde mit Cloudflare Pages über das Dashboard
3. Setze Build-Command auf nichts und Build-Ausgabe auf `public`

## Ordnerstruktur für Deployment
```
public/
├── index.html
├── characters.html
└── world.html
```

## Beispiel-URLs nach Deployment
- Home: https://deine-site.netlify.app/
- Characters: https://deine-site.netlify.app/characters.html
- World: https://deine-site.netlify.app/world.html

## Hinweis
Das Wiki ist als statische HTML-Seiten konzipiert und benötigt keinen Server-side Code oder Datenbank.
Alle Links sind relativ und funktionieren nach dem Deployment korrekt.

---
*Erstellt am: $(date)*
*Projekt: Eternity LitRPG Wiki*