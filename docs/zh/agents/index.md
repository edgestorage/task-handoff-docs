# Codex 与 OpenCode

TaskHandoff 当前主要支持两个 AI Agent：**Codex** 和 **OpenCode**。两者都通过统一的 AI 会话界面运行，可以创建会话、发送任务、查看实时输出、处理权限请求、停止任务和管理历史。

::: tip 推荐定位
需要深度 Codex 集成、多 Agent 和上下文提及时优先选择 Codex；需要使用 OpenCode 生态及兼容 Chat Completions 的模型时选择 OpenCode。
:::

## 能力对比

| 能力 | Codex | OpenCode |
| --- | --- | --- |
| 主要模型协议 | OpenAI Responses | OpenAI Chat Completions |
| 会话创建与发现 | 支持 | 支持 |
| 实时文本、推理和工具活动 | 支持 | 支持 |
| 权限询问与响应 | 支持 | 支持 |
| 会话停止、关闭和 fork | 支持 | 支持 |
| 模型与思考程度选择 | 支持 | 支持，映射为模型变体 |
| 文件上下文提及 | 重点支持 | 当前不作为主要能力 |
| 托管 Agent 默认设置 | 输出风格、个性、多 Agent 等 | 主要使用 OpenCode 自身配置与会话选项 |

Claude 相关兼容入口可能仍会出现在部分镜像或已有配置中，但本手册的主要流程、示例和验收以 Codex 与 OpenCode 为准。

<figure class="doc-screenshot">
  <img src="/images/ai-session-agent-selector.png" alt="新建会话时选择 Codex 或 OpenCode">
  <figcaption>TaskHandoff 在同一入口中提供 Codex 与 OpenCode。</figcaption>
</figure>

## 配置 Codex

1. 打开“设置 → 模型”，添加模型连接。
2. 选择应用“Codex”。
3. 选择 `openai-responses` 协议。
4. 填写 Endpoint、API Key 和模型名称。
5. 测试成功后保存，并在实例创建或“实例设置 → 模型”中分配。

“实例设置 → AI → Codex”还可以配置输出详细程度、沟通风格、默认思考程度、Codex Home，以及是否允许多 Agent。设置只影响新会话和新建子 Agent。

<figure class="doc-screenshot">
  <img src="/images/ai-session-model-reasoning.png" alt="选择模型和思考程度的菜单">
  <figcaption>会话中的模型、Provider 与思考程度选择。</figcaption>
</figure>

## 配置 OpenCode

1. 在“设置 → 模型”新增连接并选择“OpenCode”。
2. 使用 `openai-chat-completions` 协议。
3. 填写兼容端点、API Key 和一个或多个模型名称。
4. 测试连接并保存。
5. 在目标实例中选择 OpenCode 模型，然后重启实例使模型分配生效。

创建 OpenCode 会话时可以选择模型和思考程度。会话运行期间不能切换模型或思考程度；应等待当前轮次结束后再调整。

## 选择 Agent

- 项目已有 `AGENTS.md`、Codex Skills 或依赖 Codex app-server：选择 Codex；
- 团队已有 OpenCode Provider 和模型习惯：选择 OpenCode；
- 需要使用 TaskHandoff 多 Agent 设置：选择 Codex；
- 需要统一监管两种 Agent：可以在同一实例中分别创建会话。

Agent 使用同一个工作区时会看到彼此写入磁盘的修改。并行工作前应分配不同 worktree，避免同时编辑相同文件。
