<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant: 'session' | 'review' | 'workspace' | 'story' | 'nodes'
  locale?: 'zh' | 'en'
}>()

const content = computed(() => props.locale === 'en' ? {
  sample: 'ILLUSTRATION',
  session: 'Make the next thing',
  prompt: 'Build a clearer sign-in experience',
  working: 'A workspace for every idea',
  activity: ['Plan the changes', 'Edit the files', 'Review the result'],
  review: 'Every change, in view',
  reviewNote: 'From the conversation to the code',
  workspace: 'Room to work in parallel',
  isolated: 'Separate workspaces. Shared focus',
  story: 'Keep the whole story',
  storyNote: 'The context stays with the work',
  storyItems: ['Product brief', 'Implementation', 'Release review'],
  nodes: 'Work from anywhere',
  local: 'Local machine',
  remote: 'Remote node',
  nodeNote: 'One place to bring it all together'
} : {
  sample: '场景示意',
  session: '让想法，开始执行',
  prompt: '为登录流程设计一个更清晰的界面',
  working: '每个想法，都有自己的工作空间',
  activity: ['梳理改动', '编辑文件', '审阅结果'],
  review: '每一处改动，都看得见',
  reviewNote: '从对话，到真正的代码',
  workspace: '同时推进，互不打扰',
  isolated: '工作空间独立，目标始终清晰',
  story: '让上下文，跟着任务走',
  storyNote: '文档、会话和交付，都在这里',
  storyItems: ['产品需求', '开发实现', '发布审阅'],
  nodes: '不在电脑前，也在掌控中',
  local: '本机环境',
  remote: '远程节点',
  nodeNote: '分布各处的工作，一个入口管理'
})
</script>

<template>
  <article class="th-scene" :class="`th-scene--${variant}`">
    <div class="th-scene__top"><span>{{ variant === 'session' ? 'Codex / OpenCode' : variant === 'review' ? 'Git review' : variant === 'workspace' ? 'Docker workspaces' : variant === 'story' ? 'Story' : 'Control Plane' }}</span><small>{{ content.sample }}</small></div>
    <template v-if="variant === 'session'">
      <h3>{{ content.session }}</h3>
      <div class="th-scene__prompt"><span aria-hidden="true">✳︎</span>{{ content.prompt }}</div>
      <div class="th-scene__activity">
        <span v-for="(item, index) in content.activity" :key="item">
          <i aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="index === 2 ? 'M4 12l8-8M5 4h7v7' : 'M3 8l3 3 7-7'" /></svg></i>
          {{ item }}
        </span>
      </div>
      <div class="th-scene__bottom">{{ content.working }}<span aria-hidden="true">↗</span></div>
    </template>
    <template v-else-if="variant === 'review'">
      <h3>{{ content.review }}</h3>
      <p>{{ content.reviewNote }}</p>
      <div class="th-scene__diff"><div><span>⌘</span> feature / sign-in <span>+12 −4</span></div><code><span class="th-code-remove">− return defaultView</span><span class="th-code-add">+ const view = createWorkspace()</span><span class="th-code-add">+ return view.render()</span></code></div>
      <div class="th-scene__bottom"><span>FILES · DIFF · WORKTREE</span><span aria-hidden="true">↗</span></div>
    </template>
    <template v-else-if="variant === 'workspace'">
      <h3>{{ content.workspace }}</h3>
      <p>{{ content.isolated }}</p>
      <div class="th-scene__workspaces"><div><span class="th-scene__cube" aria-hidden="true">◇</span><div><strong>Frontend</strong><code>feature / interface</code></div><small>Docker</small></div><div><span class="th-scene__cube" aria-hidden="true">◇</span><div><strong>API service</strong><code>feature / endpoints</code></div><small>Docker</small></div></div>
      <div class="th-scene__bottom"><span>YOUR CODE · YOUR ENVIRONMENT</span><span aria-hidden="true">↗</span></div>
    </template>
    <template v-else-if="variant === 'story'">
      <h3>{{ content.story }}</h3>
      <p>{{ content.storyNote }}</p>
      <div class="th-scene__story"><div v-for="(item, index) in content.storyItems" :key="item"><span aria-hidden="true">{{ ['▤', '✳︎', '↗'][index] }}</span><strong>{{ item }}</strong><span class="th-scene__rule" aria-hidden="true"></span></div></div>
      <div class="th-scene__bottom"><span>CONTEXT → EXECUTION → DELIVERY</span></div>
    </template>
    <template v-else>
      <h3>{{ content.nodes }}</h3>
      <div class="th-scene__network"><div class="th-scene__hub">TaskHandoff</div><div class="th-scene__branches"><span>{{ content.local }}</span><span>{{ content.remote }}</span></div></div>
      <p>{{ content.nodeNote }}</p>
      <div class="th-scene__bottom"><span>WEB / DESKTOP / MOBILE</span><span aria-hidden="true">↗</span></div>
    </template>
  </article>
</template>
