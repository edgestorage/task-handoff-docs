# FAQ

## Which AI agents are primarily supported?

**Codex** and **OpenCode**. Both provide managed AI sessions. Codex has deeper managed settings, context mentions, and multi-agent integration; OpenCode uses its own session and model ecosystem. Claude remains a compatibility path, not the main guide flow.

## Does closing the page stop AI work?

No. Work runs in the controlled instance and the UI restores authoritative state after reconnecting.

## Does Compact mode lose conversation history?

No. Compact mode focuses on the current task turn to reduce message interference while preserving prompts, results, and active status. Switch to Conversation mode for the full history. Changing modes does not modify the session or agent context.

## Does stopping Control Plane stop instances?

An ordinary Control Plane stop does not stop Docker instances managed by Node Agent.

## Docker or Local Runtime?

Use Docker for isolation and multiple instances. Use Local for direct host tools and folders. One host user can run only one Local Runtime instance.

## Why did a model change not apply?

Instance model assignments generally apply on the next start or restart and do not rewrite existing sessions.

## Why is Repository unavailable?

The current session needs an accessible directory inside a Git worktree, and Git must be installed in the instance.

## Can a deleted instance be recovered?

Not after **Delete instance data**. Retained volumes require manual administrator recovery and are not automatically attached.

## Why can Mobile not create instances?

Mobile focuses on active sessions and runtime controls. Infrastructure and secret management remain Web/Desktop responsibilities.
