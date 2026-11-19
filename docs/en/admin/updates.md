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

## Managed Apps and the Remote Desktop Component

Managed apps and the **Remote Desktop** component follow a release cadence independent of the Control Plane, Node Agent, and controlled-instance version. A successful server or node update does not mean these apps are already current.

Check, install, update, or repair components under **Instance Settings → Apps**. App updates select the target version from the current built-in recipe and preserve user configuration, AI sessions, and workspaces. Running app sessions are not actively terminated and use the new version on their next launch. Existing Remote Desktop connections may become temporarily unavailable or need to reconnect while the component updates.

A missing Remote Desktop component must not block instance or node updates. Finish the update, then return to Apps to install or repair it, and confirm enablement under **Instance Settings → Remote Desktop**.

Desktop uses its own release channel and installer.

## Before Updating

Review active Codex/OpenCode sessions, commit or back up work, record the current version/channel, back up control-plane data, and verify disk plus registry access.

After failure, preserve structured errors and versions. Restore service access first, then retry the artifact, instance reconcile, or prior package installation without deleting instance data.
