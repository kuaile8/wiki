# Edgeless Wiki

> 基于 VitePress 的开源协作文档网站

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VitePress](https://img.shields.io/badge/VitePress-1.6+-67a0ff)](https://vitepress.dev)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-blue)](https://pages.github.com)

## 功能特性

- **基于 VitePress** - 快速构建、美观默认主题、Markdown 优先
- **开放协作** - 每页底部"在 GitHub 上编辑此页"，支持 Fork + PR
- **自动部署** - GitHub Actions 自动构建并发布到 GitHub Pages
- **自定义域名** - 支持绑定自定义域名 + Cloudflare CDN 加速
- **GitHub OAuth** - 可选的 GitHub 登录功能（需配置 Cloudflare Worker）

## 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- Git

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run docs:dev

# 3. 构建生产版本
npm run docs:build

# 4. 预览构建结果
npm run docs:preview
```

访问 http://localhost:5173 查看效果。

## 参与贡献

欢迎通过 Fork + Pull Request 的方式贡献内容！

### 协作流程

1. **Fork** 本仓库到你的 GitHub 账户
2. **克隆** 到你的本地: `git clone https://github.com/kuaile8/wiki.git`
3. **创建分支**: `git checkout -b feature/your-feature-name`
4. **编辑文档** - 在 `docs/` 目录下修改或新增 Markdown 文件
5. **提交并推送**: `git add . && git commit -m "feat: 添加 XXX" && git push`
6. **创建 Pull Request** - 在 GitHub 上提交 PR

### 文档规范

- 文件名使用小写英文，单词间用连字符分隔（如 `getting-started.md`）
- 代码块请标注语言类型
- 保持标题层级一致

## 部署

### 自动部署（推荐）

1. 在 GitHub 仓库设置中启用 **Pages**
2. 来源选择 **GitHub Actions**
3. 推送代码到 `main` 分支会自动触发部署
4. 访问 `https://YOUR_USERNAME.github.io/REPO_NAME/`

## 自定义域名 & CDN 加速（可选）

### 绑定自定义域名

1. 在 GitHub 仓库 Settings > Pages > Custom domain 中输入域名
2. 在 DNS 服务商处添加 CNAME 记录指向 `YOUR_USERNAME.github.io`

### Cloudflare CDN 加速

1. 在 Cloudflare 添加域名
2. 将 DNS 记录指向 GitHub Pages IP
3. 开启 CDN 加速

## GitHub OAuth 登录（可选）

### 前置准备

1. 在 [GitHub Developer Settings](https://github.com/settings/developers) 注册 OAuth App
2. 获取 Client ID 和 Client Secret
3. 设置 Authorization callback URL 为你的 Worker URL

### 部署 Cloudflare Worker

```bash
npm install -g wrangler
wrangler login
npx wrangler deploy
```

详细配置请参考 [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)。

## 项目结构

```
my-docs/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 部署配置
├── .vitepress/
│   ├── config.js           # VitePress 主配置
│   └── theme/
│       └── index.js        # 自定义主题
├── docs/
│   ├── index.md            # 首页
│   ├── guide/              # 使用指南
│   ├── api/                # API 参考
│   ├── about/              # 关于页面
│   └── public/             # 静态资源
├── cloudflare-worker-oauth.js  # OAuth Worker 脚本
├── package.json
└── README.md
```

## 许可证

[MIT](LICENSE)
