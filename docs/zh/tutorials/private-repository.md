# 教程：创建私有仓库实例

本教程演示使用托管 Git 凭据创建 Docker 实例，并启动 Codex 或 OpenCode。

## 前置条件

- 至少一个在线节点；
- 节点 Docker daemon 可用；
- 已准备目标仓库 URL 和最小权限 Token，或 SSH 私钥与固定 host key；
- 已配置 Codex 或 OpenCode 模型 Provider。

## 1. 添加凭据

打开“设置 → Git 凭据 → 添加凭据”，选择 HTTPS 或 SSH，填写精确的主机和仓库路径前缀。保存后 Secret 无法再次查看。

## 2. 登记项目

打开“设置 → Git 项目”，添加仓库名称和不含 Secret 的 URL。也可以在创建实例时现场添加。

<figure class="doc-screenshot">
  <img src="/images/git-project-form.png" alt="添加 Git 项目的表单">
  <figcaption>仓库 URL 不应包含用户名、Token 或其他 Secret。</figcaption>
</figure>

## 3. 创建实例

1. 选择“新建实例 → 仓库”。
2. 选择项目、节点和 Docker Runtime。
3. 选择 Market 镜像、自定义镜像或环境模板。
4. 选择刚才创建的 Git 凭据。
5. 仅需 clone 时保持一次性授权；需要 Agent 后续 Push 时启用保留授权。
6. 为 Codex 或 OpenCode 选择模型并创建。

## 4. 验证

等待实例进入“运行中”，打开仓库环境检查 remote 和当前分支。创建 AI 会话并要求 Agent 读取项目说明、运行现有测试，但暂不修改代码。

## 5. 安全交付

完成任务后在“变更”中检查 diff，只暂存需要提交的文件。提交后使用 Publish/Push，确认来源、远端和目标分支。TaskHandoff 不会 force push。

如果凭据只用于 clone，Push 会提示缺少授权。此时到“实例设置 → Git 凭据”明确授权，再手动重试。
