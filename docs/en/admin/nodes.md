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
| Neither side accepts inbound traffic | Trusted control-plane proxy or supported relay |

Public Node Agent endpoints require HTTPS. Do not retain one-time tokens after pairing.

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

## TCP Listener

`127.0.0.1` is host-only; `0.0.0.0` expands access to all IPv4 interfaces and requires firewall and TLS controls. A port change is rejected while running instances still use the old callback port.

Disabling or deleting a control-plane connection does not automatically stop the remote Node Agent or its instances. Resolve instance, template, project, and model references before deleting a node.
