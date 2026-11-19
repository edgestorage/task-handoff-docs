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

## Remote Desktop Will Not Connect or Accept Input

1. Open the Control Plane through HTTPS, `localhost`, or an administrator-approved private-network address. A remote plain-HTTP origin is rejected for remote desktop signaling.
2. Confirm the instance is running and its platform is supported. Under **Instance Settings → Remote Desktop**, verify that the component is installed and enabled. If it is missing or unhealthy, go to **Apps** to install, update, or repair it.
3. macOS hosts require Screen Recording and Accessibility permissions. Grant them, return to instance settings, and recheck. Some permission changes take effect only after the component restarts.
4. If the image is visible but input does not work, enable input and check whether **Another viewer is controlling** appears. Multiple viewers may watch, but only one may control at a time; select **Request control** when necessary.
5. If the capture source is unavailable, select the entire desktop, a single window, an application, or a custom region again. Closed windows and invalid regions do not recover automatically.
6. Session cards and floating previews are always read-only. On Mobile, open the full Remote Desktop viewer before enabling input or clipboard access.
7. Check the active transport in connection details. Frequent WebSocket fallback usually means direct WebRTC/UDP is restricted; configure TURN and review NAT, firewall, proxy, and UDP policy.

If TURN relay times out or is unavailable, check URL prefixes, authentication, TURN-server firewall rules and ports, and clock synchronization between the Control Plane and TURN server. If the WebSocket compatibility path was disabled, a WebRTC failure disconnects by design rather than switching methods. See [Remote Desktop](/en/workspace/remote-desktop) for the full guide.

## An Agent Cannot Call thctl

- Confirm the CLI is installed: run `thctl --version`, and install it with `npm install -g @task-handoff/thctl` if it is missing.
- Confirm the skill is installed and current: run `thctl skill status`, then `thctl skill install --yes` or `thctl skill update --yes` as needed.
- Confirm identity and target: `thctl whoami --json` should report the current Control Plane; for remote servers check `thctl profile list` and the sign-in state first.
- When a specific command fails, verify its flags with `thctl <command> --help` or `thctl schema --format json`.

See [Install the thctl Skill](/en/guide/thctl-skill) for the concepts and setup.

## Diagnostic Information

When reporting a problem, include the time and timezone, control plane/node/instance/session identifiers, reproduction steps, visible errors, screenshots, and relevant service logs. Remove API keys, Git tokens, passwords, join tokens, and SSH private keys first.
