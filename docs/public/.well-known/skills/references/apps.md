# 应用与终端

应用会话是在实例内启动的一个程序会话（终端、Codex、OpenCode、浏览器、VS Code 等）。实际可用项取决于实例镜像、操作系统和节点能力，不要凭名称假设某个应用可用。

## 查询

- `thctl app-session list [--instance <instanceId>] --json`、`app-session show <instanceId> <appSessionId> --json`。
- 可启动的 `appId` 来自实例的应用清单：`thctl instance show <instanceId> --json` 中的 `appInventory.items`。先看 `availability`（已安装 / 可安装 / 不支持 / 需处理）和 `diagnosticCode`，不要在不知道 appId 时猜测。

## 生命周期

- `app-session start <instanceId> <appId> [--cwd-folder <cwdFolderId>]`：在工作目录启动；实例必须处于运行中。
- `app-session stop|restart|rename <instanceId> <appSessionId>`。
- `app-session access <instanceId> <appSessionId>` 颁发终端或 VNC 访问租约。租约是凭据，不要写入日志、聊天或提交。
- 应用会话和 AI 会话各自保存实际工作目录；即使两者关联，仓库页面始终使用当前打开会话的目录，不会静默切换。

## 受管应用

实例设置中的应用页显示权威清单（已安装、可安装、不支持或需要处理）。安装和卸载是异步任务，可能需要系统权限并产生实时输出。应用仍有运行中会话时系统会阻止卸载；卸载只删除安装清单拥有的文件，不删除用户配置、主目录、工作区或 AI 会话。“自定义启动器”只能注册实例中已存在的程序，不能用来执行任意安装命令。

## 终端

终端拥有实例用户本身的权限。粘贴命令前要理解其作用，尤其注意递归删除、覆盖文件、修改系统包和输出环境变量的命令。关闭前端标签页不会自动停止应用进程，需要在应用会话中明确结束，才能释放资源。
