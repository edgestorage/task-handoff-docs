# AI 会话

AI 会话是在某个实例、固定工作目录中执行的一次 Agent 任务。TaskHandoff 当前主要支持 **Codex** 和 **OpenCode**；两者通过同一套会话界面运行，但模型协议和托管设置不同。

## 选择 Agent

| 场景 | 选择 |
| --- | --- |
| 需要 Codex 深度集成、多 Agent、文件上下文提及 | Codex（`openai-responses`） |
| 已有 OpenCode Provider 或需要兼容 Chat Completions 的模型 | OpenCode（`openai-chat-completions`） |

不要假设同一个模型名能同时用于两个 Agent。Codex 与 OpenCode 在同一工作区会看到彼此写入磁盘的修改；并行工作前应分配不同 worktree。

## 创建与读取

- 创建：`thctl ai-session create <instanceId> --prompt <text> --agent <agent> [--cwd-folder <id>] [--story <storyId>]`。工作目录创建后不会自动改变；要在另一个 worktree 工作，应新建会话。
- worktree 必须位于实例授权目录内。托管 worktree 由 TaskHandoff 创建，删除前要求它是非主工作树、无修改、未锁定，且没有活跃的 AI 或应用会话。
- 列表与详情：`ai-session list [--instance <id>] --json`、`ai-session show <instanceId> <sessionId> --json`。
- 读具体回合：`ai-session turns` → `ai-session turn` / `ai-session turn-timeline`；整体时间线用 `ai-session timeline`。优先读需要的回合，不要一次性拉全量历史。
- 部分读取支持 `--revision`，命中时返回 not-modified，可用于轮询。

## 写操作

- 发送消息：`ai-session send <instanceId> <sessionId> <message> --mode <auto|queue|steer|immediate>`。运行中发送的语义不同，先确认用户是要插话、排队还是立即发送。
- 中止与恢复：`ai-session interrupt` 终止当前回合，但**不会回滚**已经写入磁盘的修改；`ai-session resume` 恢复被挂起的会话。
- 会话级设置：`ai-session model <instanceId> <sessionId> --entity <...> --name <...>` 和 `ai-session reasoning <instanceId> <sessionId> --effort <none|minimal|low|medium|high|xhigh|max|ultra>` 只影响该会话的后续回合，不改变实例默认设置；某档是否可用取决于 Agent 和模型，以 `thctl schema` 与当前 CLI 为准。
- 其余：`rename`、`fork`（可指定 `--through-turn` 和 `--workspace`）、`close`、`read`、`ai-session queue list|steer|retry|remove|edit|reorder`。
- 幂等重放：`create`、`rename`、`fork`、`close`、`model`、`reasoning` 支持 `--request-id`。超时后用**同一个** request id 重发会被识别为同一次操作；省略时 CLI 会生成新 id，重发就等于新操作。
- 输入边界：`ai-session send` 只发送文本消息。附件、图片和文件上下文提及属于工作台界面能力，CLI 不提供；需要时请用户在前端操作，或把内容写入实例内的文件再让 Agent 读取。

## 权限与审批

权限模式从最小权限开始：不确定时用“询问”，只在可信、可恢复的隔离环境使用“完全访问”。当 Agent 发起审批请求时，`ai-session approval <instanceId> <sessionId> --decision <allow|deny|skip>` 的决定必须来自用户本人；不要自动放行高风险操作，也不要把用户的沉默当作同意。这里的审批是 **Agent 回合内的动作审批**，与服务端针对 `instance delete` 一类操作的 Web 审批不是一回事，见 [administration.md](./administration.md)。

## 核验

任务是否完成以实际文件和测试为准，不能只看 Agent 的文字回复。修改被中断或超时后，先读取当前状态再决定是否重发，避免重复执行非幂等操作；判断方法见 [troubleshooting.md](./troubleshooting.md)。
