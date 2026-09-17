# Mobile Client

TaskHandoff Mobile for iOS and Android connects only to a user-managed Control Plane, never directly to Node Agent or controlled-instance endpoints.

## Connect

Direct profiles require a stable HTTPS origin without paths, queries, credentials, or redirects. The reverse proxy must support `/api/events` WebSocket and attachment uploads. Verify the Control Plane ID and signing-key fingerprint before signing in.

Cloud-linked profiles can be discovered through a Thandoff account. Changing cloud accounts removes relay profiles owned by the prior account but preserves manual direct profiles.

## Supported Work

Mobile supports the AI Session Inbox, Codex and OpenCode sessions, history/resume, messages, approvals, interrupts, queues, attachments, sub-agents, node/instance directories, instance lifecycle actions, app sessions, terminal, browser, Stories, automation, and triggers.

It intentionally omits instance creation/deletion, full node lifecycle, app installation, provider/model setup, images, environment templates, and full settings. Use Web or Desktop for those administrator tasks.

## Unknown Results and Lost Devices

When connectivity disappears after a non-idempotent action, Mobile marks the result unknown and does not resend. Wait for snapshot recovery before acting again.

Revoke a lost device under **Settings → Mobile devices** in Web/Desktop. Device secure storage complements, but does not replace, device lock and remote revocation.
