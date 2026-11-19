# Remote Access

TaskHandoff has three remote-access paths that need separate planning: user devices connecting to a Control Plane, a Control Plane managing Node Agents, and account-bound Node Agent relay inside a Thandoff account.

```text
Browser / mobile ── HTTPS / WSS ──> Control Plane
                                         ├── local IPC / reverse WSS / HTTPS ──> Node Agent
                                         ├── trusted Control Plane proxy ─────> Node Agent
                                         └── Thandoff cloud relay ────────────> account-owned Node Agent
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
| Neither side can accept ingress, and the node is bound to the same Thandoff account | Cloud node relay | Both sides only need outbound access to Thandoff Cloud |

::: info Account-based node relay
A Node Agent can be bound to a Thandoff account and then used by other Control Planes in that account through the cloud relay. The node must still approve Control Plane trust on first connection. Node access follows owner or shared authorization, and a share may expire.
:::

## Cloud Relay Trust Boundary

Channels established through Thandoff Cloud use end-to-end encryption. Relay forwards ciphertext frames and routing or metering identifiers only. It does not hold workspaces, AI sessions, files, terminal content, or end-to-end keys; the cloud may process operational information such as accounts, signed-in devices, connection times, routing, and traffic.

Cloud account privileges alone cannot authorize access. Clients also verify the pinned Control Plane fingerprint and a device private-key signature, and the local management endpoint must approve the connection. The cloud can interrupt or delay a connection, but it cannot decrypt business content or approve a device on an administrator's behalf. Account and binding records live in one home data region, while Relay data planes may forward traffic from other regions. See [Use a Thandoff Account](/en/integrations/thandoff-account) for the complete flow.

## Shared Security Rules

1. Use HTTPS/WSS with a trusted certificate for every public endpoint, and enable Control Plane account authentication.
2. Never expose Node Agent or controlled-instance endpoints and pairing material to ordinary users.
3. Use one-time tokens only to establish long-lived pairing. Regenerate expired or consumed tokens, and keep them out of repositories, tickets, and logs.
4. Restrict firewall ports and source networks. Reverse connections and account relay require no Node Agent ingress.
5. Regularly audit Control Plane login sessions, mobile devices, Node Agent pairings, and proxy bindings.
6. On first cloud-node connection or a Control Plane identity change, compare the code on the node before approving trust. Do not auto-approve unknown sources.
