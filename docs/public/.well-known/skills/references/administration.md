# 运维、权限与诊断

这一组命令影响整个 Control Plane 或用户身份，默认按高影响操作处理：执行前说明对象与后果，取得用户明确授权，写后用对应 `show`/`list` 核验。

## 本地确认与服务端审批

高影响操作有两道门，二者不能互相替代：CLI 的**本地确认**（`--yes` 只是跳过它）和 Control Plane 的 **Web 审批**（必须有授权用户在界面上决定，CLI 无法代批）。默认需要 Web 审批的操作：`instance delete`、`node remove`、`node updates apply`、`user access`、`user role update/remove`、`user identity-provider update/remove`、`git-credential assignments assign`；`node settings external-listener set` 默认不门控，可由管理员开启。门控由 Control Plane 策略决定，可用 `TASK_HANDOFF_OPERATION_APPROVAL_POLICY` 调整，不要假设某个操作一定被门控或一定不被门控。

- 发起后 CLI 会打印审批 ID，并等待用户决定，最多 5 分钟。等待期间不要重复发起同一操作。
- 审批通过只授权这一次请求的具体目标与参数；改目标或改参数等于新请求，需要重新审批。
- 被拒绝是明确结论（退出码 6）；超时视为未执行（退出码 15）。两种情况下对象都没有被修改，先核验状态再决定是否重新发起。

## 用户、角色与登录源

- 用户：`user list|show|create|update|access`。`access` 替换用户的访问授权；除角色权限外还可以限制可访问的节点和实例。选择“继承节点上的全部实例”后，该节点未来创建的实例也可能进入用户范围，需要严格隔离时应显式选择实例。
- 角色：`user role list|create|update|remove`，权限描述用 `user permission list`。角色是可复用权限集合，遵循最小权限；只需要执行 AI 任务的用户通常不应拥有用户管理、密钥管理、节点管理或系统设置权限。被引用的角色不能直接归档。
- 登录源：`user identity-provider list|create|update|remove`（OIDC / GitHub）。保存时系统会验证配置；Client Secret 保存后不再返回。启用前确认回调地址、HTTPS 和管理员恢复路径。
- 外部身份审批：`user external-identity list|approve|reject`。拒绝不会创建账号；解绑登录身份前确认用户仍有其他可用登录方式。
- 会话撤销：`user sessions <userId>`、`user session-revoke`、`mobile-session list|revoke`。丢失设备、权限变更或疑似泄露时先撤销会话，再轮换密码或凭据。
- 密码重置：`user password-reset`（密码从 stdin 读入）。会生成一次性临时密码并使现有会话失效，只能通过安全渠道传递，不要写入工单或公开消息。

## Control Plane

- 状态与配置：`control-plane status --json`、`control-plane settings show --json`、`control-plane settings update --config <file>`。设置更新是全局配置，影响所有用户，改前先展示将要变更的字段。
- 诊断日志：`control-plane diagnostic-logs export`。导出文件按敏感数据对待，不要附带上传或粘贴到公开渠道。
- 事件流：`thctl events --topic <topic> [--instance <instanceId>] --json` 输出 JSON Lines 并持续订阅，只在确实需要实时流时使用，任务完成立即停止；一次性查询用 `list`/`show`，不要用事件流轮询。
- 事件 topic：`instances`、`ai.sessions`、`app.sessions`、`node.state`、`triggers`、`agents`、`control-plane-proxy`、`operation.approvals`，`*` 表示全部；命令行也接受 `ai-sessions`、`app-sessions` 这类别名。断线由 CLI 自动重连并按事件 ID 去重，不要因为一次断开就改成轮询。

## 节点更新

- 入口：`node updates jobs|check|apply`，`apply` 可用 `--wait` 轮询到终态。
- 生产优先使用 `stable` 渠道；更新前检查该节点上的活跃工作。
- 受控实例运行时更新可能在有限等待后重启实例；已停止的实例不会仅为更新而自动启动，而是在下次正常启动前安装目标版本。
- Control Plane 的普通停止或重启不应连带停止 Node Agent 和受管实例。节点显示离线或降级时，先看连接诊断和最后错误，再检查服务、DNS、证书、防火墙与代理，不要靠删除节点或实例来测试连通性。

其他报错与失败重试的判断见 [troubleshooting.md](./troubleshooting.md)。
