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
| 双方都不能接受入站连接 | 通过可信控制面板代理或受支持中继 |

公网 Node Agent 地址必须使用 HTTPS。一次性 Token 只用于建立信任，配对完成后不要长期保存。

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

## 本地目录

节点本地项目直接绑定宿主机路径。服务用户必须有目录访问权限。修改或删除目录登记不会替你备份宿主机内容，也不应把敏感系统目录开放为工作区根目录。

## TCP Listener

`127.0.0.1` 只允许本机访问；`0.0.0.0` 允许通过所有 IPv4 网卡访问。扩大监听范围前必须配置防火墙和 TLS。

运行中实例仍使用旧回调端口时，节点会拒绝端口变更。先停止相关实例，修改端口，再重新启动。

## 重命名、断开与删除

重命名只改变控制面板中的显示名称。关闭连接不会自动停止 Node Agent 或实例。删除节点前先处理其实例、模板、本地项目和模型引用，避免留下不可管理资源。

## 诊断

节点显示离线或降级时，先查看连接诊断和最后错误，再检查服务、DNS、证书、防火墙与代理。不要因控制面板显示缓存状态就直接删除节点或实例。
