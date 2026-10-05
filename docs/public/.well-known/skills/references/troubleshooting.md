# 故障排查

先分层，再动手：**CLI 与 profile** → **Control Plane** → **节点（Node Agent / 传输）** → **实例** → **会话或应用**。同一句报错在不同层的处理方式不同，逐层用 `list` / `show` / `check` 取权威状态，不要用“删除再重建”来试探连通性。

## 按报错定位

| 现象或错误码 | 含义 | 处理 |
| --- | --- | --- |
| `NODE_AGENT_ENDPOINT_REQUIRED` | 直连（direct-http）节点没有可达端点 | 补齐 `endpoint` / `controlEndpoint` 和一次性令牌后重新登记，或改用出站连接；见 [nodes.md](./nodes.md) |
| `CONTROL_PLANE_PROXY_CREDENTIAL_REQUIRED` | 代理节点缺少远端凭据，普通删除会被拒绝 | 先在来源面板恢复绑定再用 `proxy bindings remove` 撤销；`--force` 会遗留无法管理的远端凭据 |
| 退出码 `5` | 本地会话缺失或过期 | `thctl login` 后重试；不要改用其他 profile 绕过 |
| 退出码 `13` | Control Plane 身份与已信任记录不符 | 人工核验指纹，确认后再信任；不要自动接受身份变化 |
| 退出码 `14` | CLI、Control Plane、节点或 Agent 不支持该能力 | 升级对应组件；能力缺失不是改用底层 HTTP 的理由 |
| 退出码 `15` 或审批超时 | 服务端 Web 审批在时限内没有决定 | 操作**未执行**；用户确认后重新发起 |
| 退出码 `8` | 对象已被他人修改或状态已变化 | 重新读取状态后再决定，不要盲目重试 |
| 退出码 `10` / `11` / `12` | 网络、协议或服务端错误 | 先核对连接、版本与请求体，再判断是否重试 |

完整的退出码列表见 [SKILL.md](../SKILL.md) 的 “Execute safely”。

## 写操作失败或超时

- 先读后写：用对应的 `show` / `list` 确认执行到哪一步，再决定重试还是补偿。**超时或连接断开不等于失败**，尤其对不可逆操作。
- 幂等重放只对声明支持 `--request-id` 的写命令可靠：`ai-session create` / `rename` / `fork` / `close` / `model` / `reasoning`、`story automation run`。用同一个 request id 重发，服务端识别为同一次操作；省略时 CLI 会自动生成新 id，因此重发等于新操作。
- 其他写操作（例如 `instance create`、`node create`、`instance delete`、`app-session start`）超时后不要直接重放，先查询是否已经生效，再和用户确认下一步。
- 审批被拒（退出码 `6`）是明确的权限结论，不是临时故障；先确认是否需要变更授权，不要重复发起同一请求。

## 常见误判

- 节点离线时，实例列表仍可能显示缓存状态，不能据此判断实例健康。
- 节点 `show` 返回 not found 可能只是当前 profile 或权限看不到，不代表节点已被删除。
- 事件流断开后会自动重连；不要改用反复 `list` 轮询来“补偿”漏掉的事件。
- 认证失败时系统只给出安全分类；修正后需要显式重试原操作，TaskHandoff 不会自动重放失败的 Push 或 Publish。

安全边界属于产品行为：遇到能力、身份或权限限制应停下来说明前置条件，不要绕过 CLI 直接调用内部接口。
