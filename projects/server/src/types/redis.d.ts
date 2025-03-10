/** Redis 存储类型 */
const enum RedisType {
  /** 登录 token 缓存 */
  AUTH_JWT = 'auth-jwt',
  /** 登录 ip 信息缓存 */
  AUTH_IP = 'auth-ip',
  /** 验证码缓存 */
  CODE = 'code',
  /** 每日推荐 */
  RECOMMEND = 'recommend',
}
