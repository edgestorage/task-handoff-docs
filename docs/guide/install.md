# 安装与登录

## 部署方式

TaskHandoff 可以作为桌面应用运行，也可以安装在 Debian 或 Ubuntu 服务器上。团队共享和持续运行场景建议使用服务器部署。

### 一键安装服务器版

在具备 `systemd` 的 Debian 或 Ubuntu 服务器上执行：

```sh
curl -fsSL https://github.com/edgestorage/task-handoff/releases/latest/download/install-server.sh | sudo sh
```

安装程序会准备 Node.js 24、Docker、Control Plane 和本机 Node Agent。默认控制面板监听 `8081` 端口并启用密码认证。

如果服务器已有 Node.js 和 Docker，也可以安装统一服务包：

```sh
sudo npm install -g @task-handoff/server@latest
sudo task-handoff install
```

安装完成后，在浏览器中访问：

```text
http://服务器地址:8081
```

::: warning 公网部署
不要把未启用认证的控制面板暴露到公网。请配置防火墙和 HTTPS 反向代理，并只开放实际需要的端口。
:::

## 创建首位管理员

首次打开启用密码认证的控制面板时，页面会显示“创建管理员”。

1. 输入管理员用户名。
2. 设置密码并妥善保管。
3. 完成创建后使用该账号进入控制面板。

后续用户由管理员在“设置 → 用户与权限”中创建或审批。收到临时密码的用户首次登录时，必须设置一个至少 8 个字符的新密码。

## 桌面端行为

关闭桌面窗口后，TaskHandoff 会继续在系统托盘运行。重新打开窗口不会重启后台服务。要完全停止桌面后台服务，请从托盘或应用菜单中选择“退出 TaskHandoff”。

Docker Runtime 实例在桌面应用退出后仍会保持运行；Local Runtime 实例会在 Node Agent 退出时停止，并在下次启动后恢复。

## 服务管理

服务器管理员可使用以下命令检查和管理服务：

```sh
task-handoff status
task-handoff check
sudo task-handoff start
sudo task-handoff stop
sudo task-handoff restart
sudo task-handoff update
```

Control Plane 与 Node Agent 是两个独立服务。单独停止控制面板不会终止 Node Agent 管理的运行中实例。

## 切换界面语言

打开“设置 → 基本 → 外观”，将语言设为“跟随系统”“English”或“简体中文”。语言偏好只保存在当前浏览器，不会同步到其他设备；日志、AI 消息和仓库内容不会被自动翻译。
