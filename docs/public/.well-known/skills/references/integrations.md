# 聊天桥接与云端连接

## 聊天桥接

把 Telegram、微信、钉钉、飞书/Lark 消息接入并路由到指定实例的 AI 会话。

- 入口：`thctl chat status --json`、`chat bridges list|create|update|start|stop|remove`、`chat sessions list|show`。
- 创建需要平台凭据（App ID、Client ID、Token 等）和默认目标。不同平台所需的回调、机器人权限和连接参数不同，以 `thctl schema chat bridges create --format json` 和平台后台为准。
- 一个入口不能同时绑定多个 Control Plane、多个实例或两者组合。应限制允许的用户，并选择可信实例作为默认目标。
- 聊天消息可能触发 Agent 读写工作区，其权限最终受目标会话和实例配置约束；高权限操作保持“询问”审批。
- Secret 保存后不回显；不要在聊天中发送 API Key、Git Token 或一次性节点令牌。
- 删除桥接会立即停止该入口，但不删除已经存在的 AI 会话；未保存的草稿关闭即丢失。

## Thandoff 账户、绑定与远程访问

Control Plane 通过出站连接接入云端，不需要开放 Control Plane 或 Node Agent 的公网入站端口。绑定前先用 `thctl cloud account show --json` 确认当前云账号与待审批请求。

### 云账号与绑定

- 查看账号：`thctl cloud account show --json`。响应包含 `signedIn`，登录后还会有账号、邮箱、会话过期时间；等待浏览器审批时检查 `pendingRequest`，失败时检查 `requestFailure`。
- 开始登录：`thctl cloud account sign-in --yes`。命令返回 `requestId`、`scope`、`expiresAt` 和 `authorizationUrl`。默认 JSON 不会自动打开浏览器；交互终端加 `--table` 时会尝试打开审批 URL。完成浏览器授权后重新执行 `cloud account show --json`。
- 登录成功后结束账号会话：`thctl cloud account sign-out --yes`。Cloud 账号登出与 Control Plane 云绑定是不同状态，不要用登出代替断开绑定。
- 新版绑定：`thctl cloud bind --yes`。它要求云账号已登录，通过 `POST /api/cloud-connectivity/binding-requests` 创建浏览器审批，返回请求元数据和 `authorizationUrl`。完成浏览器审批后，用 `thctl cloud show --json` 和 `thctl cloud account show --json` 核对 binding、scope 与待审批状态。
- `cloud bind` 与 `cloud account sign-in` 都不输出内部 challenge secret，不要把 `authorizationUrl` 当作已完成绑定；必须完成浏览器审批并重新读取服务端状态。
- `cloud challenge` 是旧版兼容入口，内部 challenge code 同样不打印、不落盘。新绑定应使用 `cloud bind`，不要尝试从 CLI 提取 challenge code。
- 断开绑定：`thctl cloud disconnect --yes`。它会撤销当前 Control Plane 的云绑定，之后重新接入需要再次完成浏览器审批。
- 中转由 Control Plane 后台进程持有，不依赖设置页或浏览器保持打开。

### 独立连接 scope

- 统一设置两个 scope：

  ```bash
  thctl cloud scopes set --device-access true --node-relay true --yes
  ```

- `deviceAccess` 允许云账号中的已授权设备访问这个 Control Plane；`nodeRelay` 允许这个 Control Plane 领取并连接云账号节点。
- 两个 scope 独立。只关闭其中一个会停用对应能力，只有两个都关闭才会停止整个云连接。
- 旧命令 `cloud remote-access --enabled <true|false>` 只适合兼容旧脚本。它使用旧 wire 字段，服务端会将其归一为 `deviceAccess=enabled, nodeRelay=false`；如果当前已启用 node relay，当前 CLI 会以冲突退出，避免意外关闭节点中转。新脚本应使用 `cloud scopes set`。

### 云账号节点

- 查看目录：`thctl cloud account-nodes list --json`。完整 JSON 包含 `signedIn`、`nodeRelay` 和 `items`；`items` 中的节点带有不透明 `nodeHandle`、状态、revision 以及 owner/shared 访问信息。
- 领取节点：先使用当前 Control Plane 完成云绑定，并从目录取得准确的 `nodeHandle`，再执行 `thctl cloud account-nodes claim <nodeHandle> --yes`。领取后重新读取目录，确认节点归属、状态和 revision。
- 释放节点：执行 `thctl cloud account-nodes release <nodeHandle> --yes`。释放影响云账号目录中的领取关系，应根据 `list` 返回的当前状态选择目标，不要猜测 handle。
- 非 TTY 写入必须显式 `--yes`；先在请求中说明目标 Control Plane、节点和影响，得到用户授权后再执行。

### 排障边界

- 账号未登录会导致 `cloud bind` 以 `CLOUD_ACCOUNT_SIGN_IN_REQUIRED` 退出，应先完成账号登录，不要继续重试绑定请求。
- 身份冲突通常来自复制整个数据目录后同时运行两个安装。应停掉其中一个并确定哪台保留原 Control Plane 身份，不要反复重试绑定或领取。
- “断开云绑定”保留本地 Control Plane 与节点数据；“云账号登出”结束账号会话；两者都不要用来替代节点领取或释放。
- 当前 CLI 还没有覆盖云角色分配、受信设备审批、单独查询 node relay 或把已有本地节点绑定到云账号的命令。需要这些操作时回到 Web 设置页，不要把相邻命令凑成不存在的流程。
