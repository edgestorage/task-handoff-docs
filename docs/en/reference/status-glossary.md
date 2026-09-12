# Status and Glossary

## Core Terms

| Term | Meaning |
| --- | --- |
| Control Plane | User interface, API, and centralized configuration |
| Node Agent | Owns resources and instance lifecycle on one node |
| Controlled Instance | Runtime containing workspace, apps, and AI sessions |
| AI Session | One managed Codex or OpenCode work session |
| App Session | One Terminal, Browser, VS Code, or other app process |
| Story | Long-running unit for documents, sessions, actions, and automation |
| Provider | A model API connection |
| Worktree | An independent working directory for one Git repository |

## Status Families

A node can be online, offline, or degraded. Offline status may leave cached instance data.

An instance moves through created, provisioning, starting, registering, running, stopping, stopped, unhealthy, or failed.

An AI session lifecycle can be running, waiting, idle, or failed, while its current phase can be reasoning, tool, editing, approval, or responding. Client **Reconnecting** status does not mean the agent stopped.

Update jobs move through queued, agent update/restart, instance convergence, success, degraded, or failure. Protocol warnings may preserve basic connectivity while capability-gating newer features.
