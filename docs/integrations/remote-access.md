# 远程访问

远程访问包括用户从外部访问 Control Plane，以及 Control Plane 跨网络连接 Node Agent。两者不要混为同一个端口暴露问题。

## 暴露 Control Plane

为 Web、移动端和聊天链接提供稳定 DNS 与受信任 HTTPS 证书。反向代理需要支持普通 API 请求、附件大小和 `/api/events` WebSocket 升级。

不要把 Node Agent 或受控实例地址当作 Control Plane 地址公开给用户。

## 连接远程节点

优先让远程 Node Agent 主动连接 Control Plane，并使用界面生成的一次性 join token。若由 Control Plane 连接公网 Node Agent，必须使用 HTTPS 和 Node Agent 签发的一次性配对 Token。

双方都不能接受入站连接时，可以选择可信控制面板代理或受支持的账户中继。代理路径仍保留目标节点的权威身份和权限检查。

## Thandoff 账户

“设置 → Thandoff 账户”可以把当前 Control Plane 绑定到唯一账户，并启用后台远程中转。连接时核对 Control Plane ID、身份指纹和一次性授权码。

关闭浏览器不会停止后台中转。关闭远程访问会保留账户绑定；断开账户会同时撤销绑定和远程能力。

## 身份冲突

复制 Control Plane 数据目录可能造成两个安装使用同一身份。系统检测到 clone conflict 时会隔离远程访问。不要强行重新启用，应先确定哪一个安装保留原身份，再为副本建立新身份。

## 安全检查

- Control Plane 必须启用账号认证；
- 公网地址只使用 HTTPS/WSS；
- Node Agent 不直接暴露给普通用户；
- 防火墙只开放必要来源和端口；
- 配对 Token 与授权码使用后立即作废；
- 定期审查账户连接、移动设备和登录会话。
