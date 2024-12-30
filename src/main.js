// 引入必要的模块
import express from 'express'; // Express 框架
import jwt from 'jsonwebtoken'; // 生成和验证 JWT
import bodyParser from 'body-parser'; // 解析请求体

/** 
 * 功能说明
/login:
接收用户名生成 accessToken 和 refreshToken。
accessToken 有效期为 15 分钟，refreshToken 没有过期时间（实际场景需要数据库管理）。

/token:
根据有效的 refreshToken 生成新的 accessToken。

/protected:
验证 accessToken，只有通过验证的用户才能访问。
 */

// 初始化 Express 应用
const app = express();
app.use(bodyParser.json());

// 模拟的密钥（生产环境下请存放在环境变量中）
const ACCESS_TOKEN_SECRET = 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret';

// 存储 Refresh Token 的模拟数据库
const refreshTokens = [];

// 根路由是测试路由
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// 登录接口，生成 AccessToken 和 RefreshToken
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: '用户名是必填的' });
  }

  // 生成 Access Token
  const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });

  // 生成 Refresh Token
  const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // 存储 Refresh Token

  res.json({ accessToken, refreshToken });
});

// 刷新 Access Token 的接口
app.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: '缺少 Refresh Token' });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ error: '无效的 Refresh Token' });
  }

  try {
    const user = jwt.verify(token, REFRESH_TOKEN_SECRET); // 验证 Refresh Token
    const accessToken = jwt.sign(
      { username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    ); // 生成新的 Access Token
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: '无效的 Refresh Token' });
  }
});

// 测试访问受保护的路由
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '缺少 Access Token' });
  }

  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET); // 验证 Access Token
    res.json({ message: `欢迎, ${user.username}` });
  } catch (err) {
    res.status(403).json({ error: '无效的 Access Token' });
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
