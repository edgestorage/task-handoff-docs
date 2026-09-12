# Updates and Versions

Control Plane, Node Agent, and Controlled Instance are independent processes, while server releases manage compatible versions as one set.

## Channels

Use `stable` for production, `beta` for near-stable validation, and `alpha` for early testing. Prereleases never become stable updates implicitly.

## Server and Node Updates

Use **Settings → Basic → Server updates** or:

```sh
task-handoff check
sudo task-handoff update
```

The updater preserves service identity, ports, data directories, IPC, and authentication. Back up data before persistent migrations.

Node details provide rollout controls. The updated Node Agent converges running instances to the desired runtime version. Active work receives a bounded drain period; stopped instances update before their next normal start.

Desktop uses its own release channel and installer.

## Before Updating

Review active Codex/OpenCode sessions, commit or back up work, record the current version/channel, back up control-plane data, and verify disk plus registry access.

After failure, preserve structured errors and versions. Restore service access first, then retry the artifact, instance reconcile, or prior package installation without deleting instance data.
