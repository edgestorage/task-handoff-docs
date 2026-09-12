# Install and Sign In

## Deployment Options

TaskHandoff can run as a desktop application or on a Debian/Ubuntu server. A server installation is recommended for shared, continuously available environments.

### One-command Server Install

Run this on a Debian or Ubuntu server with `systemd`:

```sh
curl -fsSL https://github.com/edgestorage/task-handoff/releases/latest/download/install-server.sh | sudo sh
```

The installer prepares Node.js 24, Docker, Control Plane, and a local Node Agent. By default, the control plane listens on port `8081` with password authentication.

If Node.js and Docker are already installed:

```sh
sudo npm install -g @task-handoff/server@latest
sudo task-handoff install
```

Then open `http://SERVER_ADDRESS:8081` in a browser.

::: warning Public deployments
Never expose a control plane with authentication disabled to the public Internet. Configure a firewall and HTTPS reverse proxy, and expose only the required ports.
:::

## Create the First Administrator

The first visit to a password-protected control plane shows **Create administrator**.

1. Enter an administrator username.
2. Set and securely store a password.
3. Sign in with the new account.

Administrators add or approve subsequent users under **Settings → Users and access**. A user who receives a temporary password must set a new password of at least eight characters on first sign-in.

## Desktop Behavior

Closing the desktop window leaves TaskHandoff running in the system tray. Select **Quit TaskHandoff** from the tray or application menu to stop its background services.

Docker Runtime instances remain running when the desktop app exits. Local Runtime instances stop with Node Agent and are restored the next time it starts.

## Service Management

```sh
task-handoff status
task-handoff check
sudo task-handoff start
sudo task-handoff stop
sudo task-handoff restart
sudo task-handoff update
```

Control Plane and Node Agent are independent services. Stopping only the control plane does not terminate instances managed by Node Agent.

## Change the Interface Language

Open **Settings → Basic → Appearance** and choose Follow system, English, or Simplified Chinese. The preference is stored only in the current browser. Logs, AI messages, and repository content are not translated.
