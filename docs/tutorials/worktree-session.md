# 教程：用 Worktree 并行运行 AI

Git worktree 让多个 Codex/OpenCode 会话在同一仓库的独立目录和分支中工作，减少并行编辑冲突。

## 创建隔离会话

1. 打开已有 Git 会话的“环境 → 工作树”。
2. 选择“新建托管工作树 AI 会话”。
3. 输入新分支名称和起始引用。
4. 选择与原任务相同或不同的 Agent。
5. 填写清晰任务并创建。

TaskHandoff 会创建托管 worktree 和新 AI 会话。原会话仍停留在原工作目录。

## 分配任务

- Codex 适合使用项目 Codex 配置、上下文提及或多 Agent 的任务；
- OpenCode 适合使用其 Provider 与模型生态的任务；
- 不要让两个会话在同一个 worktree 同时修改相同文件；
- 每个分支保持单一清晰目标。

## 审查与合并

分别检查每个 worktree 的测试和变更并提交。TaskHandoff 可以安全 Push，但复杂合并、rebase 或分叉协调应在终端完成。

## 清理

关闭使用该 worktree 的 AI 和 App 会话，确保工作区干净且未锁定，然后选择“移除托管工作树”。系统使用非 force 删除目录并保留 Git 分支。

主工作树、外部 worktree、有未提交修改或仍被活跃会话占用的 worktree不能从界面删除。
