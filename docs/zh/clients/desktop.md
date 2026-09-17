# 桌面端

TaskHandoff Desktop 把控制面板、Node Agent 和桌面窗口组合在一个应用中，适合个人工作站和本地开发环境。

安装包和各平台安装步骤见[安装与登录](/zh/guide/install#安装桌面端)。桌面安装包只从 [TaskHandoff 官方 GitHub Releases](https://github.com/edgestorage/task-handoff/releases/latest)下载。

## 启动

桌面端启动时会检查本机是否已有 Control Plane 和 Node Agent。兼容且健康的 Node Agent 可以复用；未知程序占用默认端口时，应用可能分配其他端口，不会仅凭端口占用终止进程。

## 窗口与托盘

关闭主窗口只隐藏界面，TaskHandoff 继续在系统托盘运行。点击托盘图标可恢复窗口。选择“退出 TaskHandoff”才会结束桌面应用及其当前 Control Plane。

普通退出会保留 Node Agent：

- Docker Runtime 实例继续运行；
- Local Runtime 实例按 Node Agent 的退出与恢复策略处理；
- AI 工作的权威状态仍在实例侧，重新打开后同步。

## 独立实例窗口

实例可以在独立窗口打开。一个实例只保留一个独立窗口；重复打开会切换到已有窗口。可按需设置窗口置顶、标题栏密度、状态栏和实例侧栏。

## 桌面更新

“设置 → 基础 → 桌面端更新”可检查发布渠道和更新状态。下载完成后选择“重启并安装”。开发构建、未签名 Windows 包或不支持的平台可能只提供手动更新。

安装桌面更新时会停止 Control Plane 与 Node Agent，随后恢复服务。更新前检查活跃 Local Runtime 工作和未保存内容。

## 完全退出前检查

- 确认不再需要本地运行的终端和应用；
- 提交或备份重要修改；
- 需要持续运行的任务优先放在 Docker Runtime；
- 不要通过强制结束进程代替正常退出，除非应用已经无响应。
