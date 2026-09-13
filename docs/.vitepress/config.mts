import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'

const base = process.env.DOCS_BASE ?? '/'
const siteOrigin = 'https://docs.thandoff.com'
const socialImage = `${siteOrigin}/images/workbench-light-mode.png`

function pageRoute(relativePath: string) {
  const path = relativePath.replace(/\.md$/, '')

  if (path === 'index') return '/'
  if (path.endsWith('/index')) return `/${path.slice(0, -'/index'.length)}/`
  return `/${path}`
}

function localizedRoutes(route: string) {
  const english = route === '/en/' || route.startsWith('/en/')
  const chineseRoute = english ? route.slice(3) || '/' : route
  const englishRoute = english ? route : route === '/' ? '/en/' : `/en${route}`

  return { english, chineseRoute, englishRoute }
}

function absoluteUrl(route: string) {
  return new URL(route, siteOrigin).href
}

function plainText(markdown: string) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateDescription(value: string, maxLength: number) {
  if (value.length <= maxLength) return value

  const shortened = value.slice(0, maxLength + 1)
  const wordBoundary = shortened.lastIndexOf(' ')
  const end = wordBoundary > maxLength * 0.75 ? wordBoundary : maxLength
  return `${shortened.slice(0, end).replace(/[，。；、,.!?;:\s]+$/u, '')}…`
}

function descriptionFromSource(filePath: string, title: string) {
  const source = readFileSync(new URL(`../${filePath}`, import.meta.url), 'utf8')
    .replace(/^---\s*[\s\S]*?\s*---\s*/u, '')
    .replace(/```[\s\S]*?```/g, '')

  const paragraph = source.split(/\n\s*\n/).find((block) => {
    const value = block.trim()
    return value
      && !/^(?:#{1,6}\s|:::|\|\s|[-*+]\s|\d+[.)]\s|<|!\[)/u.test(value)
      && !value.includes('\n|')
  })

  const summary = plainText(paragraph ?? '')
  const english = filePath.startsWith('en/')
  const description = summary
    ? `${title}${english ? '. ' : '。'}${summary}`
    : english
      ? `${title} in the TaskHandoff user guide.`
      : `TaskHandoff 用户手册：${title}。`

  return truncateDescription(description, english ? 155 : 120)
}

function verificationHead() {
  const entries = [
    ['google-site-verification', process.env.GOOGLE_SITE_VERIFICATION],
    ['msvalidate.01', process.env.BING_SITE_VERIFICATION],
    ['baidu-site-verification', process.env.BAIDU_SITE_VERIFICATION]
  ]

  return entries
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, content]) => ['meta', { name, content }] as const)
}

const zhSidebar = [
  {
    text: '开始使用',
    items: [
      { text: '手册目录', link: '/manual' },
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
      { text: '聊天桥接', link: '/integrations/chat' }
    ]
  },
  {
    text: '远程访问',
    items: [
      { text: '远程访问总览', link: '/integrations/remote-access' },
      { text: 'Control Plane 公网访问', link: '/integrations/public-control-plane' },
      { text: '连接远程节点', link: '/integrations/remote-nodes' },
      { text: 'Thandoff 账户', link: '/integrations/thandoff-account' }
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
      { text: 'Guide Index', link: '/en/manual' },
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
      { text: 'Chat Bridges', link: '/en/integrations/chat' }
    ]
  },
  {
    text: 'Remote Access',
    items: [
      { text: 'Remote Access Overview', link: '/en/integrations/remote-access' },
      { text: 'Expose the Control Plane', link: '/en/integrations/public-control-plane' },
      { text: 'Connect Remote Nodes', link: '/en/integrations/remote-nodes' },
      { text: 'Thandoff Account', link: '/en/integrations/thandoff-account' }
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
  base,
  title: 'TaskHandoff 用户手册',
  description: 'TaskHandoff 安装、配置与日常使用指南',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#171717', media: '(prefers-color-scheme: dark)' }],
    ...verificationHead()
  ],
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteOrigin,
    lastmodDateOnly: true,
    transformItems: (items) => items.map((item) => {
      const route = new URL(item.url, siteOrigin).pathname
      const { chineseRoute, englishRoute } = localizedRoutes(route)

      return {
        ...item,
        links: [
          { lang: 'zh-CN', url: absoluteUrl(chineseRoute) },
          { lang: 'en-US', url: absoluteUrl(englishRoute) },
          { lang: 'x-default', url: absoluteUrl(chineseRoute) }
        ]
      }
    })
  },
  transformPageData(pageData) {
    if (!pageData.filePath || pageData.frontmatter.description) return
    return { description: descriptionFromSource(pageData.filePath, pageData.title) }
  },
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) {
      return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
    }

    const route = pageRoute(pageData.relativePath)
    const canonical = absoluteUrl(route)
    const { english, chineseRoute, englishRoute } = localizedRoutes(route)
    const locale = english ? 'en_US' : 'zh_CN'
    const alternateLocale = english ? 'zh_CN' : 'en_US'
    const inLanguage = english ? 'en-US' : 'zh-CN'
    const isHome = route === '/' || route === '/en/'
    const structuredData = isHome
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': `${siteOrigin}/#website`,
              name: 'TaskHandoff',
              url: siteOrigin
            },
            {
              '@type': 'SoftwareApplication',
              '@id': `${siteOrigin}/#software`,
              name: 'TaskHandoff',
              url: siteOrigin,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Windows, macOS, Linux, Web'
            },
            {
              '@type': 'WebPage',
              '@id': `${canonical}#webpage`,
              name: title,
              url: canonical,
              description,
              inLanguage,
              isPartOf: { '@id': `${siteOrigin}/#website` },
              about: { '@id': `${siteOrigin}/#software` }
            }
          ]
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: pageData.title,
          description,
          url: canonical,
          mainEntityOfPage: canonical,
          inLanguage,
          isPartOf: { '@id': `${siteOrigin}/#website` },
          publisher: {
            '@type': 'Organization',
            name: 'TaskHandoff',
            url: siteOrigin
          },
          ...(pageData.lastUpdated
            ? { dateModified: new Date(pageData.lastUpdated).toISOString() }
            : {})
        }

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: absoluteUrl(chineseRoute) }],
      ['link', { rel: 'alternate', hreflang: 'en-US', href: absoluteUrl(englishRoute) }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(chineseRoute) }],
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:site_name', content: 'TaskHandoff' }],
      ['meta', { property: 'og:locale', content: locale }],
      ['meta', { property: 'og:locale:alternate', content: alternateLocale }],
      ['meta', { property: 'og:image', content: socialImage }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1960' }],
      ['meta', { property: 'og:image:height', content: '1423' }],
      ['meta', { property: 'og:image:alt', content: english ? 'TaskHandoff workbench' : 'TaskHandoff 工作台' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImage }],
      ['meta', { name: 'twitter:image:alt', content: english ? 'TaskHandoff workbench' : 'TaskHandoff 工作台' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData).replace(/</g, '\\u003c')]
    ]
  },
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
    logo: {
      light: '/brand/task-handoff-light.svg',
      dark: '/brand/task-handoff-dark.svg',
      alt: 'TaskHandoff'
    },
    siteTitle: 'TaskHandoff',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/edgestorage/task-handoff' }
    ],
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
