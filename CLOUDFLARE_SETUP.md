# Cloudflare Worker OAuth 部署指南

## 1. 注册 GitHub OAuth App

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **New OAuth App**
3. 填写：
   - **Application name**: Edgeless Wiki Auth
   - **Homepage URL**: https://yourdomain.com
   - **Authorization callback URL**: https://your-worker.workers.dev/auth/callback
4. 点击 **Register application**
5. 记录 **Client ID** 和生成 **Client Secret**

## 2. 部署 Cloudflare Worker

### 安装 Wrangler

`npm install -g wrangler`

### 登录

`wrangler login`

### 配置

创建 `wrangler.toml` 文件：

```toml
name = "edgeless-wiki-auth"
main = "cloudflare-worker-oauth.js"
compatibility_date = "2024-01-01"

[vars]
WORKER_URL = "https://edgeless-wiki-auth.your-account.workers.dev"

[secrets]
GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = ""
```

### 部署

`npx wrangler deploy`

## 3. 配置环境变量

在 Cloudflare Dashboard 中为 Worker 设置：

| 变量名 | 值 |
|--------|-----|
| GITHUB_CLIENT_ID | 你的 GitHub OAuth Client ID |
| GITHUB_CLIENT_SECRET | 你的 GitHub OAuth Client Secret |
| WORKER_URL | Worker 的完整 URL |

## 4. 前端集成

在 VitePress 页面中添加登录按钮，参考 cloudflare-worker-oauth.js 中的示例代码。

## 5. 测试

1. 访问你的 Worker URL 查看登录页面
2. 点击"使用 GitHub 登录"
3. 授权后应重定向回原页面并显示用户信息
