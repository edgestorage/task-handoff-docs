# TaskHandoff 节点接入与诊断

节点是运行 Node Agent、实际管理实例的机器。Control Plane 中的节点记录不等于 Node Agent 已在线，也不等于节点上的实例健康。

## 先看现状，再选路径

- `thctl node list --json` 返回节点目录投影（`status`、`health`、`connectionMode`、`connectionPath`、`lastSeenAt`、`capabilities`）。
- `thctl node show <nodeId> --json` 只在这个可见目录里查找，找不到会以退出码 7 失败；这不代表节点被删除，也可能只是当前 profile 或权限看不到。
- `thctl node check <nodeId> --json` 主动探测 Agent 并报告健康状态。

节点级写命令（`folders`、`runtimes`、`settings`、`updates`、`pairing`、`connections`）受目标 Node Agent 能力门控；退出码 14 表示该节点版本不支持这项能力，应升级节点，不要绕过。涉及两台 Control Plane 时分别确认当前 `--profile`，不要把两边的节点 ID 混用。

## 选择接入方式

| 用户意图 / 网络条件 | 首选方式 | 关键区别 |
| --- | --- | --- |
| 当前 Control Plane 与 Node Agent 同机 | 本地 IPC | 完整安装通常自动接入；缺失时用 `thctl node sync-local` 恢复登记。 |
| 新机器或已有 Agent 能主动访问 Control Plane | 反向 WSS | Control Plane 创建一次性 join 邀请，目标机发起连接，无需暴露 Node Agent 入站端口。 |
| 节点已由另一块面板管理，要再接入本面板 | 出站连接 | 在目标面板建邀请，在已管理该节点的面板执行 `node connections create`。 |
| Control Plane 只能访问目标 Node Agent | 直连 HTTPS | 目标端需有 TLS 和一次性配对令牌，再用 `node create` 登记；不要用裸 HTTP 公网地址。 |
| 目标已归另一台可信 Control Plane 管理，双方无法直接接入 | 可信 Control Plane 代理 | 两台面板建立委托信任；代理面板能代表本面板操作目标节点，不是端到端加密。 |

先问清：目标机是否已装 Node Agent、谁能主动访问谁、当前面板是否公网可达、目标是否已被其他面板管理、是否有目标主机执行权限。不要看到“添加节点”就直接选 `node create`。账户型节点中继当前协议未支持，不能把账户远程访问当作节点接入通道。

## 四条操作路径

### 本机节点

确认目录中没有重复的本地节点；缺失或需要重新登记时，在用户授权后执行 `thctl node sync-local`（写操作），再从返回取 `nodeId` 做 `show` / `check`。如果本机服务本身没运行，先排查服务，不要反复注册或删除节点。

### 目标机可以访问当前面板（推荐远程路径）

1. 在用户授权后执行 `thctl node-join invite --json`，返回邀请 ID、一次性 `joinToken` 和 `expiresAt`。默认有效期 10 分钟，可用 `--config` 的 `expiresInMs` 延长到最多 1 小时。令牌绝不粘贴到聊天、提交仓库或写入可读日志，只通过用户确认的安全渠道送到目标机。
2. 目标机是新的 Debian/Ubuntu 主机时使用当前面板生成、用户核对过的安装方式；已有 Node Agent 则用 `task-handoff-node-agent connect`。远程安装、`sudo` 和系统服务变更都是独立的主机操作，未获授权不要代做，也不要拼造安装 URL、版本或参数。
3. 用 `thctl node-join status <inviteId> --json` 查看是否完成，再用返回的真实 `nodeId` 执行 `show` / `check`。令牌是一次性的：过期或失败后重新邀请，不要重复提交同一个 token，也不要盲目重试 `node-join complete`（正常由目标 Agent 调用，且要求完整的 nodeId/keyId/secret）。

### 已受管节点接入新面板（出站连接）

节点已由面板 A 管理，希望它同时连到面板 B：

1. 在 **B** 上创建加入邀请（B 的 profile）：`thctl node-join invite --json`。
2. 在 **A** 上对该节点执行 `thctl node connections create <nodeId> --config <file>`，请求体含 `controlPlaneUrl`（B）和一次性 `joinToken`，先用 `thctl schema node connections create --format json` 核对字段。
3. 用 `thctl node connections list <nodeId> --json` 检查连接状态；不再需要时 `node connections remove <nodeId> <connectionId>`。移除连接不会停止节点上的实例。

### 当前面板只能访问目标 Agent（直连）

1. 先确认目标端 HTTPS、DNS、防火墙和 TLS 就绪，并由有权限的一方生成一次性配对令牌。两条途径：目标主机运行 `task-handoff-node-agent invite`，或已管理该节点的面板执行 `thctl node pairing invite <nodeId> --json`（令牌同样不落日志）。
2. 用 `thctl node create --config <file>` 登记并配对。请求体只有 `name` 必填，但 direct-http 远程连接还必须提供可达的 HTTPS 端点（`endpoint` 或 `controlEndpoint`）和一次性令牌（`joinToken`，或已配对的 secret），否则服务端会以 `NODE_AGENT_ENDPOINT_REQUIRED` 或配对错误拒绝。字段以 `thctl schema node create --format json` 为准，不要手写。
3. 令牌只放权限受限的临时输入文件；`--dry-run` 会打印请求体，含令牌的请求不要用它。完成后从返回取 ID 做 `show` / `check`。
4. 清理残留配对用 `thctl node pairings list <nodeId> --json` / `node pairings remove <nodeId> <keyId>`。

### 可信面板代理

1. 明确来源面板 A、目标所在面板 R、目标节点 B，并取得用户对 **R 可代表 A 操作 B** 的明确确认。只接受 R 的规范 HTTPS Origin（无 userinfo、path、query、fragment）。
2. 在 R 上创建绑定 B 的代理邀请：`thctl proxy invites create --config <file>`，有效期 24 小时。
3. 初次认领目前没有 CLI 命令，必须在 A 的“添加节点”向导完成。`thctl proxy pending-claims list --json` 只用于查看进行中的认领，`pending-claims resume` / `remove` 处理卡住的认领。不要用 `node create` 伪造代理节点，代理连接身份只能通过代理生命周期接口变更。
4. 核验：A 看节点连接状态，R 看 `proxy bindings list` / `proxy diagnostics`。

## 已连接但不可用

按 `list` → `show` → `check` 的顺序区分传输故障、Agent 健康异常、Runtime 故障和实例离线；节点在线不代表实例健康。反向连接检查目标到面板的 DNS、证书、网络与 Agent 服务；直连检查面板到目标的 HTTPS 与配对；代理检查两段路径和代理目标状态。查询可见的错误与最近活动后再决定是否要额外日志，不要把缓存状态当成主机实际状态。报错对照见 [troubleshooting.md](./troubleshooting.md)。

## 变更与清理

- `node rename` 只改变显示名。
- `node remove <nodeId>` 返回 `revoke.mode` 和 `orphanRisk`。直连节点若仍有远端配对，应在目标端用 `node pairings remove` 撤销。
- 代理节点若远端凭据缺失，普通删除会以 `CONTROL_PLANE_PROXY_CREDENTIAL_REQUIRED` 拒绝；`--force` 可以继续，但会遗留远端绑定，必须在 R 恢复后用 `proxy bindings remove` 手动撤销，否则留下无法管理的凭据。
- 删除前核对该节点的实例、环境模板、本地项目、模型引用和连接；不要用删除节点来测试连通性。
- 节点目录、运行环境、本地目录、镜像和 listener/relay 设置见 [resources.md](./resources.md)；节点更新见 [administration.md](./administration.md)。

所有写操作先说明目标与影响并取得用户确认，再在不会泄露秘密的前提下用 `--dry-run` 核对请求；`--yes` 只跳过本地交互，不绕过服务端 Web 审批。命令 flags 以当前 `thctl <leaf> --help` 为准，能力有无以当前 Control Plane 为准。
