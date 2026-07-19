// Cloudflare Worker - GitHub OAuth 登录代理
// 使用方法: npx wrangler deploy
//
// 需要在 Cloudflare 环境变量中配置:
// - GITHUB_CLIENT_ID: GitHub OAuth App 的 Client ID
// - GITHUB_CLIENT_SECRET: GitHub OAuth App 的 Client Secret
// - WORKER_URL: Worker 的 URL (用于 callback)

const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const WORKER_URL = env.WORKER_URL || '';

const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_API_URL = 'https://api.github.com/user';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/auth/github') {
      const redirectUrl = new URL(AUTH_URL);
      redirectUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
      redirectUrl.searchParams.set('redirect_uri', `${WORKER_URL}/auth/callback`);
      redirectUrl.searchParams.set('state', generateState());
      return Response.redirect(redirectUrl.toString(), 302);
    }

    if (url.pathname === '/auth/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!code) {
        return new Response('授权失败: 缺少 code 参数', { status: 400 });
      }

      if (!verifyState(state)) {
        return new Response('授权失败: state 验证错误', { status: 403 });
      }

      const token = await exchangeCodeForToken(code);
      const user = await getUserInfo(token);

      const response = new Response('<h1>登录成功!</h1><p>正在跳转...</p>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });

      response.headers.set('Set-Cookie',
        `github_user=${encodeURIComponent(JSON.stringify(user))}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`);

      const redirectUrl = state.split('|')[1] || '/';
      response.headers.set('Location', redirectUrl);
      response.status = 302;
      return response;
    }

    if (url.pathname === '/auth/logout') {
      const response = new Response('<h1>已退出登录</h1>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
      response.headers.set('Set-Cookie', 'github_user=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
      return response;
    }

    return new Response(getLoginPageHtml(), {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
};

function generateState() {
  const random = Math.random().toString(36).substring(2);
  const timestamp = Date.now().toString(36);
  return `${random}|${timestamp}`;
}

function verifyState(state) {
  if (!state || !state.includes('|')) return false;
  const parts = state.split('|');
  const timestamp = parseInt(parts[1], 36);
  return Date.now() - timestamp * 1000 < 600000;
}

async function exchangeCodeForToken(code) {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: `${WORKER_URL}/auth/callback`
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(`Token exchange failed: ${data.error}`);
  return data.access_token;
}

async function getUserInfo(token) {
  const response = await fetch(USER_API_URL, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error('Failed to fetch user info');
  return await response.json();
}

function getLoginPageHtml() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>GitHub 登录</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .login-box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; background: #24292e; color: white; text-decoration: none; border-radius: 6px; font-size: 16px; }
    .btn:hover { background: #000; }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>Edgeless Wiki</h2>
    <p>使用 GitHub 账号登录</p>
    <a href="/auth/github" class="btn">使用 GitHub 登录</a>
  </div>
</body>
</html>`;
}
