# Remote Access

User access to Control Plane and control-plane access to Node Agent are separate network boundaries.

## Public Control Plane

Use stable DNS, a trusted HTTPS certificate, authentication, and a reverse proxy that supports API uploads and `/api/events` WebSocket. Never give users a Node Agent or controlled-instance endpoint as the control-plane URL.

## Remote Nodes

Prefer an outbound Node Agent connection using the generated one-time join command. Direct public Node Agent pairing requires HTTPS and a one-time agent-issued token. When neither side accepts inbound traffic, use a trusted control-plane proxy or supported relay.

## Thandoff Account

**Settings → Thandoff account** binds one account and can enable a background relay. Verify the Control Plane ID, fingerprint, and one-time authorization code. Closing the browser does not stop the relay.

Disabling remote access keeps the account binding; disconnecting revokes both. A cloned identity triggers isolation and must be resolved by choosing which installation keeps the original identity.

Restrict ports and source networks, revoke one-time tokens after use, and audit account, mobile-device, and login sessions regularly.
