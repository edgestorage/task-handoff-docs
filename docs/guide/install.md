# 安装与登录

TaskHandoff 可以作为桌面应用运行，也可以部署为 Debian/Ubuntu 服务器服务。个人电脑和本地开发优先使用桌面端；需要团队共享、持续运行或从多台设备访问时，使用服务器端。

## 选择安装方式

| 场景 | 建议方式 | 默认访问方式 |
| --- | --- | --- |
| 个人 Mac、Windows 或 Linux 工作站 | 桌面端 | 应用窗口，本机无需登录 |
| 团队共享或长期在线 | 服务器端 | 浏览器访问，默认密码认证 |
| 需要公网或移动端访问 | 服务器端，或桌面端配合远程访问 | HTTPS 或 Thandoff 账户中转 |

桌面端和服务器端都包含 Control Plane 与本机 Node Agent。二者不要安装到同一台机器并同时管理同一个数据目录。

## 安装桌面端

### 下载

桌面安装包发布在官方 GitHub Releases：

- [下载最新稳定版](https://github.com/edgestorage/task-handoff/releases/latest)
- [查看全部版本和预发布版](https://github.com/edgestorage/task-handoff/releases)

在 Release 页的下载表格或 **Assets** 中，根据系统与处理器选择：

| 系统 | 架构 | 推荐文件 | 说明 |
| --- | --- | --- | --- |
| macOS | Apple Silicon | `TaskHandoff-版本-mac-arm64.dmg` | M1、M2、M3、M4 等 Mac |
| macOS | Intel | `TaskHandoff-版本-mac-x64.dmg` | Intel Mac |
| Windows | x64 | `TaskHandoff-版本-win-x64.exe` | Windows 安装程序 |
| Linux | x64 | `TaskHandoff-版本-linux-amd64.deb` | Debian、Ubuntu 等 DEB 系统 |
| Linux | x64 | `TaskHandoff-版本-linux-x86_64.AppImage` | 其他支持 AppImage 的发行版 |

`.zip`、`.blockmap` 和 `latest*.yml` 主要供便携包或自动更新使用。普通安装优先选择上表中的 DMG、EXE、DEB 或 AppImage。

正式发布的 macOS 安装包已经签名、公证并通过 Gatekeeper 校验。Windows 安装包目前尚未进行代码签名，首次运行时可能出现 Microsoft Defender SmartScreen 提示；只使用上述官方 Release 下载，并在继续前核对发布者页面和文件名。

### macOS

1. 下载与处理器匹配的 DMG。
2. 打开 DMG，把 TaskHandoff 拖入“应用程序”。
3. 从“应用程序”启动 TaskHandoff。
4. 如果正在替换旧版本，先从托盘或应用菜单正常退出，再覆盖应用。

不确定处理器类型时，打开“苹果菜单 → 关于本机”：显示 Apple 芯片时选择 `arm64`，显示 Intel 处理器时选择 `x64`。

### Windows

1. 下载 `win-x64.exe`。
2. 运行安装程序并按向导完成安装。
3. 从开始菜单启动 TaskHandoff。
4. 如果 SmartScreen 因未签名构建发出警告，先确认文件来自官方 GitHub Release，再根据组织安全策略决定是否继续。

Windows 桌面端使用 Docker Runtime 创建本机实例；内置 Local Runtime 仅在受支持的非 Windows 节点提供。

### Linux

Debian 或 Ubuntu 推荐下载 DEB 后执行：

```sh
sudo apt install ./TaskHandoff-版本-linux-amd64.deb
```

使用 AppImage 时：

```sh
chmod +x TaskHandoff-版本-linux-x86_64.AppImage
./TaskHandoff-版本-linux-x86_64.AppImage
```

安装桌面应用本身不等于安装 Docker。需要创建 Docker Runtime 实例时，请先安装并启动 Docker，并确保当前用户有权访问 Docker daemon。

### 首次启动

桌面端会启动当前用户专属的 Control Plane 和 Node Agent，并自动接入本机节点。默认情况下：

- Control Plane 只监听 `127.0.0.1:18081`；
- Node Agent 只监听 `127.0.0.1:18091`，本地控制优先使用私有 IPC；
- 本机桌面窗口不要求创建管理员或输入密码；
- 配置、会话索引和本机服务数据保存在当前用户的数据目录中。

打开“设置 → 节点”，确认本机节点为“在线”。随后按[首次配置](/guide/first-setup)准备 Docker 或 Local Runtime、模型 Provider 和项目。

::: warning 远程访问桌面 Control Plane
桌面端的默认本机监听和无认证模式不能直接暴露到局域网或公网。需要从其他设备访问时，应先启用适当认证，再按照[远程访问](/integrations/remote-access)配置 HTTPS 或 Thandoff 账户中转。
:::

## 安装服务器端

### 系统要求

服务器一键安装面向带 `systemd` 的 Debian 或 Ubuntu。安装过程需要 root 权限和访问 GitHub、npm 及软件源的网络；使用 Docker Runtime 时还需要受支持的 Docker 环境。

### 一键安装

执行官方 GitHub Release 中的安装脚本：

```sh
curl -fsSL https://github.com/edgestorage/task-handoff/releases/latest/download/install-server.sh | sudo sh
```

安装程序会准备 Node.js 24、Docker、Control Plane、本机 Node Agent 和受控实例运行时，并创建两个 `systemd` 服务。默认 Control Plane 监听 `0.0.0.0:8081`，启用密码认证。

如果服务器已有 Node.js 和 Docker，也可以安装统一服务包：

```sh
sudo npm install -g @task-handoff/server@latest
sudo task-handoff install
```

安装完成后，在浏览器中打开：

```text
http://服务器地址:8081
```

::: warning 公网部署
首次登录前只从可信网络访问。生产环境应在 `8081` 前配置 HTTPS 反向代理和防火墙，不要直接把 HTTP 端口暴露到公网。完整要求见[让 Control Plane 可远程访问](/integrations/public-control-plane)。
:::

## 创建首位管理员

首次打开启用密码认证、且尚无用户的 Control Plane 时，页面会显示“创建管理员”。桌面端默认未启用密码认证，因此通常不会出现此步骤。

1. 输入管理员用户名。
2. 设置至少 8 个字符的密码并妥善保管。
3. 创建完成后，使用该账号进入 Control Plane。

后续用户由管理员在“设置 → 用户与权限”中创建或审批。收到临时密码的用户首次登录时必须设置新密码。若页面直接显示登录框，说明管理员已经存在，应联系当前管理员，不要重复初始化数据目录。

## 桌面窗口与退出

关闭桌面主窗口只会隐藏界面，TaskHandoff 会继续在系统托盘运行。点击托盘图标可恢复原窗口，不会重启 Control Plane 或 Node Agent。

选择托盘或平台应用菜单中的“退出 TaskHandoff”才会完全退出桌面应用：

- 当前桌面 Control Plane 会停止；
- Node Agent 优雅退出时会停止 Local Runtime 实例，并在下次启动后恢复；
- Docker Runtime 实例保持运行，Node Agent 下次启动后会重新发现并接管。

需要任务在关闭桌面应用后继续运行时，优先使用 Docker Runtime，并在退出前保存终端和编辑器中的未提交内容。

## 管理服务器服务

```sh
task-handoff status
task-handoff check
sudo task-handoff start
sudo task-handoff stop
sudo task-handoff restart
sudo task-handoff update
```

Control Plane 与 Node Agent 是两个独立服务。单独停止 Control Plane 不会终止 Node Agent 管理的运行中实例。需要诊断安装状态时先运行 `task-handoff status` 和 `task-handoff check`，再检查两个 `systemd` 服务的日志。

## 更新安装

桌面端在“设置 → 基础 → 桌面端更新”中选择 `stable`、`beta` 或 `alpha` 渠道，检查并下载更新；下载完成后选择“重启并安装”。开发构建、未签名 Windows 包或不受支持的安装格式可能只允许从 GitHub Release 手动更新。

服务器端可以运行 `sudo task-handoff update`，或在“设置 → 基础 → 服务器更新”中操作。更新前检查活跃实例和未保存工作。

## 切换界面语言

打开“设置 → 基本 → 外观”，将语言设为“跟随系统”“English”或“简体中文”。语言偏好只保存在当前浏览器或桌面客户端，不会同步到其他设备；日志、AI 消息和仓库内容不会被自动翻译。
