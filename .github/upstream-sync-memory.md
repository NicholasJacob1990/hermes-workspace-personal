# Upstream Sync — Decision Memory

Persistent notes from prior `outsourc-e/hermes-workspace` syncs into the
personal fork. Each section: date + upstream HEAD short + decisions taken.
Appended at the END of each successful auto-sync.

---

## 2026-04-19 — sync from a7c1501 (manual, baseline)

Initial fusion baseline. Merged 8 upstream commits since prior sync:
ad014cf, 86989c9, 21eda0e, 086ce41, d9d6cae, 11b8b69, 77c429e, a7c1501.

**Decisions:**
- Pre-merge baseline commit captured WIP: voice integration files
  (`pipecat-voice.ts`, `voice-settings-options.ts`,
  `settings-dialog.voice.test.ts`, `hermes-provider-catalog.{ts,test.ts}`)
  + `hermes-config.ts`, `settings-dialog.tsx`, `settings/index.tsx`,
  `.gitignore`. Tag `pre-upstream-sync-hermes-2026-04-19` preserves the
  point before the merge.
- Zero overlap between WIP files and the 15 files touched by upstream
  commits — clean merge, no conflicts. Upstream files merged automatically.
- `ad014cf` (fix #62 duplicate responses on interrupt) and `086ce41`
  (model picker reads `~/.hermes/models.json`) came in via the merge.
  Confirmed both apply correctly to personal Hermes (no `~/.vorbium`
  adaptation needed).

**Rules learned:**
- Voice WIP files have no upstream overlap pattern so far — safe to keep
  in HEAD and merge around them.
- Personal Hermes uses `~/.hermes/` path; do NOT remap to `~/.vorbium/`
  (that's the Vorbium fork's concern, in `vorbium-workspace`).

**Repo structure note:**
- `origin` = `NicholasJacob1990/hermes-workspace-personal` (this fork)
- `upstream` = `outsourc-e/hermes-workspace` (vanilla)
- Sister Vorbium fork lives in `~/Documents/Aplicativos/Iudex/apps/vorbium-workspace`,
  pushes to `NicholasJacob1990/hermes-workspace`, NOT this repo.
