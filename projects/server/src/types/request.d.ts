interface ExtendRequest extends Request {
  /** 中间件捕获的 IP 地址 */
  ip: string | null

  /** 当前登录的个人用户信息 */
  user?: import('src/entities').User
  /** 当前登录的管理员信息 */
  admin?: import('src/entities').Admin

  /** 当前登入的用户类型 */
  userType?: import('types').UserType

  /** 当前登录用户的 token 凭证 */
  token?: string
  /** 标记 token 是否过期 */
  tokenExpired?: boolean
  /** 标记 token 是否被禁用 */
  tokenDisable?: boolean
  /** 标记 token 是否在其他设备登录 */
  tokenLoginOther?: boolean
}

declare interface FastifyRequest extends ExtendRequest {
  raw: ExtendRequest
}
