# Apps and Terminal

TaskHandoff primarily provides AI work through Codex and OpenCode, and can also launch Terminal, VS Code, Browser, and other supported apps. Availability depends on the instance image, platform, and capabilities.

## Launch an App

1. Confirm that the instance is running.
2. Open its action menu and select **Launch app**.
3. Choose an app and working directory.
4. Wait for the app session, then open it from instance details.

<figure class="doc-screenshot">
  <img src="/images/app-launch-menu.png" alt="Instance app launch menu">
  <figcaption>Launch Terminal, Codex, OpenCode, or Browser when supported by the instance.</figcaption>
</figure>

AI and app sessions each retain their actual working directory. Repository views use the directory of the session currently open.

## Managed Apps

Open **Instance settings → Apps** to inspect the trusted built-in catalog. Platform capability determines whether an app can be installed, uninstalled, launched, or is unsupported. Management jobs report their phase, progress, and terminal output.

The dynamic catalog includes GUI Terminal and Chromium on compatible Linux instances, plus the **Remote Desktop** component on supported platforms. Codex, OpenCode, and other environment-provided tools are normally detected and launched from inventory.

Uninstall removes only files owned by the managed installation. User configuration, home data, workspaces, and AI sessions are preserved. An app with active sessions cannot be uninstalled.

### App Tasks and Software Sources

Installation, update, and uninstall run asynchronously inside the instance. Closing settings or switching pages does not cancel the task; inspect its phase, progress, and installer output under **App tasks**.

**Install settings** selects the install environment and software sources for later app tasks:

- keep the instance environment, use official sources, a China mirror, or custom HTTPS endpoints;
- override the npm registry, Node.js distribution URL, and apt main/security mirrors;
- inspect or prepare an instance-private Node.js/npm toolchain;
- test endpoint connectivity before saving.

Changes affect only later app tasks and do not modify the instance's global software sources. Custom endpoints must use HTTPS and contain no credentials, query, or fragment.

### Remote Desktop Component

**Remote Desktop** is a managed component, not a regular launchable app. Install or repair it under **Instance settings → Apps**, then enable it under **Instance settings → Remote Desktop**. See [Remote Desktop](/en/workspace/remote-desktop) for setup, permissions, and controls.

## Terminal and Browser

Use the terminal to install project dependencies, run tests, inspect full logs, execute advanced Git operations, and verify AI changes. Understand commands before pasting them, especially destructive commands or commands that print environment variables.

Use the embedded browser to preview web apps running in the instance. Closing a UI tab does not necessarily stop its process; explicitly terminate unused app sessions to release resources.

<figure class="doc-screenshot">
  <img src="/images/embedded-browser-en.png" alt="Browser running inside a TaskHandoff instance">
  <figcaption>Browser and terminal sessions open as tabs alongside the instance's AI workspace.</figcaption>
</figure>
