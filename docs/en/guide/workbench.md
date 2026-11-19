# Interface and Workbench

After sign-in, TaskHandoff opens its unified workbench. The top navigation switches product views, while the instance sidebar locates runtime environments.

<figure class="doc-screenshot">
  <img src="/images/workbench-overview-en.png" alt="TaskHandoff workbench overview">
  <figcaption>The workbench combines top-level navigation, the instance sidebar, session list, and main workspace.</figcaption>
</figure>

## Main Views

| View | Purpose |
| --- | --- |
| Home / Board | Browse instance cards and app previews by node, project, or status |
| AI | Monitor AI sessions across instances, especially active work and approvals |
| Story | Organize documents, sessions, preset actions, and automation by goal |
| User | Account, device sessions, and personal settings |
| Approvals | Handle AI session approvals, operation approvals, and Story decisions; expandable from the top bar |
| Settings | Manage nodes, instances, environments, models, credentials, users, remote desktop TURN, and system options |

## Instance Sidebar and Boards

Search, sort, group, and resize the instance sidebar. Selecting an instance opens its AI and app sessions. Its menu provides lifecycle, settings, and deletion actions.

<figure class="doc-screenshot">
  <img src="/images/instance-switcher-en.png" alt="Instance switcher in the TaskHandoff workbench">
  <figcaption>Switch directly between running instances from the workbench header.</figcaption>
</figure>

The instance board supervises multiple workspaces and supports filters, card sizes, app previews, and preview interaction. The AI board focuses on running, waiting, and failed AI sessions.

## Instance Directory and Settings

**Settings → Instances** lists instances across nodes and supports search by name, ID, node, project, or image, plus filters for node, status, and runtime. Open instance settings directly from the result row without returning to the matching board first.

If a node cannot currently provide its latest instance directory, the page says that the list may be incomplete. Do not treat cached results as a complete cross-node snapshot; restore the node connection and retry.

Sessions open in TaskHandoff's Compact mode by default, focusing on the current task turn and reducing interference from full message history. Switch to Conversation mode when the complete chronology is needed. See [Use AI Sessions](/en/sessions/#compact-and-conversation-modes).

## Approvals

The top-bar **Approvals** view collects the items that need you and lets you approve or deny each one:

- **AI session approval**: permission confirmations requested by an agent while it runs;
- **Operation approval**: high-privilege actions such as deleting an instance, removing a node, applying node updates, changing external listeners, changing user access or roles, updating identity providers, and assigning Git credentials;
- **Story decision**: a decision waiting for a human ruling in a Story;
- **Device trust**: admission after a new device, role change, or shared-authorization change;
- **Node Control Plane trust**: approval when a node first accepts a Control Plane or its identity changes.

An approval applies to that single request only; approving one does not authorize similar operations later. Items remain until handled, cancelled, or expired.

## Instance Details

Instance details contain AI timelines, app sessions and terminals, browser previews, Remote Desktop when the component is installed and enabled, the current session repository environment, and runtime status. Desktop or popup-enabled browsers can open one dedicated window per instance.

## Remote Desktop

After the instance has the Remote Desktop component installed and enabled, open it from the session action menu, resource sidebar, or instance details. Session cards and floating previews are read-only; open the full surface before enabling input or clipboard access.

The preview uses a floating window by default. Change it under **Settings → Basic → Appearance → Remote desktop card** to expand inline in the session. See [Remote Desktop](/en/workspace/remote-desktop) for requirements and controls.

## Light and Dark Modes

TaskHandoff provides light and dark interfaces. Under **Settings → Basic → Theme**, choose **Follow system**, **Light**, or **Dark**. Follow system uses the current operating system or desktop-client appearance. The choice changes presentation only; it does not affect instances, AI sessions, or server data.

<figure class="doc-screenshot">
  <img src="/images/story-workspace-light-en.png" alt="TaskHandoff Story workspace in light mode">
  <figcaption>The Story workspace in light mode.</figcaption>
</figure>

<figure class="doc-screenshot">
  <img src="/images/story-workspace-dark-en.png" alt="TaskHandoff Story workspace in dark mode with a Story session and a Chrome window running in the container">
  <figcaption>The Story workspace in dark mode, with a Story session and a Chrome window running in the container.</figcaption>
</figure>

## Responsive Interface

Narrow screens collapse navigation into menus. The native mobile client has a different capability boundary; see the [client capability matrix](/en/reference/capability-matrix).
