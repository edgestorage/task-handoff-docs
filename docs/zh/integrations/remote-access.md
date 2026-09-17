# 远程访问

TaskHandoff 的远程访问包含两条彼此独立的链路：用户设备访问 Control Plane，以及 Control Plane 管理其他网络中的 Node Agent。规划网络时，应分别判断这两条链路的入口、认证和信任边界。

```text
浏览器 / 移动端 ── HTTPS / WSS ──> Control Plane
                                      │
                                      ├── 本地 IPC ──> 本机 Node Agent
                                      ├── 反向 WSS <── 远程 Node Agent
                                      ├── HTTPS ─────> 公网 Node Agent
                                      └── HTTPS / WSS ─> 可信 Control Plane ─> Node Agent
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

::: warning 当前能力边界
Thandoff 账户可以中转客户端到 Control Plane 的访问，但当前协议尚不支持“账号型 Node Agent 中继”。双方都不能接受入站连接的节点，应使用可信控制面代理。
:::

## 共同安全原则

1. 所有公网入口使用受信任证书的 HTTPS/WSS，并启用 Control Plane 账号认证。
2. 不向普通用户暴露 Node Agent、受控实例地址或配对材料。
3. 一次性 Token 只用于建立长期配对，过期或消费后重新生成，不写入脚本仓库、工单和日志。
4. 只向必要来源开放防火墙端口；反向连接和账户中转不要求开放 Node Agent 入站端口。
5. 定期审查 Control Plane 登录会话、移动设备、Node Agent 配对和代理绑定。
