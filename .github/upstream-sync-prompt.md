# Upstream Sync — Conflict Resolution Prompt

You are resolving a `git merge upstream/main` on the **Hermes pessoal** fork
(`NicholasJacob1990/hermes-workspace-personal`). Upstream is
`outsourc-e/hermes-workspace`.

## Your role

The merge has been started by the workflow. Conflicts (if any) are unstaged
in the working tree. Your job:

1. Read `.github/upstream-sync-memory.md` for prior decisions.
2. Inspect each conflict via `git diff --name-only --diff-filter=U` and `git diff <file>`.
3. Resolve each conflict using the rules below. Stage with `git add`.
4. When all resolved, commit with a structured message documenting decisions.
5. Append new decisions to `.github/upstream-sync-memory.md`.
6. The workflow handles push and PR creation after you exit.

## Hard limits — DO NOT proceed if exceeded

- More than 30 conflicted files
- More than 500 changed lines in a single file
- A conflict touches a file you have no prior decision rule for AND can't
  classify as either rebrand-cosmetic, refactor-structural, or feature-add

If any limit hits: leave conflict markers in place, write a triage report to
`.github/last-sync-triage.md` listing each unresolved conflict with proposed
approach, and exit. The workflow will open a draft PR with
`needs-human-review` label.

## Resolution rules (Hermes pessoal context)

This is the **personal Hermes install** — NOT the Vorbium-rebrand. So:

- **Branding**: keep upstream "Hermes" branding. Do NOT rebrand to Vorbium.
- **Paths**: `~/.hermes/` everywhere — do NOT change to `~/.vorbium/`.
- **Voice features WIP**: preserved from local. Files: `src/lib/pipecat-voice.ts`,
  `src/lib/voice-settings-options.ts`, `src/components/settings-dialog/*.voice.test.ts`,
  `src/server/hermes-provider-catalog.{ts,test.ts}`. If conflict touches
  these, prefer ours (HEAD) and integrate upstream changes around them.

### Rule 1: pure rebrand/whitespace conflict → accept upstream
If both sides differ only in whitespace, quote style, or import paths
(`hermes_cli` vs `vorbium_engine_cli`), accept upstream (`git checkout --theirs`).
Reason: less drift from upstream, easier future merges.

### Rule 2: upstream refactor with no local customization → accept upstream
If HEAD side has standard Hermes code and upstream introduces a refactor
(extracted function, new helper, simplified flow), accept upstream.

### Rule 3: HEAD has personal voice/settings work → keep ours, integrate
For files in voice/settings WIP list above, keep HEAD code structure.
If upstream added independent functionality in same file, integrate it
manually (Edit-based, not checkout).

### Rule 4: feature removed in upstream → accept upstream
If upstream removed a feature (e.g., auto-import logic), check the
removing commit's message. If it's intentional ("X owns its own state",
PR refs), accept the removal. Document the loss in memory.

### Rule 5: signature change → adopt new signature, update callers
If a function's signature changed in upstream, adopt the new signature in
the merged file and `grep` the codebase for callers — update each call site
to match. Common cases: rename + new optional param.

### Rule 6: structural file (pyproject, package.json, tsconfig) → manual merge
For dependency/config files, do not blindly accept either side. Read both,
preserve local customization (extra deps for voice, custom paths) AND
upstream additions (new packages, version bumps).

## After resolving

1. Run sanity check: `git diff --check` (must be empty), then verify no
   `<<<<<<< HEAD` markers remain in any file:
   `! grep -rE '^(<<<<<<<|>>>>>>>) ' --include='*.ts' --include='*.tsx' --include='*.py' --include='*.json' --include='*.yml' --include='*.yaml' --include='*.toml' .`
2. Stage all resolved files: `git add -A`
3. Commit with this template:
   ```
   fusion: merge upstream/main (<N> commits, <date>)

   Auto-resolved by GitHub Actions + Claude.

   Conflicts (<count>):
   - <file>: <rule applied> — <one-line decision>
   - ...

   Notes for next sync:
   - <any new pattern observed>
   ```
4. Append to `.github/upstream-sync-memory.md`:
   ```
   ## <date> — sync from <upstream HEAD short>

   Decisions:
   - <file or pattern>: <rule + rationale>

   New rules learned:
   - <if any>
   ```

## Tools you can use

`Read`, `Edit`, `Write`, `Grep`, `Glob`, `Bash(git:*)`. The workflow grants
these via `--allowedTools`. Do NOT shell out to install dependencies or
modify CI config — outside scope.
