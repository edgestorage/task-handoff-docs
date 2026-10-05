# TaskHandoff 实例

实例是在某个节点上运行的工作环境，绑定一个工作区、一种运行时和一组模型。AI 会话、应用和终端都发生在实例内部。节点离线时控制面板可能仍在显示缓存的实例状态，不能据此判断实例真实健康状况。

## 创建前必须确定的事

| 维度 | 选择 | 关键约束 |
| --- | --- | --- |
| 工作区 | 仓库（Git 项目）或节点本地文件夹 | 本地文件夹直接绑定宿主机路径，只有该节点能创建；私有仓库按需选择托管凭据。 |
| 节点 | 负责运行的节点 | 决定可用运行时、本地目录和模型副本；节点必须在线。 |
| 运行时 | Docker Runtime 或 Local Runtime | Docker 适合多实例和隔离；Local 直接用宿主机工具，同一宿主用户只能运行一个本地实例。 |
| 模型 | Codex 用 `openai-responses`，OpenCode 用 `openai-chat-completions` | 不要假设同一个模型名同时适配两个 Agent；创建前先用模型发现和测试验证端点。 |

实例名称只是显示名，不能替代 ID。不要根据名称猜测 `instanceId`，一律从 `thctl instance list --json` / `instance show <instanceId> --json` 的真实返回中取。

## 创建

`thctl instance create --config <file>`，请求体是服务端 wire body；写入字段先用 `thctl schema instance create --format json` 核对，不要凭印象拼字段。`--name`、`--node` 可覆盖请求体，`--start` 才会启动（服务端默认不启动）。创建前用 `--dry-run` 检查非敏感请求。

创建过程会检查目标节点的 Docker daemon 和镜像就绪状态，并在实例上保存镜像快照与 digest，因此市场 tag 后续变化不会改变已有实例的环境事实。

`instance create` 不支持 `--request-id`，网络超时或连接中断后不要直接重发：先用 `instance list --json` 查看是否已经创建，再和用户确认重试还是删除半成品。

## 日常操作

- `instance start` / `stop` / `restart` / `rename`：进程生命周期与显示名。停止不等于删除数据。
- `instance show --json`：建议优先看权威投影里的状态、节点、运行时、工作区和连接信息，而不是仅凭列表行。
- 状态语义：已创建、准备中、启动中/注册中、运行中、已停止、不健康/失败。失败时先查运行环境、节点连接和错误详情，再重试。

## 实例设置

- 模型修改不会立即重启实例，在下次启动或重启后生效；已删除、停用或属于其他 Agent/节点的旧选择会显示为不可用，应明确替换。
- 附件保留天数调小可能立即删除已过期附件；消息元数据可能仍保留。修改前确认仍需使用的文件。
- Codex 有独立的托管选项（输出详细程度、沟通风格、默认思考程度、Codex Home、多 Agent 等）；OpenCode 使用自身配置，两者字段不通用。
- Git 凭据授权在 Node Agent 上生效，不要求实例在线。

## 删除

`thctl instance delete <instanceId> --yes` 不可逆；`--volumes` 会同时永久删除 `/data`、`/home/agent` 和 Git 工作区。不删除数据时，返回的保留 volume 名称必须立即记录，系统不会自动把它们挂载到未来实例。删除前确认代码已提交或有独立备份。

删除还需要授权用户在 Control Plane 上通过 Web 审批（`--yes` 不能替代，见 [administration.md](./administration.md)）；超时或断开时先核验实例是否仍然存在，再决定是否重新发起。

环境模板由 Docker 实例保存而来，捕获容器可写层，但**不含**工作区、数据卷、进程或网络状态，不能当作数据备份。模板与所属节点和镜像绑定，只有节点在线且镜像存在时才能使用。
