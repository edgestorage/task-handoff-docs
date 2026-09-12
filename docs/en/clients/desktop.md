# Desktop Client

TaskHandoff Desktop combines the control-plane UI, local services, and native windows for personal workstations.

## Startup and Tray

Desktop checks for existing Control Plane and Node Agent processes and can reuse a compatible healthy Node Agent. An unknown process on the preferred port is not terminated merely because the port is occupied.

Closing the main window leaves TaskHandoff in the system tray. **Quit TaskHandoff** stops the desktop app and its current Control Plane, while ordinary quit leaves Node Agent and Docker instances independent.

## Instance Windows

Open an instance in a dedicated window for focused work. One window is retained per instance. Window options include always-on-top, header density, status bar, and instance sidebar visibility.

## Updates

Use **Settings → Basic → Desktop updates** to check the selected release channel, download, and restart to install. Some development, unsigned Windows, or unsupported packages require manual updates.

Before a full update or quit, check active local sessions, save work, and prefer Docker Runtime for tasks that must continue independently.
