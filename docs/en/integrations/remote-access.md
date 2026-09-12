# Remote Access

TaskHandoff has two independent remote-access paths: user devices connecting to a Control Plane, and a Control Plane managing Node Agents on other networks. Plan the ingress, authentication, and trust boundary for each path separately.

```text
Browser / mobile ── HTTPS / WSS ──> Control Plane
                                         │
                                         ├── local IPC ──> local Node Agent
                                         ├── reverse WSS <── remote Node Agent
                                         ├── HTTPS ───────> public Node Agent
                                         └── HTTPS / WSS ─> trusted Control Plane ─> Node Agent
```

Node Agents and controlled instances are not user-facing endpoints. Browsers and mobile clients always connect to the Control Plane, which forwards requests, event streams, and WebSockets over the selected node transport.

## In This Chapter

- [Expose the Control Plane](/en/integrations/public-control-plane): configure DNS, HTTPS, authentication, reverse proxying, and the public URL.
- [Connect Remote Nodes](/en/integrations/remote-nodes): choose reverse connections, direct Node Agent HTTPS, or a trusted Control Plane proxy.
- [Use a Thandoff Account](/en/integrations/thandoff-account): bind an account, control the background relay, and handle revocation or identity conflicts.

## Choose the Goal First

| Goal | Recommended path | Required ingress |
| --- | --- | --- |
| Reach the Control Plane from a browser or mobile device | Public HTTPS reverse proxy | Control Plane HTTPS/WSS |
| Keep the Control Plane private but use it from mobile | Thandoff account background relay | Outbound from the Control Plane only |
| Manage a remote node that can reach the Control Plane | Node Agent reverse WSS | Control Plane HTTPS/WSS |
| Manage a Node Agent reachable by the Control Plane | Direct Node Agent HTTPS | Node Agent HTTPS API |
| Neither side can accept ingress | Trusted Control Plane proxy | Both sides can reach the proxy Control Plane |

::: warning Current capability boundary
The Thandoff account relay carries client access to a Control Plane. Account-based Node Agent relay is not currently supported. Use a trusted Control Plane proxy when neither side can accept ingress.
:::

## Shared Security Rules

1. Use HTTPS/WSS with a trusted certificate for every public endpoint, and enable Control Plane account authentication.
2. Never expose Node Agent or controlled-instance endpoints and pairing material to ordinary users.
3. Use one-time tokens only to establish long-lived pairing. Regenerate expired or consumed tokens, and keep them out of repositories, tickets, and logs.
4. Restrict firewall ports and source networks. Reverse connections and account relay require no Node Agent ingress.
5. Regularly audit Control Plane login sessions, mobile devices, Node Agent pairings, and proxy bindings.
