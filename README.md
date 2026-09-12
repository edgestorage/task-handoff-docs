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
```

中文手册位于 `docs/`，英文手册位于 `docs/en/`。新增页面后，请同步更新另一种语言的同名页面，以及 `docs/.vitepress/config.mts` 中对应语言的导航或侧边栏。
