# 认识 Story

Story 是 TaskHandoff 中组织长期工作的核心单元。一个 Story 可以集中保存相关文档、Codex/OpenCode 会话、预设动作和自动化计划，适合需求开发、故障调查、专题研究或持续维护。

## Story 包含什么

| 内容 | 用途 |
| --- | --- |
| 文档 | 保存需求、背景、计划、结论和交付记录 |
| AI 会话 | 汇总参与该目标的 Codex 与 OpenCode 会话 |
| 预设动作 | 保存可重复使用的 Agent、实例、权限和提示词配置 |
| 自动化 | 按间隔或指定时间运行预设动作 |

## 创建 Story

1. 打开顶部导航中的“Story”。
2. 选择“新建 Story”。
3. 填写标题和可选说明。
4. 选择所属节点。
5. 设置最多保留的空闲 AI Session 数量并保存。

所属节点决定 Story 文件的保存位置，以及可以直接关联的实例和会话。创建前应选择长期可用的节点。

<figure class="doc-screenshot">
  <img src="/images/story-node-filter.png" alt="Story 列表中的所属节点筛选器">
  <figcaption>按所属节点筛选 Story，便于管理分布在不同节点上的工作。</figcaption>
</figure>

## 关联 AI 会话

可以在 Story 内新建会话，也可以加入所属节点上尚未分配的现有会话。新建会话时可选择 Codex 或 OpenCode、目标实例、工作目录、模型和权限模式。

Story 中同时显示当前会话和已关闭的历史会话。关闭 Story 的全部会话会停止其中仍在运行的工作，确认前应检查活跃任务。

<figure class="doc-screenshot">
  <img src="/images/story-session-compact-view.png" alt="Story 中关联的 AI 会话简洁视图">
  <figcaption>Story 将目标资料与关联的 Codex、OpenCode 会话放在同一工作区。</figcaption>
</figure>

## 生命周期

归档适合已经完成但仍需查阅的 Story。归档后应避免继续添加文档或自动化；需要再次工作时先恢复。

删除 Story 会同时删除它的文件目录，属于不可撤销操作。重要文档和结果应提前进入项目仓库或独立备份。

## 继续阅读

- [Story 文档](./documents)
- [预设动作](./actions)
- [Story 自动化](./schedules)
