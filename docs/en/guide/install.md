# Install and Sign In

TaskHandoff can run as a desktop application or as Debian/Ubuntu server services. Use Desktop for a personal workstation and local development. Use Server for team access, continuous operation, or access from multiple devices.

## Choose an Installation

| Scenario | Recommended option | Default access |
| --- | --- | --- |
| Personal Mac, Windows, or Linux workstation | Desktop | Native window, no local sign-in |
| Shared or continuously available environment | Server | Browser with password authentication |
| Public or mobile access | Server, or Desktop with remote access configured | HTTPS or Thandoff account relay |

Both options include a Control Plane and local Node Agent. Do not run both against the same data directory on one machine.

## Install Desktop

### Download

Desktop installers are published in the official GitHub Releases:

- [Download the latest stable release](https://github.com/edgestorage/task-handoff/releases/latest)
- [Browse all releases and prereleases](https://github.com/edgestorage/task-handoff/releases)

Use the release download table or **Assets** list to select the correct package:

| System | Architecture | Recommended file | Notes |
| --- | --- | --- | --- |
| macOS | Apple Silicon | `TaskHandoff-VERSION-mac-arm64.dmg` | M1, M2, M3, M4, and later Apple chips |
| macOS | Intel | `TaskHandoff-VERSION-mac-x64.dmg` | Intel Macs |
| Windows | x64 | `TaskHandoff-VERSION-win-x64.exe` | Windows installer |
| Linux | x64 | `TaskHandoff-VERSION-linux-amd64.deb` | Debian, Ubuntu, and other DEB systems |
| Linux | x64 | `TaskHandoff-VERSION-linux-x86_64.AppImage` | Other distributions with AppImage support |

`.zip`, `.blockmap`, and `latest*.yml` files are primarily portable or automatic-update artifacts. Most users should choose the DMG, EXE, DEB, or AppImage above.

Stable macOS builds are signed, notarized, and verified with Gatekeeper. Windows builds are not currently code-signed, so Microsoft Defender SmartScreen may warn on first launch. Download only from the official release page above and verify the release and filename before continuing.

### macOS

1. Download the DMG matching the processor.
2. Open it and drag TaskHandoff into **Applications**.
3. Launch TaskHandoff from **Applications**.
4. When replacing an older version, quit normally from the tray or application menu before overwriting it.

Open **Apple menu → About This Mac** if unsure: choose `arm64` for an Apple chip and `x64` for an Intel processor.

### Windows

1. Download the `win-x64.exe` installer.
2. Run it and complete the installation wizard.
3. Start TaskHandoff from the Start menu.
4. If SmartScreen warns about the unsigned build, verify that the file came from the official GitHub Release and follow your organization's security policy.

Desktop on Windows uses Docker Runtime for local instances. The built-in Local Runtime is available only on supported non-Windows nodes.

### Linux

For Debian or Ubuntu, download the DEB and run:

```sh
sudo apt install ./TaskHandoff-VERSION-linux-amd64.deb
```

For AppImage:

```sh
chmod +x TaskHandoff-VERSION-linux-x86_64.AppImage
./TaskHandoff-VERSION-linux-x86_64.AppImage
```

Installing the desktop app does not install Docker. To create Docker Runtime instances, install and start Docker and ensure the current user can access the Docker daemon.

### First Launch

Desktop starts a Control Plane and Node Agent owned by the current user and automatically attaches the local node. By default:

- Control Plane listens only on `127.0.0.1:18081`;
- Node Agent listens only on `127.0.0.1:18091`, with local control preferring private IPC;
- the local desktop window does not ask you to create an administrator or enter a password;
- configuration, session indexes, and local-service data are stored in the current user's data directory.

Open **Settings → Nodes** and verify that the local node is online. Then follow [First-time Setup](/en/guide/first-setup) to prepare Docker or Local Runtime, model providers, and projects.

::: warning Remote desktop Control Plane access
Do not expose Desktop's default loopback, no-auth configuration to a LAN or the public Internet. Enable suitable authentication first, then configure HTTPS or Thandoff account relay as described in [Remote Access](/en/integrations/remote-access).
:::

## Install Server

### Requirements

The one-command server installer targets Debian or Ubuntu with `systemd`. Installation requires root access and network access to GitHub, npm, and system package repositories. Docker Runtime also requires a supported Docker environment.

### One-command Install

Run the installer published with the official GitHub Release:

```sh
curl -fsSL https://github.com/edgestorage/task-handoff/releases/latest/download/install-server.sh | sudo sh
```

It prepares Node.js 24, Docker, Control Plane, the local Node Agent, and controlled-instance runtime, then creates two `systemd` services. Control Plane listens on `0.0.0.0:8081` with password authentication by default.

If Node.js and Docker are already installed:

```sh
sudo npm install -g @task-handoff/server@latest
sudo task-handoff install
```

Open this address after installation:

```text
http://SERVER_ADDRESS:8081
```

::: warning Public deployments
Perform first sign-in from a trusted network. Put an HTTPS reverse proxy and firewall in front of `8081` for production instead of exposing plain HTTP publicly. See [Expose the Control Plane](/en/integrations/public-control-plane).
:::

## Create the First Administrator

The first visit to a password-authenticated Control Plane with no users shows **Create administrator**. Desktop does not enable password authentication by default, so it normally skips this step.

1. Enter an administrator username.
2. Set and securely store a password of at least eight characters.
3. Sign in to the Control Plane with the new account.

Administrators add or approve subsequent users under **Settings → Users and access**. A user receiving a temporary password must replace it on first sign-in. If the page shows only a sign-in form, an administrator already exists; contact that administrator instead of reinitializing the data directory.

## Desktop Windows and Quit Behavior

Closing the main window only hides it. TaskHandoff continues running in the system tray. Reopen the existing window from the tray without restarting Control Plane or Node Agent.

Choosing **Quit TaskHandoff** from the tray or platform application menu fully exits Desktop:

- the current Desktop Control Plane stops;
- graceful Node Agent shutdown stops Local Runtime instances and restores them on the next launch;
- Docker Runtime instances keep running and are rediscovered when Node Agent starts again.

Prefer Docker Runtime for work that must continue after Desktop exits, and save uncommitted terminal or editor work first.

## Manage Server Services

```sh
task-handoff status
task-handoff check
sudo task-handoff start
sudo task-handoff stop
sudo task-handoff restart
sudo task-handoff update
```

Control Plane and Node Agent are independent services. Stopping only Control Plane does not terminate instances managed by Node Agent. For installation diagnostics, run `task-handoff status` and `task-handoff check` before inspecting the logs of both `systemd` services.

## Update

For Desktop, open **Settings → Basic → Desktop updates**, select the `stable`, `beta`, or `alpha` channel, check, and download. Select **Restart and install** when ready. Development builds, unsigned Windows packages, or unsupported package formats may require a manual update from GitHub Releases.

For Server, run `sudo task-handoff update` or use **Settings → Basic → Server updates**. Check active instances and unsaved work before updating.

## Change the Interface Language

Open **Settings → Basic → Appearance** and choose Follow system, English, or Simplified Chinese. The preference is stored only in the current browser or desktop client. Logs, AI messages, and repository content are not translated.
