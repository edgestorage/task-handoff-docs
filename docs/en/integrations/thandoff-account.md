# Use a Thandoff Account

A Thandoff account can publish a self-managed Control Plane in the account directory and make it available to authorized clients through a background relay. The Control Plane initiates an outbound connection, so this path requires no public ingress to either the Control Plane or Node Agent.

The relay carries client-to-Control Plane API calls, response streams, and WebSockets. It is not account-based relay between Node Agents.

## Bind the Control Plane

Only a local administrator can change the account connection:

1. Open **Settings → Thandoff account** locally or on a trusted network.
2. Record the displayed Control Plane ID and identity fingerprint.
3. Select **Connect Thandoff account**. TaskHandoff opens the authorization page and copies a one-time authorization code to the clipboard.
4. Sign in to the intended account, verify the Control Plane ID, fingerprint, and code, then approve.
5. Return to settings and confirm the state is **Connected** and **Background relay** reports **Credential installed**.
6. Sign in to the same Thandoff account on mobile, add the plane from the Control Plane directory, and verify its fingerprint again.

The one-time authorization code is valid for about five minutes and becomes invalid immediately after consumption. If authorization is not completed or expires, start a new binding from settings instead of reusing the old page or code.

## Background Lifecycle

The Control Plane background process owns the relay; it does not depend on the browser that started authorization. These actions do not stop it:

- closing the Thandoff account settings page;
- signing out of the local Web UI;
- closing or allowing the authorization browser session to expire.

Stopping the Control Plane service, disabling remote access, revoking the binding, or detecting an identity conflict does stop it. After a service restart, the background process reconnects with its dedicated credential if the binding remains active and remote access is enabled.

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
| Disconnect Thandoff account | No | Yes | Complete account binding again |

Local disable takes effect immediately. If the remote result cannot be confirmed, the UI reports it as unknown. Disconnect first enters revocation-pending state and closes the connection, then asks the account service to revoke the binding. Until remote revocation is confirmed, the Control Plane refuses to bind a second account so two authoritative bindings cannot be created.

## Resolve an Identity Clone Conflict

The Control Plane ID and signing identity live in its data directory. Copying that entire directory and running both the original and copy makes two installations appear under one identity. When the account service detects this, it sets **Identity conflict**, removes the background relay credential, and quarantines all remote data connections.

Do not try to bypass the conflict by repeatedly enabling remote access. Stop one installation, decide which machine keeps the original Control Plane identity, then give the copy a new data directory and configure it as a new identity. Verify backups and DNS before recovery so a production identity is not accidentally retained by a temporary copy.

## Security Checklist

- Start binding and disconnect operations only from a trusted local administrator session.
- Verify the Control Plane ID and identity fingerprint both during authorization and on mobile.
- Revoke a lost device under the Control Plane's mobile-device sessions. An ordinary lost device does not require Control Plane identity rotation.
- Existing relay connections should close when the account is disabled, its background credential is revoked, or remote access is turned off.
- Thandoff account relay does not replace the Control Plane's own users, roles, and node/instance access scopes.
