import { defineConfigWithTheme } from 'vitepress'
import type { Config } from 'vitepress'

export default defineConfigWithTheme({
  appElement: '#app',
  appElementClasses: ['app-container'],

  lang: 'zh-CN',
  title: 'Edgeless Wiki',
  description: '开源协作文档平台',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装配置', link: '/guide/installation' },
            { text: '贡献指南', link: '/guide/contributing' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概述', link: '/api/' },
            { text: '核心接口', link: '/api/core' },
          ],
        },
      ],
      '/': [
        {
          text: '文档',
          items: [
            { text: '首页', link: '/' },
            { text: '使用指南', link: '/guide/getting-started' },
            { text: 'API 参考', link: '/api/' },
            { text: '关于', link: '/about/' },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/kuaile8/wiki/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'medium',
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kuaile8/wiki' },
    ],

    footer: {
      message: '基于 Edgeless Wiki 构建',
      copyright: 'Copyright © 2026 Edgeless Team',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },
  },
})
