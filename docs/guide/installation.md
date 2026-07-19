# 安装配置

## 项目初始化

如果你是从零开始搭建，可以按照以下步骤：

```bash
# 创建新项目
npm create vitepress@latest my-docs

# 进入项目目录
cd my-docs

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

## 目录结构

```
my-docs/
├── docs/
│   ├── index.md           # 首页
│   ├── guide/             # 指南目录
│   │   ├── getting-started.md
│   │   └── installation.md
│   └── .vitepress/        # VitePress 配置
│       ├── config.js      # 主配置文件
│       └── theme/         # 自定义主题
├── package.json
└── README.md
```

## 配置文件详解

### .vitepress/config.js

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的文档',
  description: '文档描述',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],
    
    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/getting-started' },
      ],
    },
  },
})
```

## 自定义主题

VitePress 允许你通过 `.vitepress/theme/index.js` 扩展默认主题：

```javascript
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // app.component('CustomComponent', CustomComponent)
  },
}
```