# 移动端

TaskHandoff Mobile 可在 iOS 和 Android 上连接用户管理的 Control Plane。它只连接 Control Plane，不直接连接 Node Agent 或受控实例端点。

## 演示

<figure class="doc-screenshot doc-video">
  <video controls playsinline preload="metadata" poster="/media/mobile/mobile-demo-poster.jpg" width="720" height="1566" aria-label="TaskHandoff 移动端演示">
    <source src="/media/mobile/mobile-demo.mp4" type="video/mp4">
    你的浏览器不支持 HTML5 视频，可<a href="/media/mobile/mobile-demo.mp4">下载演示视频</a>。
  </video>
  <figcaption>在移动端从 AI 会话启动应用，并在内置浏览器中查看预览。</figcaption>
</figure>

## 连接 Control Plane

直接连接需要稳定的 HTTPS Origin，例如 `https://control.example.com`。地址不能包含路径、query、内嵌凭据或重定向，反向代理必须支持 `/api/events` WebSocket 和附件上传。

添加时核对 Control Plane ID 和签名密钥指纹，再输入账号密码。指纹变化会阻止已有配置继续连接，需要管理员确认原因。

移动端也可以通过已连接的 Thandoff 账户发现 Control Plane。切换云账号会移除该账号拥有的中继配置，但保留手动添加的直接连接。

## 主要功能

- AI Session Inbox、创建、历史与恢复；
- Codex 和 OpenCode 会话、消息、审批、停止和队列操作；
- 跨来源审批中心：AI 会话、Story 决策、操作审批、设备信任和节点 Control Plane 信任；
- Markdown、代码、子 Agent、图片与文件附件；
- 新建会话时选择已有分支或创建独立 worktree，并查看、同步实例的工作树；
- 会话内资源面板：文件、变更、Worktree、实例应用和浏览器；
- 节点与实例目录，实例启动、停止、重启和镜像重试；
- App Session、终端、浏览器和远程桌面；
- Story、预设动作和自动化；
- 触发器创建、编辑、部署与最近运行；
- Thandoff 账号安全设置、关于和开源许可。

## 审批中心

存在待审批事项时，移动端会显示可拖动的审批入口，并标出待处理数量。展开后可以查看来源、上下文和过期时间，再批准、拒绝、回答或提交决策。

审批中心汇总：

- AI 会话审批；
- Story 决策；
- 删除实例、更新节点、修改外部监听、调整用户权限或角色、分配 Git 凭据等操作审批；
- 设备信任；
- 节点 Control Plane 信任。

入口可以拖到屏幕边缘隐藏，需要时再拉回。部分来源暂时不可用时，已加载的其他审批仍可处理，也可以单独重试失败来源。

离线时不能提交决策。提交后如果连接中断，界面会显示“结果未知”；不要立即重复点击，先刷新来源确认请求是否仍然待处理。批准只对当前这一条请求生效。

## 会话资源

打开 AI 会话后，可以从资源菜单查看文件、变更和 Worktree，也可以并行打开实例应用、浏览器或远程桌面。

- 宽屏会并排显示会话和资源，窄屏以覆盖层展开；
- 资源列表按会话保存，切换会话不会把文件或应用误带到另一个任务；
- 文件和变更视图是带 revision 的只读快照，需要最新内容时主动刷新；
- 关闭资源标签只影响当前界面，不会停止实例中的进程。

## 远程桌面

实例安装并启用远程桌面组件后，可以从 AI 会话资源菜单打开独立远程桌面，或从已保存的会话卡片查看预览。

例如在 macOS 实例中打开 Xcode 的 iPhone 模拟器后，AI 会话里会出现以模拟器窗口命名的远程桌面卡片，并显示来源（如 Device Hub）。卡片是只读预览，点击后进入完整视图再操作。

<figure class="doc-screenshot doc-phone">
  <img src="/media/mobile/mobile-remote-desktop-zh.png" width="720" height="1565" alt="移动端 AI 会话中的 iPhone 模拟器远程桌面预览">
  <figcaption>远程桌面卡片显示设备窗口和来源；点击进入完整视图后再启用操作。</figcaption>
</figure>

- 首次打开需要选择整桌面、单个窗口、应用或宿主支持的其他画面；
- 会话中的卡片和浮动预览是只读的，点击后进入完整远程桌面再启用输入；
- 支持直接触摸、触控板鼠标、系统键盘、内置虚拟键盘和文本剪贴板；
- 多位查看者可以同时观看，但同一时间只有一位控制输入；
- 连接信息可查看路径、延迟、接收码率、编码和查看者数量。

远程桌面需要 HTTPS、`localhost` 或管理员批准的局域网地址；macOS 宿主还需要屏幕录制和辅助功能权限。完整说明见[远程桌面](/zh/workspace/remote-desktop)。

## 设备信任

首次连接、Control Plane 角色变化、共享授权过期或设备信任被撤销时，移动端可能进入“等待审批”状态。保持 App 打开，管理员批准后会自动恢复连接。

请求会显示 Control Plane、设备、比较码和过期时间。管理员可以在审批中心核对比较码和指纹；不要把比较码当作密码转发给无关人员。

## 云账号与安全

在 Thandoff 账号设置中可以：

- 查看并撤销已登录设备；
- 启用或管理两步验证；
- 在敏感操作前完成最近身份验证；
- 安排删除账号，并立即撤销会话和中继访问；
- 退出账号。退出会移除该账号添加的云端 Control Plane，手动添加的连接会保留。

“关于”页显示版本、使用文档、服务状态、隐私政策、用户协议和开源许可。详细的账号安全说明见[Thandoff 账户](/zh/integrations/thandoff-account)。

## 不提供的管理功能

移动端不负责实例创建/删除、完整节点生命周期、应用安装、模型 Provider、镜像、环境模板或全部系统设置。审批准入类和操作类请求不等于提供了完整管理入口；这些配置仍应在 Web 或桌面端完成。

## 网络中断与“结果未知”

发送消息、审批、停止或队列操作提交后断网，客户端会标记结果未知且不会自动重试。等待重新获取会话快照，再决定是否操作。新建会话使用稳定请求 ID，可安全收敛到同一个会话。

## 丢失设备

在 Web/桌面端打开“设置 → 移动设备”，撤销该设备会话。普通丢失设备不需要轮换 Control Plane 身份；只有签名身份实际泄露时才执行身份轮换。

设备密码和系统锁仍是必要保护。移动端凭据使用设备安全存储，但不能替代远程撤销。
