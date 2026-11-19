# Instance Settings

Instance settings are separate from global Settings and can be opened from an instance header, instance menu, or **Settings → Instances**.

## General and AI

General shows identity, state, node, runtime, image, workspace, connection, protocol, and build information. It also controls automatic import of agent configuration.

AI settings include the default permission mode, attachment retention, and file upload limit. Reducing retention may immediately and irreversibly remove expired attachment content.

## Browser Profiles

The in-instance browser can use a Profile to keep site sign-ins, extensions, and browsing data across sessions:

- Only one session can run on a Profile at a time;
- You can create, rename, set as default, and delete Profiles, and see each one's disk usage;
- Deleting a Profile permanently removes its sign-ins, extensions, and browsing history;
- On older nodes or managed instances, Profiles cannot be managed and new sessions fall back to a temporary profile that keeps no data after it closes.

## Codex Settings

Codex has managed options for response detail, personality, reasoning, Codex Home, multi-agent enablement, maximum concurrency, and sub-agent model defaults. OpenCode uses its own model, permission, and session configuration; do not assume identical fields.

## Models

Codex and OpenCode have separate model selections. Use the global default, a control-plane model, or a model local to the current node. Public instance data stores IDs and revisions, never API keys.

Model changes apply on the next start or restart. Replace selections that refer to deleted, disabled, cross-agent, or cross-node models.

## Remote Desktop

The **Remote Desktop** page manages the desktop-streaming component and instance enablement:

- if the component is missing or needs repair, go to **Apps** from this page;
- once enabled, users with instance access can establish remote desktop sessions;
- on macOS hosts, Screen Recording and Accessibility status is shown with request and recheck actions;
- Remote Desktop may be temporarily unavailable while the component updates.

Remote Desktop also requires a trusted Control Plane address. See [Remote Desktop](/en/workspace/remote-desktop) for source selection, input, clipboard, transports, and TURN.

## Apps and Git Credentials

Apps shows the authoritative installed and manageable inventory. Install and uninstall tasks may require system privileges and stream their output.

**Install settings** selects the install environment and software sources for later app tasks:

- keep the instance environment, use official sources, a China mirror, or custom HTTPS endpoints;
- override the npm registry, Node.js distribution URL, and apt main/security mirrors;
- inspect or prepare an instance-private Node.js/npm toolchain;
- test source connectivity before saving.

Source settings apply only to app installation. They do not change global software sources, and changes affect only later tasks. Custom endpoints must use HTTPS and contain no credentials, query, or fragment.

Custom launchers register existing software and cannot install arbitrary packages.

Git assignments authorize matching remote access for agents, terminals, apps, and repository tools. Assignment changes take effect at Node Agent even while the instance is offline. See [Git Credentials](/en/security/git-credentials).
