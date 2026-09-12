<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ locale?: 'zh' | 'en' }>()

const icons = {
  capabilities: [
    '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9.5l3 2.5-3 2.5"/><path d="M13 14.5h4"/>',
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/>',
    '<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="19" r="2.4"/><circle cx="19" cy="19" r="2.4"/><path d="M12 7.4v4"/><path d="M6.7 17.3l3.9-3.9"/><path d="M17.3 17.3l-3.9-3.9"/>',
    '<rect x="2" y="5" width="13" height="9" rx="2"/><path d="M6 18h5"/><path d="M8.5 14v4"/><rect x="16.5" y="9.5" width="5.5" height="10.5" rx="1.6"/>'
  ],
  features: [
    '<path d="M20 14.5a3 3 0 0 1-3 3H8l-4 3.2V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/><path d="M8 8.5h8"/><path d="M8 12h5"/>',
    '<path d="M12 3l8 4.5-8 4.5-8-4.5z"/><path d="M4 12l8 4.5 8-4.5"/><path d="M4 16.5l8 4.5 8-4.5"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 2.6 15.4 0 18"/><path d="M12 3c-2.6 2.6-2.6 15.4 0 18"/>'
  ],
  docs: [
    '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    '<path d="M12 3v11.5"/><path d="M8 11l4 4 4-4"/><path d="M4 20.5h16"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
    '<path d="M13 2.5L4.5 14H11l-1 7.5L19 10h-6z"/>'
  ]
}

const copy = {
  zh: {
    eyebrow: '自托管 AI 工作空间控制面板',
    lead: '统一运行、监管与交付每一个 AI 开发任务。',
    description: '在本机或远程节点创建隔离工作空间，用同一个工作台运行 Codex 与 OpenCode，查看会话、文件、代码变更和实时状态。',
    primary: '开始使用',
    secondary: '认识工作台',
    heroImage: '/images/workbench-light-mode.png',
    imageAlt: 'TaskHandoff 工作台，展示 Story、AI 会话与自动化',
    capabilities: [
      ['Codex + OpenCode', '统一创建、审批、停止和恢复会话'],
      ['Local + Docker', '直连宿主环境，或运行多个隔离实例'],
      ['本机 + 远程节点', '跨计算机管理运行环境与任务状态'],
      ['Web + Desktop + Mobile', '共享同一 Control Plane 数据']
    ],
    workflowEyebrow: '从任务到交付',
    workflowTitle: '不只发起对话，也管理工作的全程',
    workflowDescription: '每一步都有明确的运行环境、执行状态和交付去向。你可以专注于决策，把过程交给 TaskHandoff。',
    workflow: [
      ['01', '连接工作环境', '接入本地或远程节点，配置模型与代码仓库。'],
      ['02', '创建隔离实例', '从 Git 仓库或本地目录创建 Local 或 Docker 工作区。'],
      ['03', '分派 AI 任务', '选择 Agent、模型、固定工作目录与权限模式。'],
      ['04', '审阅并交付', '核对工具活动与 Git 变更，通过分支或 worktree 交付。']
    ],
    showcaseEyebrow: 'TaskHandoff 特色',
    showcaseTitle: '当前任务在前，完整历史随时可查',
    showcaseDescription: '默认的简洁模式只保留完成当前判断所需的提示、回复、实时工具活动、审批和队列状态。长会话不再挤占工作区域，需要审计时可立即切回完整对话。',
    showcasePoints: ['实时显示工具调用与文件编辑', '集中处理等待中的权限审批', '断线重连后获取权威会话快照'],
    showcaseLink: '了解会话视图',
    showcaseAnchor: '/sessions/#简洁模式与对话模式',
    showcaseImage: '/images/ai-session-view-modes.png',
    showcaseAlt: 'TaskHandoff AI 会话的简洁模式与对话模式切换',
    featureEyebrow: '一个工作台，多种工作方式',
    featureTitle: '从个人开发到团队运营',
    features: [
      ['会话保持清晰', '简洁模式聚焦当前任务回合；需要追溯时，再切换到完整对话。'],
      ['工作区彼此隔离', '用实例与 worktree 同时推进多个任务，避免文件和分支相互干扰。'],
      ['随处掌握进度', '通过桌面端、Web、移动端和聊天桥接接入同一个控制面。']
    ],
    docsEyebrow: '文档导航',
    docsTitle: '从你现在要做的事开始',
    docs: [
      ['/guide/', '快速认识', '理解节点、实例、会话和工作台'],
      ['/guide/install', '安装 TaskHandoff', '选择桌面端或服务器部署方式'],
      ['/sessions/', '运行 AI 会话', '创建、监管并恢复一个 AI 任务'],
      ['/automation/', '构建自动化', '使用 Story 编排可复用的任务流程']
    ],
    finalTitle: '准备好交出第一个任务了吗？',
    finalDescription: '从安装开始，几分钟内进入你的 AI 工作台。',
    finalAction: '查看安装指南'
  },
  en: {
    eyebrow: 'A self-hosted AI workspace control plane',
    lead: 'Run, supervise, and deliver every AI development task in one place.',
    description: 'Create isolated workspaces on local or remote nodes. Run Codex and OpenCode from one workbench with sessions, files, code changes, and live state in view.',
    primary: 'Get started',
    secondary: 'Explore the workbench',
    heroImage: '/images/workbench-light-mode.png',
    imageAlt: 'The TaskHandoff workbench showing Story, AI sessions, and automation',
    capabilities: [
      ['Codex + OpenCode', 'Create, approve, stop, and resume sessions'],
      ['Local + Docker', 'Use the host directly or run isolated instances'],
      ['Local + remote nodes', 'Manage environments and task state across machines'],
      ['Web + Desktop + Mobile', 'Share the same Control Plane data']
    ],
    workflowEyebrow: 'From task to delivery',
    workflowTitle: 'Manage the whole job, not just the conversation',
    workflowDescription: 'Every step has a clear environment, execution state, and delivery path. Focus on decisions while TaskHandoff keeps the process together.',
    workflow: [
      ['01', 'Connect your environment', 'Add a local or remote node, then configure models and repositories.'],
      ['02', 'Create an isolated instance', 'Start from a Git repository or local folder with a Local or Docker runtime.'],
      ['03', 'Delegate the task', 'Choose the agent, model, fixed working directory, and permission mode.'],
      ['04', 'Review and deliver', 'Check tool activity and Git changes, then ship via branch or worktree.']
    ],
    showcaseEyebrow: 'A TaskHandoff signature',
    showcaseTitle: 'The current task first, the full history on demand',
    showcaseDescription: 'Compact mode keeps only what you need to judge the current turn: prompts, replies, live tool activity, approvals, and queue state. Long sessions stop crowding the workspace, and you can switch back to the full conversation whenever you need to audit.',
    showcasePoints: ['Tool calls and file edits shown live', 'Pending permission approvals in one place', 'An authoritative snapshot after reconnecting'],
    showcaseLink: 'Learn about session views',
    showcaseAnchor: '/sessions/#compact-and-conversation-modes',
    showcaseImage: '/images/ai-session-view-modes.png',
    showcaseAlt: 'Switching between compact and conversation modes in a TaskHandoff AI session',
    featureEyebrow: 'One workbench, many ways to work',
    featureTitle: 'From solo development to team operations',
    features: [
      ['Sessions stay clear', 'Compact mode focuses on the current turn; switch to the full conversation when you need to audit.'],
      ['Workspaces stay isolated', 'Push several tasks at once with instances and worktrees, without files or branches colliding.'],
      ['Progress everywhere', 'Reach the same control plane from desktop, web, mobile, and chat bridges.']
    ],
    docsEyebrow: 'Documentation',
    docsTitle: 'Start from what you need to do',
    docs: [
      ['/en/guide/', 'Get oriented', 'Understand nodes, instances, sessions, and the workbench'],
      ['/en/guide/install', 'Install TaskHandoff', 'Choose a Desktop or server deployment'],
      ['/en/sessions/', 'Run AI sessions', 'Create, supervise, and recover an AI task'],
      ['/en/automation/', 'Build automation', 'Use Stories to orchestrate repeatable workflows']
    ],
    finalTitle: 'Ready to hand off your first task?',
    finalDescription: 'Start with installation and enter your AI workbench in minutes.',
    finalAction: 'View installation guide'
  }
}

const content = computed(() => copy[props.locale ?? 'zh'])
const prefix = computed(() => props.locale === 'en' ? '/en' : '')
</script>

<template>
  <main class="th-home">
    <section class="th-hero">
      <div class="th-hero__backdrop" aria-hidden="true"></div>
      <div class="th-shell th-hero__inner">
        <p class="th-eyebrow">{{ content.eyebrow }}</p>
        <h1 class="th-hero__title">TaskHandoff</h1>
        <p class="th-hero__lead">{{ content.lead }}</p>
        <p class="th-hero__description">{{ content.description }}</p>
        <div class="th-actions">
          <a class="th-button th-button--primary" :href="withBase(`${prefix}/guide/install`)">
            {{ content.primary }}<span aria-hidden="true">→</span>
          </a>
          <a class="th-button th-button--secondary" :href="withBase(`${prefix}/guide/workbench`)">{{ content.secondary }}</a>
        </div>
      </div>

      <div class="th-shell th-hero__shot">
        <figure class="th-media">
          <img :src="withBase(content.heroImage)" :alt="content.imageAlt">
        </figure>
      </div>
    </section>

    <section class="th-capabilities" aria-label="Capabilities">
      <div class="th-shell th-capability-grid">
        <div v-for="(item, index) in content.capabilities" :key="item[0]" class="th-capability">
          <span class="th-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="icons.capabilities[index]"></svg>
          </span>
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
        </div>
      </div>
    </section>

    <section class="th-section th-workflow">
      <div class="th-shell">
        <div class="th-section-heading">
          <div>
            <p class="th-eyebrow">{{ content.workflowEyebrow }}</p>
            <h2>{{ content.workflowTitle }}</h2>
          </div>
          <p>{{ content.workflowDescription }}</p>
        </div>
        <ol class="th-workflow-grid">
          <li v-for="item in content.workflow" :key="item[0]" class="th-workflow-step">
            <span class="th-step-index">{{ item[0] }}</span>
            <h3>{{ item[1] }}</h3>
            <p>{{ item[2] }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="th-section th-showcase">
      <div class="th-shell th-showcase__grid">
        <div class="th-showcase__copy">
          <p class="th-eyebrow">{{ content.showcaseEyebrow }}</p>
          <h2>{{ content.showcaseTitle }}</h2>
          <p>{{ content.showcaseDescription }}</p>
          <ul class="th-check-list">
            <li v-for="item in content.showcasePoints" :key="item">
              <span class="th-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
              </span>
              {{ item }}
            </li>
          </ul>
          <a class="th-text-link" :href="withBase(`${prefix}${content.showcaseAnchor}`)">
            {{ content.showcaseLink }} <span aria-hidden="true">→</span>
          </a>
        </div>
        <figure class="th-media th-media--showcase">
          <img :src="withBase(content.showcaseImage)" :alt="content.showcaseAlt" loading="lazy">
        </figure>
      </div>
    </section>

    <section class="th-section th-features">
      <div class="th-shell">
        <div class="th-section-heading th-section-heading--stack">
          <p class="th-eyebrow">{{ content.featureEyebrow }}</p>
          <h2>{{ content.featureTitle }}</h2>
        </div>
        <div class="th-feature-grid">
          <article v-for="(item, index) in content.features" :key="item[0]" class="th-feature">
            <span class="th-icon th-icon--feature" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="icons.features[index]"></svg>
            </span>
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="th-section th-docs">
      <div class="th-shell">
        <div class="th-section-heading th-section-heading--stack">
          <p class="th-eyebrow">{{ content.docsEyebrow }}</p>
          <h2>{{ content.docsTitle }}</h2>
        </div>
        <div class="th-doc-grid">
          <a v-for="(item, index) in content.docs" :key="item[0]" :href="withBase(item[0])">
            <span class="th-icon th-icon--doc" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="icons.docs[index]"></svg>
            </span>
            <span class="th-doc-grid__text">
              <strong>{{ item[1] }}</strong>
              <small>{{ item[2] }}</small>
            </span>
            <b class="th-doc-grid__arrow" aria-hidden="true">→</b>
          </a>
        </div>
      </div>
    </section>

    <section class="th-final">
      <div class="th-shell">
        <div class="th-cta">
          <div>
            <h2>{{ content.finalTitle }}</h2>
            <p>{{ content.finalDescription }}</p>
          </div>
          <a class="th-button th-button--light" :href="withBase(`${prefix}/guide/install`)">
            {{ content.finalAction }}<span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
