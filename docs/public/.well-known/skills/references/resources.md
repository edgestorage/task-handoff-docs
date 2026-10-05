# 全局资源与凭据

全局设置中的资源库决定创建实例时能选什么，各有不同所有者和生命周期。先用 `thctl ... list --json` 查询现实存在的条目，再决定新建或复用。

## 模型

- 模型连接可以属于 Control Plane，也可以只保存在某个节点（`model node ...`）。
- 协议与 Agent 对应：`openai-responses` 用于 Codex，`openai-chat-completions` 用于 OpenCode，`anthropic-messages` 用于兼容 Claude 的配置。
- 保存前用 `model discover` 和 `model test`（节点范围用 `model node discover|test`）验证端点、凭据和延迟。
- 停用模型后不能用于新选择，已有引用保留为待处理状态。API Key 属于敏感信息，只写入、不回显，不能出现在命令参数、文档或提示词中。
- 其他入口：`model create|show|copy|reorder|update|sync|merge|remove`。

## 镜像与环境模板

- 镜像市场（`market catalog|refresh`）是只读目录；自定义镜像（`image ...`）由管理员维护，必须是规范 OCI 引用。
- 创建实例时会保存镜像快照和最终 digest，市场 tag 变化不会悄悄改变已有实例的环境。
- 环境模板（`env-template ...`）由节点从 Docker 实例创建并绑定该节点，只捕获容器可写层，不含工作区、数据卷、进程或网络状态。
- 删除记录不会自动删除节点上的 Docker layer；被项目、节点目录默认值或实例引用时会被阻止。

## 项目与工作区来源

- Git 项目（`project ...`）保存仓库 URL、名称、可选默认镜像和凭据引用，是仓库内容的索引而非副本。
- 节点本地项目绑定宿主机目录，只能在该节点创建实例；目录权限决定隔离程度，不要开放敏感系统目录。
- 项目被实例或默认配置引用时删除会被阻止，先处理引用。

## Git 凭据

- 凭据范围由协议、主机、可选非默认端口和区分大小写的仓库路径前缀组成；不支持通配符。多条匹配时选择路径前缀最长且唯一的一条，同等优先级会报冲突而不是依次试探。
- HTTPS Token 只在当前 Git credential-helper 请求中短暂提供，不写入 remote URL、命令参数或环境变量。建议使用专用、最小权限、可轮换的 Token。
- SSH 私钥保留在 Node Agent，必须提供固定 `known_hosts`；系统不会首次连接自动信任。
- 默认只在首次 clone 授权；启用“在此实例中保留”后，实例内同一用户下的 Agent、终端、应用和仓库操作都能使用匹配凭据，这是实例级信任决定，只对可信实例开启。
- 编辑凭据时填写新 Secret 表示轮换，留空表示保留当前值。撤销授权在 Node Agent 生效，不依赖实例在线；仍被引用的凭据不能删除。
- 入口：`git-credential list|show|create|update|remove`、`git-credential assignments list|assign|unassign`。

## 节点运行环境与目录

- 运行环境：`node runtimes list|create|update|remove|check`。
- 本地目录登记：`node folders list|tree|add|update|remove`。登记或删除不会备份宿主机内容。
- 镜像与能力：`node docker images`、`node image-options`。
- 连接与中继设置：`node settings external-listener show|set`（`127.0.0.1` 仅本机，`0.0.0.0` 需配合防火墙和 TLS；运行中实例仍占用旧回调端口时会拒绝变更）、`node settings model-relay show|set`。

## 安全边界

凭据 scope 用于避免误选，不是抵御实例内恶意进程的隔离边界。认证失败后系统只显示安全分类；修正后需要显式重试原操作，TaskHandoff 不会自动重放失败的 Push 或 Publish。
