# Task Handoff Docs

基于 VitePress 的 TaskHandoff 中英文用户手册。

## 本地开发

```bash
npm install
npm run docs:dev
```

## 构建与预览

```bash
npm run docs:build
npm run docs:preview
npm run docs:check-seo
```

`docs:check-seo` 会重新构建站点，并检查所有可索引页面的核心 SEO 标签、结构化数据、sitemap 和 404 索引策略。

中文手册位于 `docs/`，英文手册位于 `docs/en/`。新增页面后，请同步更新另一种语言的同名页面，以及 `docs/.vitepress/config.mts` 中对应语言的导航或侧边栏。

## 搜索引擎收录

站点构建会自动生成 `sitemap.xml`、canonical、中文/英文 `hreflang`、页面摘要、社交分享标签和结构化数据。`docs/public/robots.txt` 会随站点一起发布。

部署后完成以下一次性设置：

1. 在 Google Search Console、Bing Webmaster Tools 和百度搜索资源平台添加 `https://docs.thandoff.com`。
2. 将平台提供的 HTML meta 验证值分别保存为仓库 Secrets：`GOOGLE_SITE_VERIFICATION`、`BING_SITE_VERIFICATION`、`BAIDU_SITE_VERIFICATION`。
3. 重新运行 Pages 部署，并在各平台提交 `https://docs.thandoff.com/sitemap.xml`。
4. 检查首页、安装指南和中英文对应页面的索引状态。平台未提供某项验证值时，可不设置对应 Secret。
