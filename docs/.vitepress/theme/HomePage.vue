<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import HomeSceneCard from './HomeSceneCard.vue'

const props = defineProps<{ locale?: 'zh' | 'en' }>()

const copy = {
  zh: {
    eyebrow: '自托管 AI 工作空间控制面板',
    description: '在同一个地方运行 Codex 与 OpenCode，管理工作空间、审阅代码。本机与远程任务，随时接着做',
    primary: '开始使用',
    secondary: '看看工作台',
    toolsLabel: '为你熟悉的工具而建',
    galleryLabel: '从想法到交付，每一种工作都有自己的位置。以下为场景示意',
    productTitle: '不必在窗口之间\n找回工作的上下文',
    productDescription: '从任务到会话，从本机到远程。你需要的视角，都在同一个工作台里',
    featureDescription: '把分散的会话、代码和环境放在一起。少一点切换，多一点专注',
    featureLink: '了解更多',
    heroNote: '桌面安装或服务器部署，由你选择',
    previews: [
      { label: '工作台', image: '/images/workbench-light-mode.png', alt: 'TaskHandoff Story 工作台：组织文档、会话与自动化', detail: '把文档、会话和自动化，放回同一个任务里', height: 1423 },
      { label: 'AI 会话', image: '/images/ai-session-view-modes.png', alt: 'TaskHandoff AI 会话：查看当前任务和工具活动', detail: '聚焦当前回合，执行过程与完整历史随时可查', height: 1424 },
      { label: '远程节点', image: '/images/node-management-overview.png', alt: 'TaskHandoff 节点管理：统一查看本机与远程运行环境', detail: '环境可以分布各处，管理入口始终只有一个', height: 1424 }
    ],
    heroLines: ['把 AI 开发任务', '交给一个工作台'],
    previewLabel: '工作台预览',
    workflowTitle: '不只发起对话，也管理工作的全程',
    workflowDescription: '每一步都有明确的运行环境、执行状态和交付去向。你可以专注于决策，把过程交给 TaskHandoff',
    workflow: [
      ['01', '连接工作环境', '接入本地或远程节点，配置模型与代码仓库'],
      ['02', '创建隔离实例', '从 Git 仓库或本地目录创建 Local 或 Docker 工作区'],
      ['03', '分派 AI 任务', '选择 Agent、模型、固定工作目录与权限模式'],
      ['04', '审阅并交付', '核对工具活动与 Git 变更，通过分支或 worktree 交付']
    ],
    featureTitle: '一个工作台\n装下你的整个开发流程',
    features: [
      ['会话保持清晰', '简洁模式聚焦当前任务回合；需要追溯时，再切换到完整对话'],
      ['工作区彼此隔离', '用实例与 worktree 同时推进多个任务，避免文件和分支相互干扰'],
      ['随处掌握进度', '通过桌面端、Web、移动端和聊天桥接接入同一个控制面']
    ],
    docsEyebrow: '文档导航',
    docsTitle: '从你现在要做的事开始',
    docs: [
      ['/guide/', '快速认识', '理解节点、实例、会话和工作台'],
      ['/guide/install', '安装 TaskHandoff', '选择桌面端或服务器部署方式'],
      ['/sessions/', '运行 AI 会话', '创建、监管并恢复一个 AI 任务'],
      ['/automation/', '构建自动化', '使用 Story 编排可复用的任务流程']
    ],
    faqTitle: '你可能还想知道',
    faqDescription: '先了解运行方式，再选择适合你的工作环境',
    faqLink: '查看全部常见问题',
    faqs: [
      ['需要安装 Docker 吗？', '不一定。Local Runtime 可以直接使用宿主机工具和目录；需要多个隔离实例时选择 Docker。同一宿主用户只能运行一个 Local Runtime 实例'],
      ['可以同时使用 Codex 和 OpenCode 吗？', '可以在同一个工作台创建和管理两种 Agent 的会话。每个会话选择对应 Agent 和模型，部分高级功能因 Agent 而异'],
      ['关闭网页后，任务还会继续吗？', '会。任务运行在受控实例中，关闭网页不会停止任务。停止实例、关闭会话或停止相关运行服务则可能中断任务；退出桌面应用与关闭网页也不同'],
      ['简洁模式会丢失历史消息吗？', '不会。它只调整当前会话的显示方式，不修改历史消息或 Agent 上下文。需要追溯时，切换到对话模式即可'],
      ['能从手机访问远程任务吗？', '可以访问正在运行的会话和实例操作。远程访问需要先正确配置认证和 HTTPS；创建实例及完整的基础设施管理请使用 Web 或桌面端']
    ],
    finalTitle: '下一项任务\n从这里开始',
    finalDescription: '连接你的环境，选择你的 Agent。让任务有自己的工作空间，让你始终掌握关键决策',
    finalAction: '搭建我的工作台',
    footerDescription: '你的环境 · 你的 Agent\n一个有条理的 AI 工作台',
    footerGuide: '开始探索',
    footerProject: '项目与支持',
    footerLinks: ['安装指南', '用户手册', '常见问题', '源代码', '版本下载', '反馈问题']
  },
  en: {
    eyebrow: 'A self-hosted AI workspace control plane',
    description: 'Run Codex and OpenCode, manage workspaces, and review code in one place. Pick up your work across local and remote environments',
    primary: 'Get started',
    secondary: 'Explore the workbench',
    toolsLabel: 'Built around the tools you already use',
    galleryLabel: 'From the first idea to the final review. Illustrative product scenarios',
    productTitle: 'Your work belongs together\nNot in scattered windows',
    productDescription: 'From tasks to sessions, from local to remote. Find every perspective in the same workbench',
    featureDescription: 'Bring your conversations, code, and environments together. Less switching. More focus',
    featureLink: 'Learn more',
    heroNote: 'Install on your desktop or deploy your own server',
    previews: [
      { label: 'Workbench', image: '/images/workbench-light-mode.png', alt: 'TaskHandoff Story workbench with documents, sessions, and automation', detail: 'Documents, sessions, and automation. Together around the task', height: 1423 },
      { label: 'AI sessions', image: '/images/ai-session-view-modes.png', alt: 'TaskHandoff AI session showing the current task and tool activity', detail: 'Focus on the current turn. Keep the full history within reach', height: 1424 },
      { label: 'Remote nodes', image: '/images/node-management-overview.png', alt: 'TaskHandoff node management for local and remote environments', detail: 'Different environments. One place to keep track of them', height: 1424 }
    ],
    heroLines: ['Your AI development', 'One workbench'],
    previewLabel: 'Workbench preview',
    workflowTitle: 'Manage the whole job, not just the conversation',
    workflowDescription: 'Every step has a clear environment, execution state, and delivery path. Focus on decisions while TaskHandoff keeps the process together',
    workflow: [
      ['01', 'Connect your environment', 'Add a local or remote node, then configure models and repositories'],
      ['02', 'Create an isolated instance', 'Start from a Git repository or local folder with a Local or Docker runtime'],
      ['03', 'Delegate the task', 'Choose the agent, model, fixed working directory, and permission mode'],
      ['04', 'Review and deliver', 'Check tool activity and Git changes, then ship via branch or worktree']
    ],
    featureTitle: 'One workbench for\nyour whole development flow',
    features: [
      ['Sessions stay clear', 'Compact mode focuses on the current turn; switch to the full conversation when you need to audit'],
      ['Workspaces stay isolated', 'Push several tasks at once with instances and worktrees, without files or branches colliding'],
      ['Progress everywhere', 'Reach the same control plane from desktop, web, mobile, and chat bridges']
    ],
    docsEyebrow: 'Documentation',
    docsTitle: 'Start from what you need to do',
    docs: [
      ['/en/guide/', 'Get oriented', 'Understand nodes, instances, sessions, and the workbench'],
      ['/en/guide/install', 'Install TaskHandoff', 'Choose a Desktop or server deployment'],
      ['/en/sessions/', 'Run AI sessions', 'Create, supervise, and recover an AI task'],
      ['/en/automation/', 'Build automation', 'Use Stories to orchestrate repeatable workflows']
    ],
    faqTitle: 'A few things worth knowing',
    faqDescription: 'Understand how it runs. Choose the environment that fits',
    faqLink: 'Read all frequently asked questions',
    faqs: [
      ['Do I need Docker?', 'Not necessarily. Local Runtime uses tools and directories on the host. Choose Docker for multiple isolated instances. Each host user can run only one Local Runtime instance'],
      ['Can I use Codex and OpenCode together?', 'Yes. Create and manage sessions for both agents in one workbench. Each session uses its selected agent and model; some advanced capabilities differ between agents'],
      ['Will tasks continue after I close the browser?', 'Yes. Tasks run in controlled instances, not in the browser tab. Stopping an instance, closing a session, or stopping its runtime services can interrupt work. Quitting the desktop app is also different from closing a tab'],
      ['Does compact mode remove conversation history?', 'No. It changes only how the session is displayed, not its history or agent context. Switch to conversation mode whenever you need the full record'],
      ['Can I access remote tasks from my phone?', 'Yes, for running sessions and instance operations. Configure authentication and HTTPS before remote access. Use Web or Desktop for creating instances and full infrastructure management']
    ],
    finalTitle: 'Your next task\nStart it here',
    finalDescription: 'Connect your environment. Choose your agent. Give every task its own workspace, and keep the important decisions in your hands',
    finalAction: 'Set up my workbench',
    footerDescription: 'Your environment · Your agents\nOne organized AI workbench',
    footerGuide: 'Explore',
    footerProject: 'Project & support',
    footerLinks: ['Installation', 'User guide', 'FAQ', 'Source code', 'Releases', 'Report an issue']
  }
}

const content = computed(() => copy[props.locale ?? 'zh'])
const prefix = computed(() => props.locale === 'en' ? '/en' : '')
const activePreview = ref(0)
const preview = computed(() => content.value.previews[activePreview.value])
const sceneVariants = ['session', 'review', 'workspace', 'story', 'nodes'] as const
const featureVariants = ['session', 'workspace', 'nodes'] as const
const featurePaths = ['/sessions/', '/instances/', '/integrations/remote-access']
const home = ref<HTMLElement | null>(null)
let disposeMotion: (() => void) | undefined

onMounted(() => {
  const root = home.value
  if (!root) return

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let observer: IntersectionObserver | undefined

  const configureMotion = () => {
    observer?.disconnect()
    root.querySelectorAll('.th-reveal-pending').forEach(element => element.classList.remove('th-reveal-pending'))
    if (motionPreference.matches) return

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.remove('th-reveal-pending')
          observer?.unobserve(entry.target)
        })
      }, { threshold: 0.08 })
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
        element.classList.add('th-reveal')
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add('th-reveal-pending')
          observer?.observe(element)
        }
      })
    }

  }

  configureMotion()
  motionPreference.addEventListener('change', configureMotion)
  disposeMotion = () => {
    observer?.disconnect()
    motionPreference.removeEventListener('change', configureMotion)
  }
})

onUnmounted(() => disposeMotion?.())
</script>

<template>
  <main ref="home" class="th-home">
    <section class="th-hero">
      <div class="th-shell th-hero__inner">
        <p class="th-eyebrow">{{ content.eyebrow }}</p>
        <h1 class="th-hero__title"><span v-for="line in content.heroLines" :key="line">{{ line }}</span></h1>
        <p class="th-hero__description">{{ content.description }}</p>
        <div class="th-actions">
          <a class="th-button th-button--primary" :href="withBase(`${prefix}/guide/install`)">{{ content.primary }}<span aria-hidden="true">→</span></a>
          <a class="th-button th-button--text" href="#product-preview">{{ content.secondary }}<span aria-hidden="true">→</span></a>
        </div>
        <p class="th-hero__note">{{ content.heroNote }}</p>
        <div class="th-tools"><p>{{ content.toolsLabel }}</p><div><span>Codex</span><span>OpenCode</span><span>Docker</span><span>Git</span></div></div>
      </div>
    </section>

    <section class="th-gallery" :aria-label="content.galleryLabel">
      <div class="th-gallery__viewport" tabindex="0" role="region" :aria-label="content.galleryLabel">
        <div class="th-gallery__track">
          <div v-for="group in 2" :key="group" class="th-gallery__group" :aria-hidden="group === 2 ? 'true' : undefined" :inert="group === 2 ? true : undefined">
            <HomeSceneCard v-for="variant in sceneVariants" :key="variant" :variant="variant" :locale="locale" />
          </div>
        </div>
      </div>
    </section>

    <section class="th-section th-features">
      <div class="th-shell">
        <div class="th-section-heading" data-reveal><h2>{{ content.featureTitle }}</h2><p>{{ content.featureDescription }}</p></div>
        <div class="th-feature-grid">
          <a v-for="(item, index) in content.features" :key="item[0]" class="th-feature" :href="withBase(`${prefix}${featurePaths[index]}`)" data-reveal>
            <div class="th-feature__visual" aria-hidden="true"><HomeSceneCard :variant="featureVariants[index]" :locale="locale" /></div>
            <div class="th-feature__copy"><h3>{{ item[0] }}<span aria-hidden="true">↗</span></h3><p>{{ item[1] }}</p><span class="th-feature__link">{{ content.featureLink }}<span aria-hidden="true">→</span></span></div>
          </a>
        </div>
      </div>
    </section>

    <section id="product-preview" class="th-section th-product">
      <div class="th-shell">
        <div class="th-section-heading" data-reveal><h2>{{ content.productTitle }}</h2><p>{{ content.productDescription }}</p></div>
        <div class="th-product__layout" data-reveal>
          <div class="th-preview-switcher" role="group" :aria-label="content.previewLabel">
            <button v-for="(item, index) in content.previews" :key="item.label" type="button" :aria-pressed="activePreview === index" aria-controls="preview-image" @click="activePreview = index"><span class="th-preview-switcher__title">{{ item.label }}<span aria-hidden="true">↗</span></span><span class="th-preview-switcher__detail">{{ item.detail }}</span></button>
            <a class="th-text-link" :href="withBase(`${prefix}/guide/workbench`)">{{ content.secondary }} <span aria-hidden="true">→</span></a>
          </div>
          <div class="th-product__stage">
            <figure id="preview-image" class="th-media">
              <img :key="preview.image" :src="withBase(preview.image)" :alt="preview.alt" width="1960" :height="preview.height" loading="lazy">
            </figure>
            <p class="th-preview-caption" aria-live="polite" aria-atomic="true">{{ preview.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="th-section th-workflow">
      <div class="th-shell">
        <div class="th-section-heading" data-reveal><h2>{{ content.workflowTitle }}</h2><p>{{ content.workflowDescription }}</p></div>
        <ol class="th-workflow-grid"><li v-for="item in content.workflow" :key="item[0]" class="th-workflow-step" data-reveal><span class="th-step-index">{{ item[0] }}</span><h3>{{ item[1] }}</h3><p>{{ item[2] }}</p></li></ol>
        <div class="th-workflow__note" data-reveal><span>{{ content.heroNote }}</span><a class="th-text-link" :href="withBase(`${prefix}/guide/install`)">{{ content.primary }} <span aria-hidden="true">→</span></a></div>
      </div>
    </section>

    <section class="th-section th-docs">
      <div class="th-shell th-docs__layout">
        <div data-reveal><p class="th-eyebrow">{{ content.docsEyebrow }}</p><h2>{{ content.docsTitle }}</h2></div>
        <div class="th-doc-grid"><a v-for="item in content.docs" :key="item[0]" :href="withBase(item[0])" data-reveal><div><strong>{{ item[1] }}</strong><p>{{ item[2] }}</p></div><span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section class="th-section th-faq" aria-labelledby="faq-title">
      <div class="th-shell">
        <div class="th-section-heading" data-reveal><h2 id="faq-title">{{ content.faqTitle }}</h2><p>{{ content.faqDescription }}</p></div>
        <div class="th-faq__list"><details v-for="item in content.faqs" :key="item[0]" class="th-faq__item"><summary><span>{{ item[0] }}</span><span class="th-faq__toggle" aria-hidden="true">+</span></summary><div class="th-faq__answer"><p>{{ item[1] }}</p></div></details><a class="th-text-link" :href="withBase(`${prefix}/faq`)">{{ content.faqLink }} <span aria-hidden="true">→</span></a></div>
      </div>
    </section>

    <section class="th-final">
      <div class="th-shell th-cta" data-reveal><h2>{{ content.finalTitle }}</h2><p>{{ content.finalDescription }}</p><div class="th-actions"><a class="th-button th-button--primary" :href="withBase(`${prefix}/guide/install`)">{{ content.finalAction }}<span aria-hidden="true">→</span></a><a class="th-button th-button--text" :href="withBase(`${prefix}/guide/`)">{{ content.footerLinks[1] }}<span aria-hidden="true">→</span></a></div><small>{{ content.heroNote }}</small></div>
    </section>

    <footer class="th-footer">
      <div class="th-shell th-footer__grid">
        <div class="th-footer__brand"><a :href="withBase(`${prefix}/`)" class="th-footer__logo"><img :src="withBase('/brand/task-handoff-light.svg')" alt="" width="30" height="30" loading="lazy">TaskHandoff</a><p>{{ content.footerDescription }}</p></div>
        <nav :aria-label="content.footerGuide"><h2>{{ content.footerGuide }}</h2><a :href="withBase(`${prefix}/guide/install`)">{{ content.footerLinks[0] }}</a><a :href="withBase(`${prefix}/guide/`)">{{ content.footerLinks[1] }}</a><a :href="withBase(`${prefix}/faq`)">{{ content.footerLinks[2] }}</a></nav>
        <nav :aria-label="content.footerProject"><h2>{{ content.footerProject }}</h2><a href="https://github.com/edgestorage/task-handoff">{{ content.footerLinks[3] }} ↗</a><a href="https://github.com/edgestorage/task-handoff/releases">{{ content.footerLinks[4] }} ↗</a><a href="https://github.com/edgestorage/task-handoff/issues">{{ content.footerLinks[5] }} ↗</a></nav>
      </div>
      <div class="th-shell th-footer__bottom"><span>TaskHandoff</span><span>YOUR ENVIRONMENT · YOUR CONTROL</span></div>
    </footer>
  </main>
</template>
