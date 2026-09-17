# Troubleshooting

First identify the affected layer: browser/control plane, node, instance, or a specific app or AI session. A disconnected UI does not necessarily mean the instance stopped.

## Node Offline

1. Review connection and diagnostics under **Settings → Nodes**.
2. Confirm the host and Node Agent service are running.
3. Check firewall, DNS, TLS, and proxy configuration.
4. Use **Add local node** if the built-in node is missing.
5. Refresh instance status after connectivity is restored.

Server administrators can run:

```sh
task-handoff status
task-handoff check
```

## Instance Will Not Start

- Docker check failed: install and start Docker on the target node;
- Image pull failed: inspect pull output, image reference, registry access, and network;
- Stuck registering: check the Node Agent callback address and port;
- Unhealthy: inspect details and restart when appropriate;
- Local Runtime failed: confirm there is no other local instance for the host user.

Do not delete an instance merely because its node is offline; the displayed status may be cached.

## AI Session Will Not Start

Confirm that the instance is running, a compatible model provider is assigned, its endpoint and API key pass the model test, and the working directory still exists and is accessible. Restart the instance when a configuration change requires it, then create a new session.

## Repository Unavailable

The current session needs an accessible working directory inside a Git worktree. Check that Git is installed, the directory exists within authorized roots, the session is active, and the repository is not blocked by conflicts or stale state.

Resolve complex conflicts, diverged branches, hooks, or signing problems in the session terminal, then refresh the repository view.

## Remote Git Authentication Failed

Open **Instance settings → Git credentials**, verify that exactly one retained assignment matches the remote, rotate expired tokens, and check pinned host keys for SSH. Save and retry the operation manually. TaskHandoff does not replay failed remote writes or force push.

## Continuous Reconnecting

Verify stable browser access to the control plane and ensure the reverse proxy supports WebSocket connections. Reloading fetches an authoritative snapshot and does not intentionally stop background work.

## Diagnostic Information

When reporting a problem, include the time and timezone, control plane/node/instance/session identifiers, reproduction steps, visible errors, screenshots, and relevant service logs. Remove API keys, Git tokens, passwords, join tokens, and SSH private keys first.
