---
name: taskhandoff
description: Use the thctl CLI to operate TaskHandoff Control Plane instances, AI sessions, nodes, stories, and resources. Covers connection, safety, and feature-specific workflows through references; not for editing TaskHandoff source code.
---

# TaskHandoff Control Plane CLI

Use `thctl` to operate TaskHandoff. The executable is **`thctl`** (package `@task-handoff/thctl`), not `thcli`. It talks to the Control Plane; do not treat local files or cached results as authoritative server state.

This entry point holds the shared rules. Before working in a feature area, read its reference and follow the concepts and ordering there; each reference is loaded only when that area is relevant.

| Area | Reference |
| --- | --- |
| Adding, connecting, or diagnosing a node | [references/nodes.md](./references/nodes.md) |
| Creating, running, resizing, or deleting an instance | [references/instances.md](./references/instances.md) |
| Creating or driving AI sessions, approvals | [references/sessions.md](./references/sessions.md) |
| Models, images, env templates, projects, Git credentials, node runtimes | [references/resources.md](./references/resources.md) |
| Story, documents, preset actions | [references/stories.md](./references/stories.md) |
| Story automation and triggers | [references/automation.md](./references/automation.md) |
| App sessions, terminal, managed apps | [references/apps.md](./references/apps.md) |
| Chat bridges, Thandoff account, remote access | [references/integrations.md](./references/integrations.md) |
| Users, roles, Control Plane settings, node updates, events | [references/administration.md](./references/administration.md) |
| Diagnosing an error, a failed write, or an unresponsive command | [references/troubleshooting.md](./references/troubleshooting.md) |

## Connect

1. Check `thctl --help` and `thctl whoami --json`. If the local desktop Control Plane is running without user management, `whoami` discovers and connects to it automatically.
2. For a remote Control Plane, use `thctl profile add https://<control-plane>` to pin its identity, then `thctl login` (or `thctl login --device` without a browser). Use `thctl profile list --json` to identify a profile and `--profile <label>` when multiple profiles exist. An identity change needs operator verification before `thctl profile trust <label>`; never trust it automatically.
3. If the command is missing, ask the user before installing it globally: `npm install -g @task-handoff/thctl` (npm must be on `PATH`; if it is missing, say that Node.js is required instead of installing it). Re-check `thctl --help` after installation, then verify the installed version and `thctl --help` against the deployed Control Plane; unavailable capabilities or access permissions are not reasons to bypass the CLI.

## Choose commands

| Intent | Read/discover | Mutate (only when requested) |
| --- | --- | --- |
| Nodes | `thctl node list --json`, `thctl node show <nodeId> --json` | see references/nodes.md before choosing a connection path |
| Instances | `thctl instance list --json`, `thctl instance show <instanceId> --json` | `instance start/stop/restart/rename/create/delete` |
| AI sessions | `thctl ai-session list --instance <instanceId> --json`, `ai-session show <instanceId> <sessionId> --json` | `ai-session create/send/interrupt/approval/resume/fork/close` |
| Apps | `thctl app-session list --json` | `app-session start/stop/restart` |
| Integrations | `thctl chat status --json`, `thctl cloud show --json` | `chat bridges ...`, `cloud remote-access/disconnect` |
| Story | `thctl story list --json` | `story create/update/archive/restore/remove`, `story document ...` |
| Automation | `thctl story automation list --json`, `thctl trigger list --json` | `story automation ...`, `trigger ...` |
| Models and assets | `thctl model list --json`, `thctl project list --json`, `thctl image list --json` | `model ...`, `project ...`, `image ...`, `git-credential ...` |
| Administration | `thctl control-plane status --json`, `thctl user list --json` | `user ...`, `control-plane settings update`, `node updates ...` |

These are entry points, not complete syntax. Before composing a command, inspect its leaf help (`thctl <group> <action> --help`) and its machine-readable contract (`thctl schema <group> <action> --format json`); for nested commands, check the full leaf path. `thctl schema --format json` lists the complete declared command surface. Prefer narrow schema/help lookups to inventing flags or IDs. Treat the current executable's help and schema as authoritative if they differ from this skill.

## Resolve objects and versions

- Names are display labels, not identifiers. Get every `<id>` from a `list`/`show --json` response and pass it unchanged; never construct or guess an ID, and never carry an ID from one Control Plane into another.
- Confirm the profile before acting: `thctl profile list --json` shows the pinned origins, `--profile <label>` selects one. With several profiles, state which Control Plane you are operating and keep IDs, nodes and instances in that scope. If a lookup returns several matches or none, ask instead of picking one.
- `thctl --version` identifies the CLI build. Capabilities are enforced per Control Plane, node and Agent at request time, so a newer CLI does not imply a feature is available; a missing capability is exit code `14`. Read the leaf `--help`/schema for what this deployment accepts.

## Execute safely

Exit codes tell you why a command stopped: `0` ok; `2` usage; `4` confirmation required (re-run with `--yes` only after the user authorizes); `5` not authenticated (login again); `6` forbidden (permission, not a bug); `7` not found (re-resolve the ID from a list); `8` conflict (re-read state before retrying); `9` rate limited (back off); `10`/`11`/`12` network/protocol/server (inspect, do not switch to raw HTTP); `13` identity (verify the profile fingerprint, do not auto-trust); `14` capability missing (the Control Plane, node, or Agent version does not support it — upgrade instead of bypassing); `15` cancelled by the user.

- Prefer `--json` for reads and parse actual response fields. Resolve identifiers from list/show output, not guessed names. If multiple objects match, ask which one.
- For writes, show the target and expected impact, obtain user authorization, then inspect `--dry-run` where supported **only if it cannot expose secrets in the request body**. Only pass `--yes` after authorization; it suppresses the CLI's **local** confirmation, not any server-side Web approval.
- High-impact operations (deleting an instance, removing a node, applying node updates, changing user access/roles/identity providers, assigning Git credentials) also require a Web approval that only the authorized user can give in the Control Plane. The CLI waits at most five minutes: a denial is exit code `6` and expiry is `15`, and in both cases the operation was **not** executed. Re-request only after the user confirms, because approval covers one exact target and payload.
- Large write bodies go in a local JSON file supplied with `--config <file>`; one-time secrets use `--token-stdin`. Never put tokens or other secrets in positional arguments, ordinary flags, logs or chat output.
- Verify writes with the corresponding `show`/`list` read. After a timeout or ambiguous response, reconcile state before retrying a non-idempotent action.
- On capability, authentication or permission errors, stop and explain the prerequisite instead of switching to raw HTTP or another identity. Use `thctl events` only when a live stream is actually needed; stop it when the request is satisfied.

## Keep the skill and CLI current

- The published skill is named `taskhandoff`; `metadata.version` is its content revision, so a different value means the published content changed.
- Check the installed and published versions with `thctl skill status --json`, then update with `thctl skill update` (user scope) or `thctl skill update --scope project`.
- `thctl skill update` refuses locally modified directories unless `--force` is passed; copy the directory before customizing it instead of editing the installed copy.
- Interactive `thctl` runs print a cached hint when a newer CLI or skill release exists. Follow it with `npm install -g @task-handoff/thctl@latest`; when the published skill requires a newer CLI, update the CLI first and re-run the skill update.
