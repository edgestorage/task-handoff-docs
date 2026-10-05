# Story：长期工作单元

Story 把围绕同一个目标的文档、AI 会话、预设动作和自动化集中在一起。它属于某个节点，所属节点决定文件保存位置以及可以直接关联的实例和会话，因此创建时应选择长期可用的节点。

## 创建与管理

- 创建：`thctl story create <title> [--node <nodeId>] [--description <text>] [--max-idle-ai-sessions <count>]`。省略 `--node` 时由服务端从目录解析，跨节点环境应显式指定。
- 查询：`story list --json`、`story show <storyId> --json`。列表会返回 `unavailableNodeIds`，表示部分节点当前不可达，此时不要假设 Story 不存在。
- 元数据：`story update`；归档用 `story archive`，恢复到工作状态用 `story restore`。

## 文档

`story document update|remove|reorder` 维护 Story 内的文档（需求、背景、计划、结论、交付记录）。文档正文通常较大，按当前 CLI / 服务端支持的输入方式写入，先用 `thctl schema story document update --format json` 确认字段。

## 预设动作

预设动作保存一套可重复的 AI 会话配置和提示词模板：标题与提示词、目标实例、Agent、模型与思考程度、权限模式、工作目录、Git 模式（当前目录或 worktree）、消息发送模式。也可以从已验证的会话“保存为预设动作”。

运行时会在目标实例上创建新的 AI 会话，因此必须检查目标实例是否在线、Agent 与工作目录是否匹配。Story 所属节点没有可用实例时动作不能运行；修改或删除目标实例后要同步更新相关动作。

**权限会被复用**：保存“完全访问”意味着以后每次运行都获得同样权限。固定自动化应使用最小权限，高风险操作保持询问。提示词模板要写清输入来源、输出位置、禁止事项和验收标准，不要包含一次性 Secret，也不要依赖历史会话里的上下文。

## 生命周期

归档适合已完成但仍需查阅的 Story；归档后不应继续添加文档或自动化，需要继续工作时先恢复。`story remove` 会同时删除 Story 的文件目录且不可恢复，删除前确认内容已进入项目仓库或有独立备份。
