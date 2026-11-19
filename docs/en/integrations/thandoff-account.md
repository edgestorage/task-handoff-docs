# Use a Thandoff Account

A Thandoff account can publish a self-managed Control Plane in the account directory and make it available to authorized clients through a background relay. The same account can also bind Node Agents so other Control Planes in the account can use them through cloud relay. Both sides initiate outbound connections, so this path requires no public ingress.

The relay carries client-to-Control-Plane API calls, response streams, and WebSockets, plus account-Control-Plane-to-bound-Node-Agent channels. Cloud relay processes ciphertext frames and routing or metering identifiers only; it does not store plaintext requests, AI sessions, files, or terminal content. The node still approves Control Plane trust separately.

## Bind the Control Plane

Only a local administrator can change the account connection:

1. Open **Settings → Thandoff account** locally or on a trusted network.
2. Record the displayed Control Plane ID and identity fingerprint.
3. Select **Connect Thandoff account**. TaskHandoff opens the authorization page and copies a one-time authorization code to the clipboard.
4. Sign in to the intended account, verify the Control Plane ID, fingerprint, and code, then approve.
5. Return to settings and confirm the state is **Connected** and **Background relay** reports **Credential installed**.
6. Sign in to the same Thandoff account on mobile, add the plane from the Control Plane directory, and verify its fingerprint again.

The one-time authorization code is valid for about five minutes and becomes invalid immediately after consumption. If authorization is not completed or expires, start a new binding from settings instead of reusing the old page or code.

## Account Sign-In and Device Security

A Thandoff account supports email and password, Google/GitHub/Apple sign-in, email verification, TOTP with one-time recovery codes, and passkeys. Account settings can register multiple passkeys and show when each was created and last used.

- Changing a password, managing TOTP or passkeys, deleting the account, and other sensitive actions require recent authentication. After verification, sensitive actions remain available for a short period;
- **Signed-in devices** lists the account's login sessions and lets you revoke a lost or unused device independently;
- Thandoff account sign-in devices, Control Plane **Mobile device sessions**, and cloud-relay **Trusted devices** are separate boundaries. The first manages account identity; the other two control Control Plane sign-in and relay access pinned by that Control Plane;
- Signing out of the account removes cloud Control Planes added by that account, while manually added direct connections remain.

See [Mobile](/en/clients/mobile#cloud-account-and-security) for the client-side flows.

## Background Lifecycle

The Control Plane background process owns the relay; it does not depend on the browser that started authorization. These actions do not stop it:

- closing the Thandoff account settings page;
- signing out of the local Web UI;
- closing or allowing the authorization browser session to expire.

Stopping the Control Plane service, disabling remote access, revoking the binding, or detecting an identity conflict does stop it. After a service restart, the background process reconnects with its dedicated credential if the binding remains active and remote access is enabled.

## Cloud Nodes

After a node is bound to the account, other Control Planes in the same account can use it as a cloud node:

1. Open node details in a Control Plane that already manages the target node.
2. Open **Cloud node** and select **Add to cloud**.
3. In the Control Plane that needs access, open **Add node** and select **Use cloud relay**.
4. Select an existing account node, or generate a command to install and bind a new Node Agent.
5. Compare the code on the node and approve Control Plane trust.

Adding a node does not change its existing connection to the current Control Plane and does not migrate instances. Shared node access may expire; after expiry or revocation, Control Planes relying on that share cannot establish new connections.

Node details show the cloud channel state, last relay error, and trusted Control Planes. The current Control Plane cannot revoke its own trust from the same UI; run `task-handoff-node-agent trust` on the node. Other Control Planes can be revoked directly. See [Connect Remote Nodes](/en/integrations/remote-nodes#use-thandoff-cloud-node-relay) for the full flow.

## Data Region and Relay Boundary

Thandoff Cloud uses one home data region for account, binding, sharing, audit, and metering records. It does not replicate those records across regions or provide automatic failover, and that region may be outside your country or jurisdiction. Relay data planes may run in other regions, but they forward encrypted traffic temporarily and do not persist session content to disk.

The cloud processes operational information such as account details, signed-in devices, connection times, routing, and traffic. AI conversations, code, files, and terminal content in your workspace travel through end-to-end encrypted channels. The cloud can interrupt or delay a connection, but it cannot read the plaintext of that content or approve a device on an administrator's behalf.

Remote work through cloud relay is free. Traffic allowances exist only to prevent abuse, fraud, or service disruption; reasonable use above the allowance can be raised free of charge. Self-hosted deployments do not depend on Thandoff Cloud and are not subject to relay allowances.

## Status Reference

| Status | Meaning | Recommended action |
| --- | --- | --- |
| Not connected | No active account binding | Start connection |
| Awaiting authorization | A one-time challenge exists | Complete authorization before expiry or start again |
| Connected | Binding is active | Enable or disable remote access as needed |
| Revocation pending | Local access is disabled but remote revocation is unconfirmed | Restore connectivity and retry; do not bind another account |
| Identity conflict | Another installation is using this Control Plane identity | Decide which installation keeps the identity |

The binding revision identifies the authority-side authorization version. Client ingress also verifies the Control Plane ID, account, binding ID, and revision. An old or revoked authorization cannot establish a new connection.

## Disable or Disconnect

**Disable remote access** and **Disconnect Thandoff account** have different effects:

| Action | Keeps account binding | Stops relay | Recovery |
| --- | --- | --- | --- |
| Disable remote access | Yes | Yes | Select **Enable remote access** |
| Disconnect Thandoff account | No | Yes, and revokes node relay authorization | Complete account binding again |

Local disable takes effect immediately. If the remote result cannot be confirmed, the UI reports it as unknown. Disconnect first enters revocation-pending state and closes the connection, then asks the account service to revoke the binding. Until remote revocation is confirmed, the Control Plane refuses to bind a second account so two authoritative bindings cannot be created.

## Resolve an Identity Clone Conflict

The Control Plane ID and signing identity live in its data directory. Copying that entire directory and running both the original and copy makes two installations appear under one identity. When the account service detects this, it sets **Identity conflict**, removes the background relay credential, and quarantines all remote data connections.

Do not try to bypass the conflict by repeatedly enabling remote access. Stop one installation, decide which machine keeps the original Control Plane identity, then give the copy a new data directory and configure it as a new identity. Verify backups and DNS before recovery so a production identity is not accidentally retained by a temporary copy.

## Security Checklist

- Start binding and disconnect operations only from a trusted local administrator session.
- Enable TOTP or a passkey for the Thandoff account, and regularly review **Signed-in devices** plus the Control Plane's cloud-relay **Trusted devices**.
- Verify the Control Plane ID and identity fingerprint both during authorization and on mobile. For cloud-relay access, the pinned fingerprint, device private-key signature, and local approval must all pass.
- If a mobile device is lost, revoke both its Thandoff account sign-in and its Control Plane mobile-device session. An ordinary lost device does not require Control Plane identity rotation.
- Existing relay connections should close when the account is disabled, its background credential is revoked, or remote access is turned off.
- Thandoff account relay does not replace the Control Plane's own users, roles, and node/instance access scopes.
- On first cloud-node connection or a Control Plane key/access-context change, compare the code on the node before approving trust again.
