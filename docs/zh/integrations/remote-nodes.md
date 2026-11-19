# 连接远程节点

打开“设置 → 节点 → 添加节点”，向导会先检查 Control Plane 的公网可达性，再询问目标机器的网络和安装状态。选择连接方式的核心原则是：让能够主动出站的一方发起连接，尽量减少公网入站端口。

## 方式对比

| 方式 | 发起方 | 适合场景 | 公网要求 |
| --- | --- | --- | --- |
| 反向 WSS | Node Agent | 远程节点能访问 Control Plane | 只公开 Control Plane |
| HTTPS 直连 | Control Plane | Control Plane 能访问 Node Agent | 公开 Node Agent HTTPS API |
| 可信控制面代理 | 当前 Control Plane | 目标已由另一台可达 Control Plane 管理 | 当前面板能访问代理面板 |
| 云平台节点中继 | 账号内 Control Plane / Node Agent | 双方都不能入站，且节点已绑定同一 Thandoff 账号 | 两端只需出站访问 Thandoff 云 |

反向 WSS 通常是首选。它不要求给 Node Agent 配置公网监听、NAT 和 TLS，而且 Node Agent 会持久化连接并在服务重启后自动重连。

## 反向连接到 Control Plane

### 新机器尚未安装 Node Agent

1. 确认 [Control Plane 公网地址](/zh/integrations/public-control-plane) 可由目标机器访问。
2. 在“添加节点”中选择“远程节点可以访问此控制面板”和“尚未安装”。
3. 向导生成一次性加入 Token 和完整安装命令。
4. 在目标 Debian 或 Ubuntu 主机上运行该命令。
5. 保持向导打开，等待节点显示“已连接”。

安装命令的结构如下，实际 URL、Token 和版本应使用界面生成的值：

```sh
curl -fsSL 'https://control.example.com/install-node-agent.sh' | sudo sh -s -- \
  --control-plane 'https://control.example.com' \
  --join-token '一次性加入_TOKEN' \
  --npm-package @task-handoff/node-agent \
  --controlled-instance-package @task-handoff/controlled-instance \
  --version '目标版本'
```

安装器会创建并启动 `task-handoff-node-agent.service`，完成配对，保存专用连接凭据，并建立反向 WebSocket。目标机无需预先安装 Node.js 或 npm；受支持的安装器会准备所需运行环境。

### 已经安装 Node Agent

向导生成 Token 后，可以在目标机器运行：

```sh
sudo task-handoff-node-agent connect \
  --control-plane 'https://control.example.com' \
  --join-token '一次性加入_TOKEN'
```

如果目标 Node Agent 已由另一台 Control Plane 管理，也可以在那台面板的“节点 → 连接”中选择“添加主动连接”，填写新 Control Plane URL 和加入 Token。

加入 Token 有有效期且只用于首次配对。向导显示已过期时，选择“重新生成邀请”，不要重复使用旧 Token。配对后的反向连接使用单独凭据，不依赖 Token 保持在线。

## 直接连接公网 Node Agent

只有 Control Plane 无法被目标节点访问、但能够访问 Node Agent 时，才需要直接连接。

1. 在 Node Agent 所在主机把 TCP listener 从 `127.0.0.1` 调整为所需网卡。界面中的“所有 IPv4 接口”对应 `0.0.0.0`。
2. 配置防火墙、DNS、NAT 和 TLS 终止，使 Control Plane 能访问 Node Agent 的 HTTPS 地址。
3. 在来源 Control Plane 的节点详情中生成配对 Token；独立 Node Agent 也可在目标主机运行以下命令：

```sh
sudo task-handoff-node-agent invite \
  --ipc-path /run/task-handoff/node-agent.sock
```

4. 在新 Control Plane 的添加向导中填写 Node Agent HTTPS 地址和一次性配对 Token。
5. 连接后检查节点 ID、连接方式和健康状态是否符合预期。

公网 Node Agent 地址必须使用 HTTPS。把 listener 改为 `0.0.0.0` 只会扩大监听范围，不会自动配置 TLS、防火墙或认证。运行中实例仍使用旧回调端口时，系统会拒绝端口变更；应先停止相关实例，修改端口后再启动。已配置的直连 Control Plane 也需要手动更新端点。

## 通过 Thandoff 账号中继

账号型节点中继适合 Control Plane 和 Node Agent 都不能接受入站连接的场景。Node Agent 先绑定到 Thandoff 账号，账号内的其他 Control Plane 再通过云中继使用它。

前提条件：

- 当前 Control Plane 已登录并绑定 Thandoff 账号；
- 目标 Node Agent 在线，并已添加到同一账号；
- Node Agent 已批准当前 Control Plane 的信任请求。

### 连接账号中的已有节点

1. 在已管理目标节点的 Control Plane 中打开节点详情。
2. 进入“云平台节点”，选择“添加到云平台”。这一步不会改变节点与当前 Control Plane 的连接。
3. 在需要接入的 Control Plane 中选择“添加节点 → 使用云平台中转”。
4. 从账号节点列表选择目标节点，开始连接。
5. 在节点侧核对比较码并批准 Control Plane 信任。
6. 返回向导，确认云平台通道和管理通道都已连接。

### 添加新的 Node Agent

1. 在目标 Control Plane 的添加节点向导中选择“添加新的 Node Agent”。
2. 选择“新机器，安装并绑定”或“已安装，仅绑定”。
3. 复制一次性命令，在目标主机执行。
4. 按界面提示在目标节点或已管理的 Control Plane 中批准信任。
5. 保持向导打开，等待节点通道建立。

一次性绑定命令只显示一次，并会在过期后失效。节点安装、版本切换和实例生命周期仍由 Node Agent 管理，云中继只负责连接路径。

### 信任、共享与解绑

节点首次接受某个 Control Plane，或 Control Plane 公钥、访问上下文发生变化时，会产生“节点 Control Plane 信任”请求。可以在已管理该节点的 Control Plane 审批中心核对比较码后批准，也可以在目标节点运行：

```sh
task-handoff-node-agent trust list
task-handoff-node-agent trust approve <requestId> --comparison-code '<比较码>'
```

节点详情会列出已信任的 Control Plane 和最近验证时间。当前 Control Plane 不能从同一个界面撤销自己的信任，需要在节点上使用 `task-handoff-node-agent trust` 命令；其他 Control Plane 的信任可以直接撤销。

账号中的共享节点使用权可能带过期时间。过期或被撤销后，依赖该授权的 Control Plane 不能继续建立新连接。把节点从账号解绑不会自动停止节点、实例或当前 Control Plane 的其他连接。

## 通过可信 Control Plane 代理

假设当前 Control Plane 为 A，已经管理目标节点 B 的 Control Plane 为 R：

1. 在 R 中打开 B 的“连接 → 可信控制面代理”，创建绑定到 B 的一次性邀请。
2. 在 A 的添加节点向导中选择“双方都不能从公网访问 → 使用可信控制面板”。
3. 填写 R 的规范 HTTPS Origin 和代理邀请 Token。
4. 阅读并勾选信任确认，然后建立连接。
5. 在 A 查看代理路径、绑定状态、目标状态和观测时间。

R 可以读取、修改并代表 A 执行全部被代理的 Node Agent 操作。这不是端到端加密路径，只能选择同一可信管理边界内的 Control Plane。Origin 必须是没有用户信息、路径、query 或 fragment 的 HTTPS Origin。

代理绑定固定指向邀请时选择的节点，不能在请求中切换目标。禁用 A 上的代理节点只会停止 A 发起操作，不会删除 R 上的绑定；正常删除会先请求 R 撤销绑定。R 不可达时强制删除可能遗留远端凭据，恢复后必须在 R 手动撤销。

## 状态与排障

| 状态或现象 | 含义与处理 |
| --- | --- |
| `连接中` / `握手中` | 等待建立传输；检查发起方日志、URL、DNS 和证书 |
| `重连中` | 已配置连接暂时中断；检查网络和远端服务，不必重新配对 |
| 节点在线但实例离线 | 节点传输正常，应继续检查实例进程和运行环境 |
| 代理可达但目标离线 | A 到 R 正常，R 当前无法获得 B 的在线状态 |
| 云平台节点等待通道 | 检查账号绑定、节点是否在线、Node Agent 的云中继状态和最近中转错误 |
| 等待节点批准信任 | 在节点侧核对比较码后批准；拒绝或过期后可重新申请 |
| 账号节点不可见或共享已过期 | 检查是否登录同一账号、节点是否已添加到账号、共享授权是否仍然有效 |
| 邀请过期或无效 | 重新生成一次性 Token，确认没有在其他请求中被消费 |
| 端口变更失败 | 停止仍引用旧回调端口的运行中实例后重试 |

关闭或重启 Control Plane 不应停止远程 Node Agent 管理的实例。排障时先保留节点记录和配对关系，查看“节点 → 概览/连接”中的最后错误与诊断，避免通过删除节点来测试连通性。
