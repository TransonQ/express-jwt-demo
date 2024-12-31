// 引入必要的模块
import bodyParser from 'body-parser'; // 解析请求体
import cors from 'cors'; // 跨域资源共享
import dotenv from 'dotenv'; // 加载环境变量
import express from 'express'; // Express 框架
import jwt from 'jsonwebtoken'; // 生成和验证 JWT

dotenv.config(); // 加载 .env 文件中的环境变量

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
app.use(cors()); // 使用 cors 中间件

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
const PORT = process.env.PORT;

// 存储 Refresh Token 的模拟数据库
const RefreshTokensDB = [];

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
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });

  // 生成 Refresh Token
  const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  RefreshTokensDB.push(refreshToken); // 存储 Refresh Token

  res.json({ accessToken, refreshToken });
});

// 刷新 Access Token 的接口
app.post('/token', (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(401).json({ error: '缺少 Refresh Token' });
  }

  if (!RefreshTokensDB.includes(refresh_token)) {
    return res.status(403).json({ error: '无效的 Refresh Token' });
  }

  try {
    const user = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET); // 验证 Refresh Token
    const accessToken = jwt.sign(
      { username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    ); // 生成新的 Access Token
    const refreshToken = jwt.sign(
      { username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    ); // 生成新的 Refresh Token
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(403).json({ error: '无效的 Refresh Token' });
  }
});

// 测试访问受保护的路由
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader;

  if (!token) {
    return res.status(401).json({ error: '缺少 Access Token' });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ error: '无效的 Access Token' });
      }
      req.user = user;
      const query = req.query;
      res.json({ message: `欢迎, ${user.username}`, query });
    }); // 验证 Access Token
  } catch (err) {
    res.status(403).json({ error: '无效的 Access Token' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
