# 使用 `thctl` Skill

TaskHandoff 的命令行客户端是 **`thctl`**（npm 包 `@task-handoff/thctl`）。本站发布一个名为 `taskhandoff` 的 Agent Skill：入口 `SKILL.md` 讲连接和通用操作原则，具体功能模块放在 `references/` 下按需加载，目前包含节点、实例、AI 会话、资源与凭据、Story、自动化、应用与终端、聊天与远程访问、运维、故障排查十个参考。Agent 装好这个 Skill 之后，就知道怎么连接控制面板、创建和监管任务、排查故障。

Skill 只提供使用说明。安装 Skill **不会安装 CLI**，也不会自动登录或授予任何权限。

## 安装 CLI

```sh
npm install -g @task-handoff/thctl
thctl --help
```

## 连接控制面板

连接本机桌面端时，运行 `thctl whoami --json` 即可自动发现并连接本机的 Control Plane。

连接远端时先运行 `thctl profile add https://你的控制面板地址`，再运行 `thctl login`：浏览器会打开控制面板的授权页，核对客户端信息和设备码后批准。没有浏览器的环境用 `thctl login --device`，在终端读取设备码，再到控制面板的授权页输入并批准。

## 安装 Skill

最简单的做法是让 Agent 自己安装，把下面这句话发给它：

```text
帮我安装 TaskHandoff 技能：https://docs.thandoff.com/.well-known/skills/index.json
```

也可以自己用 `thctl` 安装（需要 CLI 0.0.36 及以上）：

```sh
thctl skill status                           # 查看 user / project 作用域的安装情况
thctl skill install --yes                    # 安装到用户级 ~/.agents/skills/taskhandoff
thctl skill install --scope project --yes    # 只装到当前项目的 .agents/skills/taskhandoff
thctl skill update --yes                     # 升级到最新版本
thctl skill update --force --yes             # 本地有修改时强制替换
```

安装时会校验下载到的文件；如果提示 CLI 版本过旧，请先升级 CLI 再安装。以前装过旧名字的技能（`task-handoff`、`task-handoff-nodes`）时，`thctl skill status` 会一并列出，确认新技能可用后再删除旧目录。

### 不使用 thctl 的客户端

OpenCode 可以在 `opencode.json` 里添加本站的发布地址：

```json
{"skills":{"urls":["https://docs.thandoff.com/.well-known/skills/"]}}
```

其他支持本地 Agent Skills 的客户端，可以把入口和参考文件下载到 `~/.agents/skills/taskhandoff`（或项目内的 `.agents/skills/taskhandoff`）：

```sh
base=https://docs.thandoff.com/.well-known/skills
dest=.agents/skills/taskhandoff
for f in SKILL.md references/nodes.md references/instances.md references/sessions.md \
  references/resources.md references/stories.md references/automation.md references/apps.md \
  references/integrations.md references/administration.md references/troubleshooting.md; do
  mkdir -p "$dest/$(dirname "$f")"
  curl -fL "$base/$f" -o "$dest/$f"
done
```

更新前请确认目标目录里没有你自己的改动，`thctl skill update` 也会拒绝覆盖本地修改过的目录。具体的命令用法以当前安装的 CLI 为准，可以用 `thctl <命令> --help` 或 `thctl schema --format json` 查看。
