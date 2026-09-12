# Interface and Workbench

After sign-in, TaskHandoff opens its unified workbench. The top navigation switches product views, while the instance sidebar locates runtime environments.

<figure class="doc-screenshot">
  <img src="/images/workbench-overview.png" alt="TaskHandoff workbench overview">
  <figcaption>The workbench combines top-level navigation, the instance sidebar, session list, and main workspace. The interface shown is in Simplified Chinese.</figcaption>
</figure>

## Main Views

| View | Purpose |
| --- | --- |
| Home / Board | Browse instance cards and app previews by node, project, or status |
| AI | Monitor AI sessions across instances, especially active work and approvals |
| Story | Organize documents, sessions, preset actions, and automation by goal |
| Settings | Manage nodes, environments, models, credentials, users, and system options |

## Instance Sidebar and Boards

Search, sort, group, and resize the instance sidebar. Selecting an instance opens its AI and app sessions. Its menu provides lifecycle, settings, and deletion actions.

The instance board supervises multiple workspaces and supports filters, card sizes, app previews, and preview interaction. The AI board focuses on running, waiting, and failed AI sessions.

Sessions open in TaskHandoff's Compact mode by default, focusing on the current task turn and reducing interference from full message history. Switch to Conversation mode when the complete chronology is needed. See [Use AI Sessions](/en/sessions/#compact-and-conversation-modes).

## Instance Details

Instance details contain AI timelines, app sessions and terminals, browser previews, the current session repository environment, and runtime status. Desktop or popup-enabled browsers can open one dedicated window per instance.

## Light Mode

TaskHandoff provides both light and dark interfaces. Switch themes under **Settings → Basic → Theme**. The choice changes presentation in the current browser only; it does not affect instances, AI sessions, or server data.

<figure class="doc-screenshot">
  <img src="/images/workbench-light-mode.png" alt="TaskHandoff light mode interface">
  <figcaption>The Story workspace in light mode. The interface shown is in Simplified Chinese.</figcaption>
</figure>

## Responsive Interface

Narrow screens collapse navigation into menus. The native mobile client has a different capability boundary; see the [client capability matrix](/en/reference/capability-matrix).
