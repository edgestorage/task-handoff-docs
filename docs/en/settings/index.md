# Settings and Security

Visible settings depend on your account permissions. Nodes, images, models, and projects are routine resources; credentials, users, identity providers, and cloud connectivity generally require administrator access.

## Git Credentials

**Settings → Git credentials** manages HTTPS tokens and SSH private keys by remote scope. A scope includes the scheme, host, optional port, and case-sensitive repository path prefix.

Credentials selected during instance creation authorize the initial clone. **Retain in this instance** also authorizes matching remote access for agents, terminals, apps, and repository operations running as the instance user.

::: warning Retained authorization
Remote scope prevents accidental credential selection; it is not a security boundary against a malicious process running as the instance user. Grant retained credentials only to trusted instances and use narrowly scoped tokens.
:::

SSH credentials require pinned `known_hosts` data. After changing a credential or assignment, retry the failed Git operation manually.

## Users and Access

Administrators can create, disable, and restore local users; assign system or custom roles; restrict accessible nodes and instances; reset passwords; revoke sessions; configure OIDC or GitHub sign-in; and approve external identities.

A password reset generates a temporary password and invalidates existing sessions. Transfer it through a secure channel.

## Account and Devices

Changing your password signs out sessions on other devices. **Mobile device sessions** lists signed-in devices and can revoke one without affecting the others.

**Thandoff Cloud → Trusted devices** lists devices explicitly pinned by this Control Plane for cloud-relay access. Revoking a pin immediately closes that device's active relay sessions but does not sign it out of its Thandoff account; manage the account sign-in separately.

## Node Security

A public Node Agent endpoint must use HTTPS and a one-time pairing token. Changing a TCP listener from `127.0.0.1` to `0.0.0.0` expands network exposure and requires appropriate firewall, TLS, and access controls.

## Instance Directory

**Settings → Instances** lists instances across all nodes. Search by name, ID, node, project, or image, and filter by node, status, or runtime. Open instance settings directly from a result row without returning to the corresponding instance board first.

If a node is offline or cannot provide its latest directory, the page says that the list may be incomplete. Restore the node connection and retry; do not treat cached results as a complete cross-node snapshot.

## Cloud Nodes and Trust

A node can be bound to a Thandoff account and used by other Control Planes in that account through cloud relay. The first time a node accepts a Control Plane, or when that Control Plane's identity or public key changes, TaskHandoff creates a **Node Control Plane trust** approval.

Before approving, compare the display name, fingerprint, and comparison code reported by the node. The current Control Plane cannot revoke its own trust from the same node UI; run `task-handoff-node-agent trust` on the node instead. Trust for other Control Planes can be revoked from node details. Shared node access may expire, and an expired grant cannot establish a new connection.

See [Node Management](/en/admin/nodes#cloud-nodes-and-trust) for the full add, approve, and revoke flow.

## Chat and Public URLs

Chat adapters route Telegram, DingTalk, WeChat, or Feishu/Lark messages to an instance. One chat entry cannot be bound to multiple control planes or instances at once.

The public access URL is used for session links opened from chat. Use HTTPS and expose only the intended control plane.

## Appearance and Editor

**Settings → Basic → Appearance** controls the language, theme, queued-message position, remote desktop card presentation, and AI editor shortcut characters. The theme supports **Follow system**, **Light**, and **Dark**. Follow system uses the current operating-system or desktop-client appearance and changes with it.

The remote desktop card can open in a floating window or expand inline within the session. Appearance preferences are normally stored in the current browser or desktop client and do not change instances, AI sessions, or server data.

<figure class="doc-screenshot">
  <img src="/images/basic-settings.png" alt="TaskHandoff basic settings">
  <figcaption>Language, theme, public URL, and editor shortcuts in Basic settings.</figcaption>
</figure>

## Remote Desktop and TURN

Administrators with settings-management access can configure **Custom TURN** under **Settings → Remote Desktop** to provide a relay for Remote Desktop sessions opened through this Control Plane:

- enter one `turn:` or `turns:` URL per line; UDP/TCP use `turn:` and TLS uses `turns:`;
- authenticate with a username and password or a coturn REST shared secret;
- credentials are encrypted in the Control Plane and delivered only to session participants;
- with a shared secret, the Control Plane host and TURN server must keep synchronized clocks;
- after saving, new connections and credential renewals use the updated configuration.

Cloud TURN appears unavailable until that service is ready; this does not affect custom TURN or the WebSocket compatibility path. See [Remote Desktop](/en/workspace/remote-desktop) for component setup, source selection, input control, and connection diagnostics.

## Updates

A full server installation exposes server updates under **Settings → Basic**. Node details provide managed rollout controls. Prefer the `stable` channel in production and check active work first, because runtime convergence may restart instances after a bounded drain period.

Managed apps and the **Remote Desktop** component update independently through instance app management. They do not upgrade automatically with the server or controlled-instance version. Install, update, or repair the component under **Instance Settings → Apps**; this is a separate flow from Control Plane and Node Agent updates.
