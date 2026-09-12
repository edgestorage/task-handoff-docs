import { defineConfig } from 'vitepress'

const zhSidebar = [
  {
    text: '开始使用',
    items: [
      { text: '手册目录', link: '/' },
      { text: '认识 TaskHandoff', link: '/guide/' },
      { text: '安装与登录', link: '/guide/install' },
      { text: '界面与工作台', link: '/guide/workbench' },
      { text: '首次配置', link: '/guide/first-setup' }
    ]
  },
  {
    text: 'Agent 与工作空间',
    items: [
      { text: 'Codex 与 OpenCode', link: '/agents/' },
      { text: '创建和管理实例', link: '/instances/' },
      { text: '实例设置', link: '/instances/settings' },
      { text: '使用 AI 会话', link: '/sessions/' },
      { text: '仓库协作', link: '/workspace/repository' },
      { text: '应用与终端', link: '/workspace/apps-terminal' }
    ]
  },
  {
    text: '管理',
    items: [
      { text: '节点管理', link: '/admin/nodes' },
      { text: '模型、镜像与项目', link: '/admin/resources' },
      { text: '用户、角色与登录源', link: '/admin/users' },
      { text: 'Git 凭据', link: '/security/git-credentials' },
      { text: '设置概览', link: '/settings/' }
    ]
  },
  {
    text: '跨端与集成',
    items: [
      { text: '桌面端', link: '/clients/desktop' },
      { text: '移动端', link: '/clients/mobile' },
      { text: '聊天桥接', link: '/integrations/chat' },
      { text: '远程访问', link: '/integrations/remote-access' }
    ]
  },
  {
    text: 'Story',
    items: [
      { text: '认识 Story', link: '/automation/' },
      { text: 'Story 文档', link: '/automation/documents' },
      { text: '预设动作', link: '/automation/actions' },
      { text: 'Story 自动化', link: '/automation/schedules' }
    ]
  },
  {
    text: '触发器',
    items: [
      { text: '触发器', link: '/automation/triggers' }
    ]
  },
  {
    text: '运维与参考',
    items: [
      { text: '更新与版本', link: '/admin/updates' },
      { text: '数据、备份与恢复', link: '/reference/data-backup' },
      { text: '状态与术语', link: '/reference/status-glossary' },
      { text: '跨端能力矩阵', link: '/reference/capability-matrix' },
      { text: '私有仓库教程', link: '/tutorials/private-repository' },
      { text: 'Worktree 教程', link: '/tutorials/worktree-session' },
      { text: '故障排查', link: '/troubleshooting' },
      { text: '常见问题', link: '/faq' }
    ]
  }
]

const enSidebar = [
  {
    text: 'Get Started',
    items: [
      { text: 'Guide Index', link: '/en/' },
      { text: 'About TaskHandoff', link: '/en/guide/' },
      { text: 'Install and Sign In', link: '/en/guide/install' },
      { text: 'Interface and Workbench', link: '/en/guide/workbench' },
      { text: 'First-time Setup', link: '/en/guide/first-setup' }
    ]
  },
  {
    text: 'Agents and Workspaces',
    items: [
      { text: 'Codex and OpenCode', link: '/en/agents/' },
      { text: 'Create and Manage Instances', link: '/en/instances/' },
      { text: 'Instance Settings', link: '/en/instances/settings' },
      { text: 'Use AI Sessions', link: '/en/sessions/' },
      { text: 'Repository Workflows', link: '/en/workspace/repository' },
      { text: 'Apps and Terminal', link: '/en/workspace/apps-terminal' }
    ]
  },
  {
    text: 'Administration',
    items: [
      { text: 'Node Management', link: '/en/admin/nodes' },
      { text: 'Models, Images, and Projects', link: '/en/admin/resources' },
      { text: 'Users, Roles, and Sign-in', link: '/en/admin/users' },
      { text: 'Git Credentials', link: '/en/security/git-credentials' },
      { text: 'Settings Overview', link: '/en/settings/' }
    ]
  },
  {
    text: 'Clients and Integrations',
    items: [
      { text: 'Desktop Client', link: '/en/clients/desktop' },
      { text: 'Mobile Client', link: '/en/clients/mobile' },
      { text: 'Chat Bridges', link: '/en/integrations/chat' },
      { text: 'Remote Access', link: '/en/integrations/remote-access' }
    ]
  },
  {
    text: 'Story',
    items: [
      { text: 'About Story', link: '/en/automation/' },
      { text: 'Story Documents', link: '/en/automation/documents' },
      { text: 'Preset Actions', link: '/en/automation/actions' },
      { text: 'Story Automation', link: '/en/automation/schedules' }
    ]
  },
  {
    text: 'Triggers',
    items: [
      { text: 'Triggers', link: '/en/automation/triggers' }
    ]
  },
  {
    text: 'Operations and Reference',
    items: [
      { text: 'Updates and Versions', link: '/en/admin/updates' },
      { text: 'Data, Backup, and Recovery', link: '/en/reference/data-backup' },
      { text: 'Status and Glossary', link: '/en/reference/status-glossary' },
      { text: 'Client Capability Matrix', link: '/en/reference/capability-matrix' },
      { text: 'Private Repository Tutorial', link: '/en/tutorials/private-repository' },
      { text: 'Worktree Tutorial', link: '/en/tutorials/worktree-session' },
      { text: 'Troubleshooting', link: '/en/troubleshooting' },
      { text: 'FAQ', link: '/en/faq' }
    ]
  }
]

export default defineConfig({
  title: 'TaskHandoff 用户手册',
  description: 'TaskHandoff 安装、配置与日常使用指南',
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    server: {
      allowedHosts: ['127-0-0-1.internal']
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'TaskHandoff 用户手册',
      description: 'TaskHandoff 安装、配置与日常使用指南',
      themeConfig: {
        nav: [
          { text: '使用手册', link: '/guide/' },
          { text: '安装', link: '/guide/install' },
          { text: '管理', link: '/admin/nodes' }
        ],
        sidebar: zhSidebar,
        outline: { label: '本页内容', level: [2, 3] },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        langMenuLabel: '切换语言'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'TaskHandoff User Guide',
      description: 'Install, configure, and use TaskHandoff',
      themeConfig: {
        nav: [
          { text: 'User Guide', link: '/en/guide/' },
          { text: 'Installation', link: '/en/guide/install' },
          { text: 'Administration', link: '/en/admin/nodes' }
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        langMenuLabel: 'Change language'
      }
    }
  },
  themeConfig: {
    siteTitle: 'TaskHandoff',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索手册', buttonAriaLabel: '搜索手册' },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除搜索',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  }
})
