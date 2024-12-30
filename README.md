## 功能说明

/login:

接收用户名生成 accessToken 和 refreshToken。
accessToken 有效期为 15 分钟，refreshToken 没有过期时间（实际场景需要数据库管理）。
/token:

根据有效的 refreshToken 生成新的 accessToken。
/protected:

验证 accessToken，只有通过验证的用户才能访问。

## 测试服务器

使用 Postman 或 cURL 测试以下流程：

登录获取 accessToken 和 refreshToken。
使用 accessToken 访问受保护路由。
在 accessToken 过期后，使用 refreshToken 获取新的 accessToken。

## 注意事项

在生产环境中，密钥 (ACCESS_TOKEN_SECRET 和 REFRESH_TOKEN_SECRET) 应存放在 .env 文件或其他安全的存储中。
refreshTokens 应存储在数据库中，而不是内存中。
此代码可扩展用于开发环境或学习使用 JWT 的基本原理。
