# About TaskHandoff

TaskHandoff is a self-hosted control plane for AI workspaces. It creates isolated development instances on different computers, primarily runs **Codex** and **OpenCode**, and brings sessions, files, code changes, and runtime status into one interface.

## What It Does

- Manages local and remote compute nodes;
- Creates isolated workspaces from Git repositories or local folders;
- Installs, starts, and stops managed applications;
- Runs Codex and OpenCode AI sessions and streams their progress;
- Reviews files, Git changes, branches, and worktrees;
- Organizes repeatable work with Stories, preset actions, and triggers;
- Provides access from the web, desktop, mobile, and chat platforms.

## Core Concepts

### Control Plane

The web interface you use day to day. It stores management data for users, nodes, projects, model providers, credentials, and chat integrations.

### Node

A computer running Node Agent. The node owns its local resources, folders, and managed instance lifecycle. One control plane can connect to multiple nodes.

### Instance

The runtime that contains a workspace and AI tools. Docker Runtime supports multiple isolated instances per node. Local Runtime uses the host environment and allows one local instance per host user.

### AI Session

One AI task running in an instance and a fixed working directory. TaskHandoff primarily supports Codex and OpenCode. Sessions accept messages and attachments and report tools, approvals, and results; advanced capabilities vary by agent.

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
