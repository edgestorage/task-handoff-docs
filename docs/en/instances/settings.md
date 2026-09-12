# Instance Settings

Instance settings are separate from global Settings and can be opened from an instance header, instance menu, or node details.

## General and AI

General shows identity, state, node, runtime, image, workspace, connection, protocol, and build information. It also controls automatic import of agent configuration.

AI settings include the default permission mode, attachment retention, and file upload limit. Reducing retention may immediately and irreversibly remove expired attachment content.

## Codex Settings

Codex has managed options for response detail, personality, reasoning, Codex Home, multi-agent enablement, maximum concurrency, and sub-agent model defaults. OpenCode uses its own model, permission, and session configuration; do not assume identical fields.

## Models

Codex and OpenCode have separate model selections. Use the global default, a control-plane model, or a model local to the current node. Public instance data stores IDs and revisions, never API keys.

Model changes apply on the next start or restart. Replace selections that refer to deleted, disabled, cross-agent, or cross-node models.

## Apps and Git Credentials

Apps shows the authoritative installed and manageable inventory. Custom launchers register existing software and cannot install arbitrary packages.

Git assignments authorize matching remote access for agents, terminals, apps, and repository tools. Assignment changes take effect at Node Agent even while the instance is offline. See [Git Credentials](/en/security/git-credentials).
