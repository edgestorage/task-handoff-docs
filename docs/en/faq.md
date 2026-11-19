# FAQ

## Which AI agents are supported?

**Codex** and **OpenCode** are the managed AI kernels. Both provide managed AI sessions. Codex has deeper managed settings, context mentions, and multi-agent integration; OpenCode uses its own session and model ecosystem. Claude is available only as a compatibility path in some existing images or configurations and is not a first-class supported kernel.

## Does closing the page stop AI work?

No. Work runs in the controlled instance and the UI restores authoritative state after reconnecting.

## Does Compact mode lose conversation history?

No. Compact mode focuses on the current task turn to reduce message interference while preserving prompts, results, and active status. Switch to Conversation mode for the full history. Changing modes does not modify the session or agent context.

## Does stopping Control Plane stop instances?

An ordinary Control Plane stop does not stop Docker instances managed by Node Agent.

## Docker or Local Runtime?

Use Docker for isolation and multiple instances. Use Local for direct host tools and folders. One host user can run only one Local Runtime instance.

## Why is Remote Desktop unavailable, or visible but not controllable?

First confirm that the page uses HTTPS, `localhost`, or an administrator-approved private-network address, and that the instance has the Remote Desktop component installed and enabled. macOS hosts also require Screen Recording and Accessibility permissions.

Session cards and floating previews are read-only by default; open the full Remote Desktop surface to enable input. If another viewer is controlling, request control instead of trying to type or click simultaneously. If a window closes or the capture source becomes invalid, select the source again. See [Remote Desktop](/en/workspace/remote-desktop).

## Does Remote Desktop require TURN?

Not always. Remote Desktop first attempts a direct WebRTC path, uses TURN when direct connectivity fails, and can fall back to the Control Plane WebSocket compatibility channel when WebRTC cannot connect. Configure or investigate TURN first when direct connections frequently fail, sessions repeatedly fall back to WebSocket, or the network explicitly restricts UDP.

## Does the Remote Desktop component update with the instance?

No. The component and other managed apps have an independent release cadence. Install, update, or repair it under **Instance Settings → Apps**, then confirm enablement under **Instance Settings → Remote Desktop**. Remote Desktop may be temporarily unavailable while the component updates.

## Can Remote Desktop synchronize the clipboard?

Yes, but text only. Do not leave passwords, tokens, or long-lived credentials in a shared clipboard.

## Why did a model change not apply?

Instance model assignments generally apply on the next start or restart and do not rewrite existing sessions.

## Why is Repository unavailable?

The current session needs an accessible directory inside a Git worktree, and Git must be installed in the instance.

## Is it safe to keep Git credentials?

Secrets are not copied into the instance, but agents, terminals, and apps running as the same instance user can use the authorized credentials through the proxy. Keep only least-privilege credentials in trusted instances.

## Can a deleted instance be recovered?

Not after **Delete instance data**. Retained volumes require manual administrator recovery and are not automatically attached.

## Why can Mobile not create instances?

Mobile focuses on active sessions and runtime controls. Infrastructure and secret management remain Web/Desktop responsibilities.

## Why does the page keep reconnecting?

Check the network between the browser and the Control Plane and confirm the reverse proxy supports the `/api/events` WebSocket. Reconnecting does not mean a background agent has stopped.

## Can an agent operate TaskHandoff directly?

Yes. Once the CLI and the `thctl` skill are installed, Codex, OpenCode, and similar agents can read Control Plane state, create instances and sessions, and diagnose failures from the command line. See [Install the thctl Skill](/en/guide/thctl-skill).
