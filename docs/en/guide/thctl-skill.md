# The `thctl` Skill

The TaskHandoff CLI is **`thctl`** (npm package `@task-handoff/thctl`). This site publishes one Agent Skill named `taskhandoff`: `SKILL.md` is the entry point covering connection and shared operating rules, and feature modules live in `references/` and load on demand (nodes, instances, sessions, resources, Story, automation, apps, integrations, administration, and troubleshooting today). Once your agent installs the skill, it knows how to connect to the Control Plane, run tasks, and diagnose failures.

The skill is documentation only. Installing it does **not** install the CLI, sign you in, or grant access.

## Install the CLI

```sh
npm install -g @task-handoff/thctl
thctl --help
```

## Connect to the Control Plane

For the local desktop Control Plane, `thctl whoami --json` discovers and connects to it automatically. For a remote server, run `thctl profile add https://your-control-plane` and then `thctl login` (or `thctl login --device` without a browser).

## Install the Skill

The easiest way is to let your agent install it — send it this line:

```text
Install the TaskHandoff skill: https://docs.thandoff.com/.well-known/skills/index.json
```

Or install it yourself with `thctl` (CLI 0.0.36 or newer):

```sh
thctl skill status                           # installed and published versions per scope
thctl skill install --yes                    # install into ~/.agents/skills/taskhandoff (user scope)
thctl skill install --scope project --yes    # pin the copy to .agents/skills/taskhandoff
thctl skill update --yes                     # update to the published release
thctl skill update --force --yes             # replace a locally modified copy
```

Installs verify the files they download. If the CLI reports that it is too old, update it before installing. Skills left under the old `task-handoff` / `task-handoff-nodes` names are listed by `thctl skill status`; remove them once you have confirmed the current skill works.

### Clients without thctl

OpenCode can add the published source in `opencode.json`:

```json
{"skills":{"urls":["https://docs.thandoff.com/.well-known/skills/"]}}
```

Clients that read local Agent Skills can download the entry point and references into `~/.agents/skills/taskhandoff` (or `.agents/skills/taskhandoff` inside a project):

```sh
base=https://docs.thandoff.com/.well-known/skills
dest=.agents/skills/taskhandoff
for f in SKILL.md references/nodes.md references/instances.md references/sessions.md \
  references/resources.md references/stories.md references/automation.md references/apps.md \
  references/integrations.md references/administration.md references/troubleshooting.md; do
  mkdir -p "$dest/$(dirname "$f")"
  curl -fL "$base/$f" -o "$dest/$f"
done
```

Check for local edits before updating — `thctl skill update` also refuses to overwrite a locally modified directory. For exact command syntax, use `thctl <command> --help` and `thctl schema --format json` from the installed version.
