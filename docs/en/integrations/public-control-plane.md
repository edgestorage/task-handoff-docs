# Expose the Control Plane

Browsers, mobile clients, chat-generated session links, and reverse-connecting Node Agents need a stable Control Plane address. Production deployments should use a dedicated hostname and an HTTPS reverse proxy instead of exposing an unencrypted listener directly.

## Prepare the Public Address

1. Assign a stable hostname such as `control.example.com`.
2. Point DNS to the reverse proxy or Control Plane host.
3. Issue a publicly trusted TLS certificate for the hostname.
4. Proxy HTTPS traffic to the actual Control Plane listener. The server install defaults to port `8081`.
5. Open only the reverse-proxy port, normally `443`, in the firewall.

A mobile profile origin must be `https://host[:port]` with no path, query, embedded credentials, or redirect dependency. Avoid changing it after enrollment. Existing mobile profiles verify the Control Plane ID and signing-key fingerprint together with the connection.

## Reverse Proxy Requirements

The proxy must support all of the following:

- ordinary HTTP API requests and streamed responses;
- WebSocket upgrades for `/api/events`;
- other WebSocket routes used by terminals, browser apps, and instance proxies;
- request and response sizes needed for images, attachments, and installation artifacts;
- read and idle timeouts long enough for active session streams.

Do not enable WebSocket forwarding only for `/api/events`. TaskHandoff uses additional WebSocket routes for instance proxies and remote transports, so the complete Control Plane origin should forward upgrade headers correctly.

## Require Sign-in

Every public deployment must enable account authentication. Create the first administrator after startup, then use **Settings → Users and access** to create ordinary users and restrict their roles, nodes, and instances.

An obscure URL is not access control. Node Agent bearer tokens, join tokens, and pairing tokens are also not user login credentials.

## Set the Public URL

Open **Settings → Basic → Public access URL** and enter the origin users actually open. Chat bridges use this value when generating session links.

This setting does not configure DNS, certificates, port forwarding, or the firewall. After changing it, open a generated link from an external network to verify the full path.

## Verify the Deployment

Complete at least these checks:

1. Open the sign-in page outside the server's LAN and confirm the certificate is trusted and no redirect points to a private address.
2. Sign in and open an AI session; messages and execution state should continue updating.
3. Open a terminal or browser app and confirm its WebSocket remains connected.
4. Upload an attachment close to your normal working size; the proxy should not return `413` or time out.
5. If nodes reverse-connect, verify that **Settings → Nodes** shows connected and that the connection recovers after restarting the Node Agent.

## Common Problems

| Symptom | Check first |
| --- | --- |
| Page loads but state does not update | WebSocket upgrade headers, `/api/events`, proxy read timeout |
| Redirect loop after sign-in | External origin, forwarded protocol, Secure cookie handling |
| Terminal or browser cannot open | Other WebSocket routes and idle timeout |
| Upload fails | Request-body limit, upstream timeout, temporary storage |
| Node Agent keeps reconnecting | Public URL, DNS, certificate chain, and Control Plane WebSocket support |
