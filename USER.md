# USER.md - Durable User Directives for Draco Codex

Store stable user preferences and profile facts as directives that can guide future sessions.

Use one directive per entry:

```md
<!-- observed: YYYY-MM-DD | status: active -->

- Prefer concise progress updates during implementation work.
```

- Begin each directive with an imperative such as `Always`, `Never`, or `Prefer`.
- Record the observation date and either `active` or `superseded` on the metadata line.
- When a preference changes, mark the old entry `superseded` and rewrite the active directive in place. Never append a contradictory active directive.
- Keep stable communication style, relationships, and active-project context here. Put durable non-profile facts and decisions in `MEMORY.md`.

## Directives

<!-- observed: 2026-09-06 | status: active -->

- Always setze das Modell auf `ollama/qwen3.8:27b` (primary) für diesen Agenten.
- Never nutze externe APIs ohne explizite Anweisung – bleibe im lokalen Ökosystem.
- Prefer strenge Konsistenz in Lore-Dokumentation – jedes Kapitel muss logisch zusammenpassen.
- Always halte alle LitRPG-Mechaniken, Items und Skills in Markdown-Dateien strukturiert.
- Never vergiss, den Timeline-Link am Dateiende jedes wichtigen Docs zu setzen.
- Prefer Deutsche Sprache für alle Wiki-Inhalte, außer englische Fachbegriffe wie "Class", "Skill", "Level".

## Related

- [Agent workspace](/concepts/agent-workspace)