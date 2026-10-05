# TaskHandoff Docs

English and Chinese user documentation for TaskHandoff.

[TaskHandoff GitHub Repository](https://github.com/edgestorage/task-handoff)

## Publishing the `taskhandoff` skill

The Agent Skill lives in `docs/public/.well-known/skills/`: `SKILL.md` is the entry point and feature modules live in `references/`. Keep the layout flat — `thctl` resolves each `files` entry against the index directory, so `skills/SKILL.md` must sit next to `skills/index.json`.

`npm run docs:build` builds the site and then produces the release into the output directory:

- the release label is `<date>-<content hash>` (for example `20261005-339d63f220cd`): the date is the day the skill last changed in git, the hash covers the published content, so the same content always yields the same label and any edit yields a new one. It is injected into the built `SKILL.md`; sources never pin a version.
- `docs/.vitepress/dist/.well-known/skills/index.json` lists every published file with its sha256. Both the label and the index are build output and are never committed, so pushing to `main` publishes a release without any follow-up bot commit.
- `scripts/check-skill-docs.mjs` verifies the source layout, the built index and digests, relative links inside the skill, and the download list in both install guides (`docs/zh/guide/thctl-skill.md`, `docs/en/guide/thctl-skill.md`).

`thctl` decides whether an installed copy is current by comparing the published digests with what it installed, so the label does not need to be ordered — never invent one by hand.
