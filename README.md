## 功能说明

- [接口文档](./backend/README.md)

- /login:

接收用户名生成 accessToken 和 refreshToken。
accessToken 有效期为 `ACCESS_TOKEN_EXPIRATION` 分钟，refreshToken 为 `REFRESH_TOKEN_EXPIRATION`

- /token:

根据有效的 refreshToken 生成新的 accessToken。

- /protected:

验证 accessToken，只有通过验证的用户才能访问。
