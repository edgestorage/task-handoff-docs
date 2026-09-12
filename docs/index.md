# TaskHandoff 用户手册

TaskHandoff 用于集中管理本机和远程节点上的 AI 工作空间、实例、会话及自动化任务。

::: info 主要支持的 AI Agent
TaskHandoff 当前主要支持 **Codex** 和 **OpenCode**。两者均可通过统一的会话界面创建、监管和恢复任务，详细差异见 [Codex 与 OpenCode](/agents/)。
:::

会话默认采用 TaskHandoff 特色的[简洁模式](/sessions/#简洁模式与对话模式)，聚焦当前任务回合，大幅减少完整历史消息带来的阅读干扰；需要追溯全过程时可随时切换到对话模式。

## 从这里开始

第一次使用时，请依次完成：

1. [认识 TaskHandoff](/guide/)，了解控制面板、节点、实例和 AI 会话之间的关系。
2. [安装 TaskHandoff 并登录](/guide/install)。
3. [接入节点并配置模型](/guide/first-setup)。
4. [配置 Codex 或 OpenCode](/agents/)。
5. [创建第一个实例](/instances/)。
6. [启动 AI 会话](/sessions/)。

::: tip 使用范围
本手册面向 TaskHandoff 控制面板的管理员和普通用户。需要管理员权限的操作会在正文中明确标注。
:::

## 手册章节

### 开始使用

- [认识 TaskHandoff](/guide/)：产品用途、核心概念和系统组成。
- [安装与登录](/guide/install)：服务器部署、管理员创建、桌面端行为和语言切换。
- [首次配置](/guide/first-setup)：节点接入、运行环境、模型 Provider 和项目配置。
- [界面与工作台](/guide/workbench)：主导航、看板、实例侧栏和独立窗口。

### 实例与 AI

- [Codex 与 OpenCode](/agents/)：主要 Agent 的能力、模型协议与选择建议。
- [创建和管理实例](/instances/)：工作区、运行时、实例状态、环境模板和数据删除。
- [实例设置](/instances/settings)：AI 默认值、Agent 设置、模型、应用和 Git 授权。
- [使用 AI 会话](/sessions/)：创建会话、权限模式、消息、执行过程和多会话管理。
- [仓库协作](/workspace/repository)：文件、变更、worktree、分支及远端交付。
- [应用与终端](/workspace/apps-terminal)：应用安装与启动、终端和浏览器预览。

### 组织与管理

- [Story 与自动化](/automation/)：文档、预设动作、执行计划和事件触发器。
- [节点管理](/admin/nodes)、[资源管理](/admin/resources)和[用户权限](/admin/users)。
- [桌面端](/clients/desktop)、[移动端](/clients/mobile)、[聊天桥接](/integrations/chat)和[远程访问](/integrations/remote-access)。
- [设置与安全](/settings/)：全局设置入口与安全原则。
- [故障排查](/troubleshooting)：节点、实例、AI 会话和仓库常见问题。

## 按角色阅读

| 角色 | 建议章节 |
| --- | --- |
| 普通用户 | 创建和管理实例、使用 AI 会话、仓库协作、应用与终端 |
| 团队管理员 | 安装与登录、首次配置、设置与安全、故障排查 |
| 自动化使用者 | 使用 AI 会话、Story 与自动化、设置与安全 |
