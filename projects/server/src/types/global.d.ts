/* eslint-disable no-var */
declare global {
  /** 服务版本号 */
  var version: string
  /** 全局路由前缀 */
  var prefix: string

  namespace NodeJS {
    /** 环境变量 */
    interface ProcessEnv {
      /** ---------- 服务器配置 ---------- */
      /** 服务启动端口（默认值：3000） */
      SERVER_PORT?: string | number
      /** 服务基础路径（默认值：`/`） */
      SERVER_BASE_PATH?: string

      /** ---------- 应用相关配置 ---------- */
      /** 应用名称 */
      APP_NAME: string
      /** 应用部署地址 */
      APP_URL: string

      /** ---------- Swagger Api 文档配置 ---------- */
      /** 是否开启 Api 文档 */
      SWAGGER_ENABLED?: string | boolean
      /** Api 文档标题（默认值：API） */
      SWAGGER_TITLE?: string
      /** Api 文档描述（默认值：API DOCS） */
      SWAGGER_DESC?: string
      /** Api 文档路径（默认值：`/docs`） */
      SWAGGER_PATH?: string

      /** ---------- 数据库配置 ---------- */
      /** 数据库地址（默认值：localhost） */
      DB_HOST?: string
      /** 数据库端口（默认值：3306） */
      DB_PORT?: string | number
      /** 数据库用户 */
      DB_USER: string
      /** 数据库密码 */
      DB_PSWD: string
      /** 数据库名称 */
      DB_NAME: string
      /** 数据库连接超时时间（单位：毫秒，默认值：60000） */
      DB_CONNECT_TIMEOUT?: string | number
      /** 数据库连接限制（默认值：100） */
      DB_CONN_LIMIT?: string | number
      /** 数据库是否开启 ORM 自动同步（默认值：false） */
      DB_ORM_ENABLE_SYNC?: string | boolean

      /** ---------- Redis 配置 ---------- */
      /** Redis 地址（默认值：localhost） */
      REDIS_HOST?: string
      /** Redis 端口（默认值：6379） */
      REDIS_PORT?: string | number
      /** Redis 用户名 */
      REDIS_USER?: string
      /** Redis 密码 */
      REDIS_PSWD?: string
      /** JWT 登录校验 Redis 数据库索引（默认值：0） */
      REDIS_AUTH_JWT_DB?: string | number
      /** 登录 ip 信息 Redis 数据库索引（默认值：1） */
      REDIS_AUTH_IP_DB?: string | number
      /** 验证码 Redis 数据库索引（默认值：2） */
      REDIS_CODE_DB?: string | number
      /** 每日推荐（默认值：3） */
      REDIS_RECOMMEND_DB?: string | number

      /** ---------- JWT 登录校验配置 ---------- */
      /** JWT 登录校验秘钥 */
      JWT_LOGIN_AUTH_SECRET: string
      /** JWT 登录校验过期时间（单位：秒，默认值：28800） */
      JWT_LOGIN_AUTH_EXPIRE_IN_SECONDS?: string | number

      /** ---------- 系统管理员配置 ---------- */
      /** 预置系统管理员（通过 `@` 分割账号密码，不同账号间通过 `,` 分割） */
      SYS_ADMIN: string
      /** 允许登录管理后台的 IP 白名单（通过 `-` 分割开始地址和结束地址，不同地址范围通过 `,` 分割） */
      SYS_IP_WHITE_LIST: string

      /** ---------- 邮件服务配置 ---------- */
      /** 邮件服务地址 */
      EMAIL_SMTP_HOST: string
      /** 邮件服务端口 */
      EMAIL_SMTP_PORT: string | number
      /** 邮件服务用户名（邮箱地址，多个地址间通过 `,` 分割） */
      EMAIL_SMTP_USER: string
      /** 邮件服务密码 */
      EMAIL_SMTP_PSWD: string
      /** 邮件服务是否使用安全模式连接（默认值：true） */
      EMAIL_SMTP_SECURE: string | boolean
      /** 单个邮箱的发送频率限制（单位：封/秒，默认值：2） */
      EMAIL_SEND_HZ_LIMIT?: string | number

      /** ---------- 阿里云手机短信服务配置 ---------- */
      /** 短息服务 AK */
      SMS_AK: string
      /** 短信服务 SK */
      SMS_SK: string
      /** 短信服务签名 */
      SMS_SIGN: string
      /** 验证码短信模板编号 */
      SMS_CODE_TEMPLATE: string
      /** 验证码短信签名 */
      SMS_CODE_SIGN?: string
      /** 认证通过短信模板编号 */
      SMS_VERIFY_APPROVE_TEMPLATE: string
      /** 认证通过短信签名 */
      SMS_VERIFY_APPROVE_SIGN?: string
      /** 认证驳回短信模板编号 */
      SMS_VERIFY_REJECT_TEMPLATE: string
      /** 认证驳回短信签名 */
      SMS_VERIFY_REJECT_SIGN?: string
      /** 认证过期短信模板编号 */
      SMS_VERIFY_EXPIRE_TEMPLATE: string
      /** 认证过期短信签名 */
      SMS_VERIFY_EXPIRE_SIGN?: string

      /** ---------- 阿里云验证码服务配置 ---------- */
      /** 验证码服务的 AK */
      CAPTCHA_AK: string
      /** 验证码服务的 SK */
      CAPTCHA_SK: string
      /** 验证码服务的场景ID */
      CAPTCHA_SERVICE_SCENE_ID: string
      /** 验证码服务的身份标 */
      CAPTCHA_SERVICE_PREFIX: string

      /** ---------- 阿里云 OSS 服务配置 ---------- */
      /** OSS 服务 AK */
      OSS_AK: string
      /** OSS 服务 SK */
      OSS_SK: string
      /** OSS 服务数据存储地区 */
      OSS_REGION: string
      /** OSS 服务是否使用安全模式连接（默认值：true） */
      OSS_SECURE: string | boolean
      /** OSS public 桶名 */
      OSS_BUCKET_PUBLIC: string
      /** OSS private 桶名 */
      OSS_BUCKET_PRIVATE: string

      /** ---------- ES 配置 ---------- */
      /** ES 服务地址 */
      ES_HOST: string
      /** ES 用户名 */
      ES_USER?: string
      /** ES 密码 */
      ES_PSWD?: string
      /** ES 数据日志索引 */
      ES_INDEX_DATA: string

      /** ---------- RSA密钥对 ---------- */
      /** 加密公钥 */
      RSA_PUBLIC_KEY?: string
      /** 解密私钥 */
      RSA_PRIVATE_KEY?: string

      /** ---------- 微信小程序登录 ---------- */
      /** 小程序 appId */
      WECHAT_APP_ID?: string
      /** 小程序 appSecret */
      WECHAT_APP_SECRET?: string
      /** 微信服务的请求接口 */
      WEIXIN_API_URL?: string
    }
  }
}
export {}
