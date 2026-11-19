# Node Management

A node runs Node Agent and owns instance lifecycle on one computer. Open **Settings → Nodes** for status, versions, capabilities, and connection paths.

<figure class="doc-screenshot">
  <img src="/images/node-management-overview.png" alt="Node management and node details">
  <figcaption>Open a node to inspect runtimes, instances, projects, and connectivity.</figcaption>
</figure>

## Connection Paths

| Scenario | Connection |
| --- | --- |
| Control Plane and Node Agent share a host | Local IPC, normally automatic |
| Remote node can reach Control Plane | Generated install command with a one-time join token |
| Control Plane can reach a public Node Agent | HTTPS endpoint and pairing token |
| Neither side accepts inbound traffic | Trusted control-plane proxy or Thandoff cloud node relay |

Public Node Agent endpoints require HTTPS. Do not retain one-time tokens after pairing.

The Node Agent host needs Linux with `systemd`. Existing Node.js 24.15+ or Bun 1.4.4+ can be reused; installation and updates still require `npm` and `curl`. Docker Runtime requires an accessible Docker daemon.

<div class="doc-screenshot-grid">
  <figure class="doc-screenshot">
    <img src="/images/node-direct-connection-form.png" alt="Direct remote-node connection form">
    <figcaption>Direct connection: enter the Node Agent endpoint and a one-time join token.</figcaption>
  </figure>
  <figure class="doc-screenshot">
    <img src="/images/node-proxy-connection-form.png" alt="Control-plane proxy connection form">
    <figcaption>Control-plane proxy: verify the trusted origin before granting proxy authority.</figcaption>
  </figure>
</div>


## Node Details

Node details include Overview, Runtimes, Updates, Projects/Storage, Inventory, and Connection. Review Docker and Local Runtime capabilities, local workspace roots, system/image inventory, TCP listener, and diagnostics here.

Local project paths require access for the service user. Do not expose sensitive system directories as workspace roots.

## Node Groups and Quick Actions

The instance sidebar groups instances by node. The node header context menu can open node settings, rename the node, copy its ID or endpoint, check connectivity, and temporarily disconnect or restore the management channel.

Disconnecting stops the current Control Plane's management and proxy access only. It does not stop the Node Agent, Docker instances, or other connections on the node. Use **Check connection** for an authoritative online result before disconnecting during troubleshooting.

## TCP Listener

`127.0.0.1` is host-only; `0.0.0.0` expands access to all IPv4 interfaces and requires firewall and TLS controls. A port change is rejected while running instances still use the old callback port.

## Cloud Nodes and Trust

A node can be bound to a Thandoff account and used by other Control Planes in the same account through cloud relay:

1. Open **Cloud node** in a Control Plane that already manages the node and select **Add to cloud**.
2. In the Control Plane that needs access, select **Add node → Use cloud relay**.
3. Compare the code on the node and approve the new Control Plane trust.

The first time a node accepts a Control Plane, or when the Control Plane public key or access context changes, TaskHandoff creates a **Node Control Plane trust** request. Approve it in the Approval Center of a Control Plane that manages the node, or run on the target node:

```sh
task-handoff-node-agent trust list
task-handoff-node-agent trust approve <requestId> --comparison-code '<comparison-code>'
```

**Trusted control planes** in node details shows the last verification time. The current Control Plane cannot revoke its own trust from the same UI; use `task-handoff-node-agent trust` on the node. Other Control Planes can be revoked directly. Shared node access may expire and cannot establish new connections afterward.

## Model Relay

**Model relay** in node details is off by default. When enabled, model requests from managed instances are proxied through the Node Agent so the data path can flip without restarting instances; when disabled, instances fall back to the direct projection.

- The switch affects only new requests and can be turned off at any time;
- A model connection's **Model mapping** forwards the model name requested by clients to an upstream model name; the mapping only participates in request resolution while model relay is enabled;
- The switch appears only after the Node Agent is updated.

Disabling or deleting a control-plane connection does not automatically stop the remote Node Agent or its instances. Resolve instance, template, project, and model references before deleting a node.

## Diagnostics

When a node is offline or degraded, inspect connection diagnostics and the last error before checking the service, DNS, certificates, firewall, and proxy.

- Reverse and direct connections show current RTT, recent P95, consecutive reconnects, and next retry time;
- cloud nodes show channel state, last relay error, account access, and node trust state;
- trusted proxies require checking both current-plane-to-proxy and proxy-to-target paths.

Do not delete a node or instance just because the Control Plane shows cached state. See [Connect Remote Nodes](/en/integrations/remote-nodes) for the full connection flow.
