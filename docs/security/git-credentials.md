# Git 凭据

TaskHandoff 集中管理 HTTPS Token 和 SSH 私钥，并按 remote scope 将凭据提供给明确授权的实例。Secret 只可写入，保存后不会返回浏览器。

## Scope 匹配

凭据范围由协议、主机、可选非默认端口和区分大小写的仓库路径前缀组成。不支持通配符，也不接受 URL userinfo、query 中的密码或不安全路径。

存在多条凭据时，系统选择路径前缀最长且唯一的匹配。两个同等优先级的匹配会报告冲突，不会依次试探 Secret。

## HTTPS Token

Token 只会短暂提供给当前 Git credential-helper 请求，不会写入 remote URL、命令参数或环境变量。建议使用专用、最小权限、可轮换的 Token。

<figure class="doc-screenshot">
  <img src="/images/git-credential-form.png" alt="添加 HTTPS Git 凭据的表单">
  <figcaption>用主机和仓库路径前缀限定 HTTPS Token 的适用范围。</figcaption>
</figure>

## SSH 凭据

SSH 私钥保留在 Node Agent。实例只获得公钥身份、固定 `known_hosts` 和本地签名代理。必须配置固定 host key；系统不会采用首次连接自动信任。

## 首次 Clone 与保留授权

创建 Git 实例时选择凭据，默认只授权一次性 clone。操作完成后会清除临时 helper 和授权。

启用“在此实例中保留”后，实例同一用户下的 Codex、OpenCode、终端、应用和仓库操作都可以对匹配 remote 使用凭据。这是实例级信任决定。

## 轮换与撤销

编辑凭据并填写新 Secret 会执行轮换；留空保留当前 Secret。凭据 revision 更新后会同步到引用它的节点。

从实例设置撤销授权会在 Node Agent 生效，不依赖实例在线。已经分配给实例的凭据不能删除，需先撤销所有引用。

## 错误处理

常见安全错误包括无匹配、匹配冲突、remote 不支持、缺少 host key 和认证被拒绝。修正后显式重试原操作；TaskHandoff 不会自动重放失败的 Push 或 Publish。
