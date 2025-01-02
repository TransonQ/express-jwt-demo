# 接口文档

# jwt-demo

Base URLs:

- <a href="http://localhost:3010">测试环境: http://localhost:3010</a>

# Authentication

# Default

## POST 登录

POST /login

> Body 请求参数

```json
{
  "username": "string"
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » username | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称           | 类型   | 必选 | 约束 | 中文名 | 说明 |
| -------------- | ------ | ---- | ---- | ------ | ---- |
| » accessToken  | string | true | none |        | none |
| » refreshToken | string | true | none |        | none |

## POST 获取 token

POST /token

> Body 请求参数

```json
{
  "refresh_token": "string"
}
```

### 请求参数

| 名称            | 位置 | 类型   | 必选 | 说明 |
| --------------- | ---- | ------ | ---- | ---- |
| body            | body | object | 否   | none |
| » refresh_token | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称           | 类型   | 必选 | 约束 | 中文名 | 说明 |
| -------------- | ------ | ---- | ---- | ------ | ---- |
| » accessToken  | string | true | none |        | none |
| » refreshToken | string | true | none |        | none |

## GET 需要 token 访问 protected

GET /protected

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| name          | query  | string | 否   | 名称 |
| Authorization | header | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "message": "string",
  "query": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型   | 必选 | 约束 | 中文名 | 说明       |
| --------- | ------ | ---- | ---- | ------ | ---------- |
| » message | string | true | none |        | none       |
| » query   | object | true | none |        | 查询字符串 |
