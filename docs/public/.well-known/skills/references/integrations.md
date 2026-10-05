# 聊天桥接与远程访问

## 聊天桥接

把 Telegram、微信、钉钉、飞书/Lark 消息接入并路由到指定实例的 AI 会话。

- 入口：`thctl chat status --json`、`chat bridges list|create|update|start|stop|remove`、`chat sessions list|show`。
- 创建需要平台凭据（App ID、Client ID、Token 等）和默认目标。不同平台所需的回调、机器人权限和连接参数不同，以 `thctl schema chat bridges create --format json` 和平台后台为准。
- 一个入口不能同时绑定多个 Control Plane、多个实例或两者组合。应限制允许的用户，并选择可信实例作为默认目标。
- 聊天消息可能触发 Agent 读写工作区，其权限最终受目标会话和实例配置约束；高权限操作保持“询问”审批。
- Secret 保存后不回显；不要在聊天中发送 API Key、Git Token 或一次性节点令牌。
- 删除桥接会立即停止该入口，但不删除已经存在的 AI 会话；未保存的草稿关闭即丢失。

## Thandoff 账户与远程访问

把自管 Control Plane 发布到账户目录，供移动端等已授权客户端经后台中转访问。Control Plane 主动建立出站连接，无需开放 Control Plane 或 Node Agent 的公网入站端口。

- 入口：`thctl cloud show --json`、`cloud challenge`、`cloud remote-access --enabled <true|false>`、`cloud disconnect`。
- `cloud challenge` 只创建一次性授权挑战，返回 `authorizationUrl`、过期时间和公钥指纹；绑定用的 challenge code 由服务端与云服务持有，CLI 不打印、不落盘。因此绑定必须在已登录目标账户的授权页面完成，只靠命令行无法收尾；授权码约 5 分钟内有效且消费后立即失效，过期就重新发起，不要继续用旧码。
- 中转由 Control Plane 后台进程持有，不依赖浏览器页面：关闭设置页或退出 Web UI 都会继续。停止服务、关闭远程访问、撤销绑定或身份冲突会终止中转。
- “关闭远程访问”保留账户绑定，可再次开启；“断开账户”会撤销绑定，需要重新授权。远端撤销未确认前不要绑定第二个账户。
- 身份冲突通常来自复制整个数据目录后同时运行两个安装。系统会隔离远程数据连接；应先停掉其中一个并确定哪台保留原 Control Plane 身份，不要反复重试“开启远程访问”。
- 这条路径只中转“客户端到 Control Plane”，不是 Node Agent 的账号型中继；节点接入见 [nodes.md](./nodes.md)。
