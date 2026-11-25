# Remote Desktop

Remote Desktop lets you view and control the graphical desktop of an instance from the browser, Desktop, or Mobile without connecting directly to the host. It is intended for GUI-only validation, desktop application work, and window troubleshooting.

::: info Permission boundary
Remote Desktop uses the current Control Plane account and instance permissions. It does not bypass users, roles, node or instance scopes, in-instance approvals, or file permissions.
:::

## Requirements

- Open the Control Plane through HTTPS, `localhost`, or an approved private-network address;
- Use a supported instance platform: macOS Intel/Apple Silicon, Linux x64/arm64, or Windows x64;
- Install the **Remote Desktop** component and enable it under **Instance Settings → Remote Desktop**;
- Run an instance environment that exposes a capturable desktop or window;
- On macOS hosts, grant **Screen Recording** and **Accessibility** permissions.

Remote Desktop requires a secure browser context. A remote plain-HTTP origin is rejected for signaling; use HTTPS or a trusted local address.

## Install and Enable

1. Open the instance's **Settings → Remote Desktop**.
2. If the component is missing, select **Go to Apps**.
3. Install or update the **Remote Desktop** component under **Apps**.
4. Return to **Remote Desktop** and select **Enable desktop**.
5. On macOS, request Screen Recording and Accessibility, grant them in System Settings, then select **Recheck**.

Component installation, update, and repair run as app tasks and continue if you close the settings window. Remote Desktop may be temporarily unavailable while the component updates.

The Remote Desktop component is released independently of the controlled-instance version. It can be installed or updated separately without waiting for a full instance upgrade. If the UI reports a protocol or platform incompatibility, update the node and controlled instance as well.

## Open a Session

Open Remote Desktop from:

- **Open remote desktop** in an instance or AI session action menu;
- the Remote Desktop entry in the AI session or Story resource sidebar;
- the resource menu or remote desktop card on Mobile.

Choose a capture source on first use. Each viewer can independently select the entire desktop, a single window, an application, or a custom region, depending on host support. If a saved window closes or the source becomes invalid, select another source.

<figure class="doc-screenshot">
  <img src="/images/remote-desktop-source-picker-en.png" width="2836" height="1926" alt="Remote Desktop source picker with Entire desktop and Single window options">
  <figcaption>Choose the entire desktop or a single window; the side panel shows the source, resolution, and connection methods before you open the viewer.</figcaption>
</figure>

## Preview and Control

The remote desktop card and floating preview in a session are read-only. Open the full Remote Desktop surface before enabling input or clipboard access.

To make the remote application window follow the viewer area, open **More actions** in the upper-right corner of Remote Desktop, then select **Remote window size** → **Fit page area**. Once enabled, the remote window follows page-area size changes and reports the fitted dimensions; the encoded video resolution and frame rate are unchanged.

<figure class="doc-screenshot">
  <img src="/images/remote-desktop-window-fit.gif" width="1200" height="836" alt="Enabling Remote window size and Fit page area from the More actions menu, after which the remote window follows page-area size changes">
  <figcaption>The demo enables **Remote window size → Fit page area** from the **More actions** menu; the remote window then follows page-area size changes and reports the final fitted dimensions.</figcaption>
</figure>

Available controls include:

- enabling or stopping keyboard and mouse input;
- switching between the system keyboard and the built-in virtual keyboard, including modifier keys;
- direct-touch or trackpad mouse mode;
- text-only clipboard exchange between the local and remote sides;
- fullscreen, disconnect, and force stop;
- resolution, frame-rate, and capture-precision limits.

Multiple viewers can watch one instance, but only one controls input at a time. When control is held elsewhere, select **Request control**. Input becomes available when control is free.

## Connection Methods and Quality

Remote Desktop prefers a direct WebRTC P2P path, falls back to a TURN relay when direct connectivity fails, and can use the Control Plane WebSocket compatibility channel when WebRTC cannot connect.

- Keep at least one connection method enabled;
- disabling WebSocket means a WebRTC failure disconnects the session;
- resolution and frame rate may drop automatically on constrained networks;
- connection details show the active path, latency, receive bitrate, encoding, viewers, and session information.

If sessions frequently use WebSocket, the network likely blocks the required WebRTC/UDP path. Configure TURN, or review NAT, firewall, and proxy policy for the instance network.

## Configure TURN

Administrators can configure a relay under **Settings → Remote Desktop → Custom TURN**:

1. Enable custom TURN.
2. Enter one `turn:` or `turns:` URL per line; UDP/TCP and TLS use different prefixes.
3. Choose username/password authentication or a coturn REST shared secret.
4. Save. New connections and credential renewals use the updated configuration.

Credentials are encrypted in the Control Plane and delivered only to session participants. With a shared secret, the Control Plane and TURN server must keep their clocks synchronized. Cloud TURN appears unavailable until that service is ready; custom TURN and the WebSocket compatibility path are independent.

## Security Guidance

- Enable Remote Desktop only for trusted instances and trusted networks;
- disable input when you only need to observe;
- prefer a single window, application, or region over the entire desktop;
- stop the remote desktop session when finished;
- clipboard access is text-only; do not leave passwords or long-lived credentials in it;
- do not treat Remote Desktop as a way around Control Plane authentication, instance permissions, or approvals.

## Troubleshooting

| Symptom | Check first |
| --- | --- |
| **Remote desktop unavailable** | Component installed, instance enabled, platform supported, instance version current |
| Trusted-address warning | Use HTTPS, `localhost`, or an administrator-approved private-network address |
| Connected on macOS with no image | Screen Recording permission, then recheck and restart the component if needed |
| Image visible but input does not work | Accessibility permission, input enabled, another viewer controlling |
| Source unavailable | Select another window, application, or desktop; confirm the source is still open |
| TURN unavailable or connection times out | TURN URLs, credentials, firewall, network, and clock synchronization |
| Frequent WebSocket fallback | WebRTC/UDP, NAT, proxy, and TURN configuration |

See [Expose the Control Plane](/en/integrations/public-control-plane) for network entry requirements and [Apps and Terminal](/en/workspace/apps-terminal) for component installation.
