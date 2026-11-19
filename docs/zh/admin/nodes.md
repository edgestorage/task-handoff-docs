# 节点管理

节点是运行 Node Agent 并实际管理实例的计算机。打开“设置 → 节点”查看节点状态、版本、能力和连接方式。

<figure class="doc-screenshot">
  <img src="/images/node-management-overview.png" alt="节点管理与节点详情界面">
  <figcaption>从节点列表进入详情，检查运行环境、实例、项目和连接状态。</figcaption>
</figure>

## 添加节点

添加向导会根据网络条件推荐连接路径：

| 场景 | 方式 |
| --- | --- |
| Control Plane 与 Node Agent 同机 | 本地 IPC，通常自动接入 |
| 远程节点能访问 Control Plane | 在远程节点运行带一次性 join token 的安装命令 |
| Control Plane 能访问公网 Node Agent | HTTPS 地址加一次性配对 Token |
| 双方都不能接受入站连接 | 可信控制面板代理或 Thandoff 云平台节点中继 |

公网 Node Agent 地址必须使用 HTTPS。一次性 Token 只用于建立信任，配对完成后不要长期保存。

安装或运行 Node Agent 的主机需要带 `systemd` 的 Linux。已有 Node.js 24.15+ 或 Bun 1.4.4+ 时可以复用；安装和更新仍需要 `npm`、`curl`。使用 Docker Runtime 时还需要可访问的 Docker daemon。

<div class="doc-screenshot-grid">
  <figure class="doc-screenshot">
    <img src="/images/node-direct-connection-form.png" alt="添加远程节点的直连表单">
    <figcaption>直连节点：填写 Node Agent 端点和一次性加入 Token。</figcaption>
  </figure>
  <figure class="doc-screenshot">
    <img src="/images/node-proxy-connection-form.png" alt="通过控制面代理添加远程节点的表单">
    <figcaption>控制面代理：核对可信 Origin 后再确认代理权限。</figcaption>
  </figure>
</div>

## 节点详情

节点详情分为：

- “概览”：在线状态、健康、连接路径、版本和最近活动；
- “运行环境”：Docker、Local Runtime 等能力及相关实例；
- “更新”：发布渠道、可用版本、更新任务和实例收敛；
- “项目”：节点允许使用的本地目录和默认配置；
- “清单”：系统、架构、Docker 镜像和应用能力；
- “连接”：TCP listener、远程接入、配对与诊断。

## 节点分组与快捷操作

实例侧栏按节点分组显示实例。节点标题的上下文菜单可以打开节点设置、重命名、复制节点 ID 或连接地址、检查连接，以及临时断开或恢复管理通道。

断开连接只停止当前 Control Plane 对该节点的管理和代理，不会停止 Node Agent、Docker 实例或节点上的其他连接。需要排障时可以先用“检查连接”获取权威在线状态，再决定是否断开。

## 本地目录

节点本地项目直接绑定宿主机路径。服务用户必须有目录访问权限。修改或删除目录登记不会替你备份宿主机内容，也不应把敏感系统目录开放为工作区根目录。

## TCP Listener

`127.0.0.1` 只允许本机访问；`0.0.0.0` 允许通过所有 IPv4 网卡访问。扩大监听范围前必须配置防火墙和 TLS。

运行中实例仍使用旧回调端口时，节点会拒绝端口变更。先停止相关实例，修改端口，再重新启动。

## 云平台节点与信任

节点可以绑定到 Thandoff 账号，供同一账号内的其他 Control Plane 通过云中继使用：

1. 在已管理节点的 Control Plane 中打开“云平台节点”，选择“添加到云平台”。
2. 在需要接入的 Control Plane 中选择“添加节点 → 使用云平台中转”。
3. 在节点侧核对比较码，批准新的 Control Plane 信任。

节点首次接受 Control Plane，或 Control Plane 公钥、访问上下文变化时，会产生“节点 Control Plane 信任”请求。可以在已管理该节点的 Control Plane 审批中心批准，也可以在目标节点运行：

```sh
task-handoff-node-agent trust list
task-handoff-node-agent trust approve <requestId> --comparison-code '<比较码>'
```

节点详情的“已信任控制面”会显示最近验证时间。当前 Control Plane 不能从同一个界面撤销自己的信任，需要在节点上使用 `task-handoff-node-agent trust`；其他 Control Plane 可以直接撤销。共享节点使用权可能过期，过期后不能再建立新连接。

## 模型中转服务

节点详情里的“模型中转服务”默认关闭。开启后，受管实例的模型请求由 Node Agent 代理，可以在不重启实例的情况下切换数据面；关闭后实例回退为直连。

- 开关只影响之后的新请求，可以随时关闭；
- 模型连接里的“模型映射”把客户端请求的模型名转发为上游模型名，只有开启模型中转服务后映射才参与请求解析；
- 节点需要先升级 Node Agent 才会显示这个开关。

## 重命名、断开与删除

重命名只改变控制面板中的显示名称。关闭连接不会自动停止 Node Agent 或实例。删除节点前先处理其实例、模板、本地项目和模型引用，避免留下不可管理资源。

## 诊断

节点显示离线或降级时，先查看连接诊断和最后错误，再检查服务、DNS、证书、防火墙与代理。

- 反向连接和直连：查看当前 RTT、近期 P95、连续重连次数和下次重试时间；
- 云平台节点：查看通道是否连接、最近中转错误、账号访问和节点信任状态；
- 可信代理：分别检查当前面板到代理、代理到目标的路径。

不要因控制面板显示缓存状态就直接删除节点或实例。完整连接流程见[连接远程节点](/zh/integrations/remote-nodes)。
