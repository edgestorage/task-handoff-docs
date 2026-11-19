# 远程访问

TaskHandoff 的远程访问包含三条需要分别规划的链路：用户设备访问 Control Plane、Control Plane 管理 Node Agent，以及 Thandoff 账号内的云平台节点中继。每条链路的入口、认证和信任边界都不同。

```text
浏览器 / 移动端 ── HTTPS / WSS ──> Control Plane
                                      ├── 本地 IPC / 反向 WSS / HTTPS ──> Node Agent
                                      ├── 可信 Control Plane 代理 ─────> Node Agent
                                      └── Thandoff 云中继 ────────────> 账号内 Node Agent
```

Node Agent 和受控实例不是用户入口。浏览器或移动端始终连接 Control Plane，由 Control Plane 根据节点的连接方式转发请求、事件流和 WebSocket。

## 本章内容

- [让 Control Plane 可远程访问](/zh/integrations/public-control-plane)：配置 DNS、HTTPS、认证、反向代理和公开访问地址。
- [连接远程节点](/zh/integrations/remote-nodes)：根据网络条件选择反向连接、HTTPS 直连或可信控制面代理。
- [通过 Thandoff 账户访问](/zh/integrations/thandoff-account)：绑定账户、启停后台中转，并处理撤销和身份冲突。

## 先选择目标

| 目标 | 推荐路径 | 需要开放的入口 |
| --- | --- | --- |
| 从浏览器或移动端访问 Control Plane | 公网 HTTPS 反向代理 | Control Plane 的 HTTPS/WSS |
| 不公开 Control Plane，但从移动端访问 | Thandoff 账户后台中转 | Control Plane 只需主动出站 |
| Control Plane 管理远程节点，节点能访问 Control Plane | Node Agent 反向 WSS | Control Plane 的 HTTPS/WSS |
| Control Plane 能访问 Node Agent | Node Agent HTTPS 直连 | Node Agent 的 HTTPS API |
| 双方都不能接受入站连接 | 可信控制面代理 | 两端均能访问代理 Control Plane |
| 双方都不能接受入站连接，且节点已绑定同一 Thandoff 账号 | 云平台节点中继 | 两端只需能出站访问 Thandoff 云 |

::: info 账号型节点中继
Node Agent 可以绑定到 Thandoff 账号，再由账号内其他 Control Plane 通过云中继使用。首次连接仍需在节点侧批准 Control Plane 信任；节点访问按所有者或共享授权管理，共享授权可能带过期时间。
:::

## 云端中继的信任边界

通过 Thandoff Cloud 建立的通道使用端到端加密。Relay 只转发密文帧与路由/计量标识，不持有工作区、AI 会话、文件、终端内容或端到端密钥；云端可处理账号、登录设备、连接时间、路由和流量等运行所需信息。

访问不能只凭云端账号权限完成。客户端还要验证 Control Plane 固定指纹和设备私钥签名，并由本地管理端批准连接。云端可以中断或延迟连接，但不能解密业务内容或替管理员批准设备。账号与绑定记录保存在单一主数据区域，Relay 数据面可以在其他区域就近转发流量。完整说明见[通过 Thandoff 账户访问](/zh/integrations/thandoff-account)。

## 共同安全原则

1. 所有公网入口使用受信任证书的 HTTPS/WSS，并启用 Control Plane 账号认证。
2. 不向普通用户暴露 Node Agent、受控实例地址或配对材料。
3. 一次性 Token 只用于建立长期配对，过期或消费后重新生成，不写入脚本仓库、工单和日志。
4. 只向必要来源开放防火墙端口；反向连接和账户中转不要求开放 Node Agent 入站端口。
5. 定期审查 Control Plane 登录会话、移动设备、Node Agent 配对和代理绑定。
6. 云平台节点首次连接或 Control Plane 身份变化时，在节点侧核对比较码后再批准信任；不要自动批准来源不明的连接。
