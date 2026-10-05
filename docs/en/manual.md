# TaskHandoff User Guide

TaskHandoff centrally manages AI workspaces, instances, sessions, and automation across local and remote nodes.

::: info Primary AI agents
TaskHandoff currently focuses on **Codex** and **OpenCode**. Both use the unified interface for creating, supervising, and recovering AI work. See [Codex and OpenCode](/en/agents/).
:::

Sessions default to TaskHandoff's distinctive [Compact mode](/en/sessions/#compact-and-conversation-modes), which focuses on the current task turn and greatly reduces interference from full message history. Conversation mode remains available whenever the complete chronology is needed.

## Start Here

For a first-time setup:

1. [Learn the core concepts](/en/guide/).
2. [Install TaskHandoff and sign in](/en/guide/install).
3. [Connect a node and configure a model](/en/guide/first-setup).
4. [Configure Codex or OpenCode](/en/agents/).
5. [Create your first instance](/en/instances/).
6. [Start an AI session](/en/sessions/).

::: tip Audience
This guide is for TaskHandoff administrators and regular users. Steps that require administrator access are identified explicitly.
:::

## Guide Chapters

### Get Started

- [About TaskHandoff](/en/guide/): purpose, core concepts, and system layout.
- [Install the thctl Skill](/en/guide/thctl-skill): install the usage guide into Codex, OpenCode, and similar agents so they can drive the Control Plane directly.
- [Install and Sign In](/en/guide/install): server deployment, administrator setup, desktop behavior, and languages.
- [First-time Setup](/en/guide/first-setup): nodes, runtime environments, model providers, and projects.
- [Interface and Workbench](/en/guide/workbench): navigation, boards, sidebar, and dedicated windows.

### Instances and AI

- [Codex and OpenCode](/en/agents/): primary agents, model protocols, and selection guidance.
- [Create and Manage Instances](/en/instances/): workspaces, runtimes, status, templates, and deletion.
- [Instance Settings](/en/instances/settings): AI defaults, agent settings, models, apps, and Git access.
- [Use AI Sessions](/en/sessions/): session creation, permissions, messages, progress, and session management.
- [Repository Workflows](/en/workspace/repository): files, changes, worktrees, branches, and remote delivery.
- [Apps and Terminal](/en/workspace/apps-terminal): managed apps, terminal access, and browser previews.

### Organization and Administration

- [Stories and Automation](/en/automation/): documents, preset actions, schedules, and triggers.
- [Node management](/en/admin/nodes), [resource management](/en/admin/resources), and [users and access](/en/admin/users).
- [Desktop](/en/clients/desktop), [Mobile](/en/clients/mobile), [chat bridges](/en/integrations/chat), and [remote access](/en/integrations/remote-access).
- [Settings and Security](/en/settings/): global settings entry points and security principles.
- [Troubleshooting](/en/troubleshooting): common node, instance, session, and repository problems.

### Operations and Reference

- [Updates and Versions](/en/admin/updates): release sets for Control Plane, Node Agent, and instances.
- [Data, Backup, and Recovery](/en/reference/data-backup): backup strategy for configuration, instance data, and workspaces.
- [Status and Glossary](/en/reference/status-glossary): UI states, error messages, and terminology.
- [Client Capability Matrix](/en/reference/capability-matrix): capability differences across web, desktop, mobile, and chat.
- [Private Repository Tutorial](/en/tutorials/private-repository) and [Worktree Tutorial](/en/tutorials/worktree-session): end-to-end workflow examples.
- [FAQ](/en/faq): short answers to common questions.

## Read by Role

| Role | Recommended chapters |
| --- | --- |
| Regular user | Instances, AI sessions, repository workflows, apps and terminal |
| Administrator | Install, first-time setup, settings and security, troubleshooting |
| Automation user | AI sessions, Stories and automation, settings and security |
