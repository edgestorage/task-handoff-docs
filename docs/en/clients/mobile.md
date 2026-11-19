# Mobile Client

TaskHandoff Mobile for iOS and Android connects only to a user-managed Control Plane, never directly to Node Agent or controlled-instance endpoints.

## Demo

<figure class="doc-screenshot doc-video">
  <video controls playsinline preload="metadata" poster="/media/mobile/mobile-demo-poster.jpg" width="720" height="1566" aria-label="TaskHandoff mobile client demo">
    <source src="/media/mobile/mobile-demo.mp4" type="video/mp4">
    Your browser does not support HTML5 video. <a href="/media/mobile/mobile-demo.mp4">Download the demo video</a>.
  </video>
  <figcaption>Starting an app from an AI session and opening its preview in the built-in browser on mobile.</figcaption>
</figure>

## Connect

Direct profiles require a stable HTTPS origin without paths, queries, credentials, or redirects. The reverse proxy must support `/api/events` WebSocket and attachment uploads. Verify the Control Plane ID and signing-key fingerprint before signing in.

Cloud-linked profiles can be discovered through a Thandoff account. Changing cloud accounts removes relay profiles owned by the prior account but preserves manual direct profiles.

## Supported Work

Mobile supports the AI Session Inbox, Codex and OpenCode sessions, history/resume, messages, interrupts, queues, attachments, sub-agents, choosing an existing branch or creating an isolated worktree when starting a session, session-scoped files/changes/worktrees/apps/browser resources, node/instance directories, instance lifecycle actions, app sessions, terminal, browser, Remote Desktop, Stories, automation, triggers, Thandoff account security, About, and open-source licenses.

## Approval Center

When approvals are pending, Mobile shows a draggable approval entry with the pending count. Expand it to inspect the source, context, and expiry before approving, rejecting, answering, or submitting a decision.

The center aggregates:

- AI session approvals;
- Story decisions;
- operation approvals such as deleting an instance, updating a node, changing an external listener, changing user access or roles, or assigning a Git credential;
- device trust;
- Node Control Plane trust.

Drag the entry beyond a screen edge to hide it; pull it back when needed. If one source is unavailable, approvals loaded from other sources remain actionable and the failed source can be retried independently.

Decisions cannot be submitted offline. If connectivity disappears after submission, Mobile marks the result unknown. Do not tap again immediately; refresh the source to confirm whether the request is still pending. An approval applies only to that single request.

## Session Resources

Inside an AI session, the resource menu opens files, changes, and worktrees, and can open instance apps, a browser, or Remote Desktop alongside the conversation.

- Wide layouts show the conversation and resources side by side; narrow layouts use an overlay;
- resources are stored per session, so files and apps are not accidentally carried into another task;
- file and change views are revisioned read-only snapshots; refresh when current content is required;
- closing a resource tab affects presentation only and does not stop the process in the instance.

## Remote Desktop

After the instance has the Remote Desktop component installed and enabled, open the full viewer from the AI session resource menu or inspect a saved preview card.

For example, after an AI session opens the iPhone Simulator in Xcode's Device Hub on a macOS instance, the conversation shows a Remote Desktop card named after the simulator window and identifies its source. The card is a read-only preview; open it before interacting with the device.

<figure class="doc-screenshot doc-phone">
  <img src="/media/mobile/mobile-remote-desktop-en.png" width="720" height="1565" alt="iPhone Simulator Remote Desktop preview in a Mobile AI session">
  <figcaption>The Remote Desktop card shows the device window and its source; open the full view before enabling input.</figcaption>
</figure>

- choose the entire desktop, a single window, an application, or another host-supported source on first use;
- cards and floating previews are read-only; open the full viewer before enabling input;
- direct touch, trackpad mouse mode, the system keyboard, the built-in virtual keyboard, and text clipboard are supported;
- multiple viewers can watch, but only one viewer controls input at a time;
- connection details show the path, latency, receive bitrate, encoding, and viewer count.

Remote Desktop requires HTTPS, `localhost`, or an administrator-approved private-network address. macOS hosts also require Screen Recording and Accessibility permissions. See [Remote Desktop](/en/workspace/remote-desktop).

## Device Trust

Mobile may enter **Waiting for approval** on first connection, after a Control Plane role change, when shared authorization becomes stale, or after device trust is revoked. Keep the app open; it reconnects automatically after an administrator approves the request.

The request shows the Control Plane, device, comparison code, and expiry. An administrator can compare the code and fingerprint in the Approval Center. Treat the comparison code as a verification aid, not a password.

## Cloud Account and Security

Thandoff account settings let you review and revoke signed-in devices, manage two-step verification, complete recent-authentication checks for sensitive actions, schedule account deletion with immediate session and relay revocation, and sign out. Signing out removes cloud Control Planes added by that account but preserves manually added connections.

The About page shows the app version, documentation, service status, privacy policy, terms, and open-source licenses. See [Thandoff Account](/en/integrations/thandoff-account) for account and relay details.

It intentionally omits instance creation/deletion, full node lifecycle, app installation, provider/model setup, images, environment templates, and full settings. Use Web or Desktop for those administrator tasks.

## Unknown Results and Lost Devices

When connectivity disappears after a non-idempotent action, Mobile marks the result unknown and does not resend. Wait for snapshot recovery before acting again.

Revoke a lost device under **Settings → Mobile devices** in Web/Desktop. Device secure storage complements, but does not replace, device lock and remote revocation.
