# About TaskHandoff

TaskHandoff is a free, open-source, self-hostable control plane for AI remote work. Connect from the macOS, Windows, or Linux desktop client or a browser, create isolated workspaces on different computers, and bring sessions, files, code changes, and runtime status into one interface. Managed AI sessions currently support **Codex** and **OpenCode**.

## Use Cases

- Connect multiple workstations or servers to one Control Plane and let agents work on those devices without switching between separate environments;
- write code, inspect progress, and manage servers from Desktop, a browser, Mobile, or chat wherever you are;
- run agents in isolated containers today while keeping a unified path toward a future Kubernetes runtime.

## Product Focus

- **One entry point** for all connected devices, workspaces, and AI sessions;
- **multi-terminal access** through Desktop, browser, Mobile, and chat for remote collaboration;
- **server management for large-scale environments**, with lifecycle and operational state centralized in one Control Plane.

## Current Scope

- **Agent kernels:** Codex and OpenCode only. Claude is available only as a compatibility path in some existing images or configurations and is not a first-class supported kernel.
- **Remote Desktop:** window-level capture is supported, along with the entire desktop, a single application, or a custom region. Session previews are read-only.
- **Instance runtimes:** Docker container instances are supported today, alongside a built-in Local Runtime.
- **Kubernetes:** runtime support is still under development and is not yet a supported deployment target.

## Cloud Service and Security

TaskHandoff can be fully self-hosted, or you can bind the optional Thandoff Cloud to reach your Control Plane from the public Internet or a mobile network. The cloud relay handles account discovery, connection coordination, and encrypted traffic forwarding; it does not hold workspace content or approve device access on an administrator's behalf.

- **Official accounts:** sign in with email and password, Google/GitHub/Apple OAuth, email verification, TOTP or recovery codes, and passkeys. Review and revoke signed-in devices; sensitive actions require recent authentication;
- **End-to-end encryption:** Relay forwards ciphertext frames and routing or metering identifiers only, without storing plaintext requests, AI sessions, files, or terminal content;
- **China and global nodes:** relay nodes are selected by client proximity to reduce latency when working across regions;
- **One home data region:** account, binding, sharing, and audit records live in one home data region, without cross-region replication or automatic failover;
- **Free remote access:** remote work is free. Relay traffic allowances exist only to prevent abuse, and reasonable usage can be raised free of charge.

For Control Plane access through cloud relay, clients also verify the pinned Control Plane fingerprint, a device private-key signature, and local approval. The cloud can interrupt or delay a connection, but it cannot decrypt business content or approve a device for an administrator. See [Remote Access](/en/integrations/remote-access) and [Use a Thandoff Account](/en/integrations/thandoff-account) for the complete flows.

## What It Does

- Manages local and remote compute nodes;
- Creates isolated workspaces from Git repositories or local folders;
- Installs, starts, and stops managed applications;
- Runs Codex and OpenCode AI sessions and streams their progress;
- Reviews files, Git changes, branches, and worktrees;
- Organizes repeatable work with Stories, preset actions, and triggers;
- Drives the control plane from the `thctl` command line or an agent skill;
- Provides access from the web, desktop, mobile, and chat platforms.

## Core Concepts

### Control Plane

The web interface you use day to day. It stores management data for users, nodes, projects, model providers, credentials, and chat integrations.

### Node

A computer running Node Agent. The node owns its local resources, folders, and managed instance lifecycle. One control plane can connect to multiple nodes.

### Instance

The runtime that contains a workspace and AI tools. Docker Runtime supports multiple isolated instances per node. Local Runtime uses the host environment and allows one local instance per host user.

### AI Session

One AI task running in an instance and a fixed working directory. TaskHandoff currently supports Codex and OpenCode as managed agent kernels. Sessions accept messages and attachments and report tools, approvals, and results; advanced capabilities vary by agent.

### Command Line and Agent Skill

Besides the interface, the `thctl` command-line client operates the same control plane. Install the TaskHandoff skill into Codex, OpenCode, or a similar agent and it can call `thctl` on its own — see [Install the thctl Skill](./thctl-skill).

### Story

A unit that groups documents, AI sessions, preset actions, and automation around a longer-running goal.

## System Layout

```text
Browser / Desktop / Mobile / Chat
                |
                v
           Control Plane
                |
                v
            Node Agent
                |
                v
        Controlled Instance
```

A brief Control Plane outage does not automatically stop Docker instances already managed by Node Agent. Their state is synchronized when the control plane reconnects.

## Next Step

Start with [Install and Sign In](./install), or continue to [First-time Setup](./first-setup) if the control plane is already available.
