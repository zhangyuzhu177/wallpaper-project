/**
 * 发送邮箱验证码的目的
 */
export enum EmailCodeAction {
  // ---------- user 个人用户 ----------
  /** 个人用户注册 */
  USER_REGISTER = 'user-register',
  /** 个人用户登录 */
  USER_LOGIN = 'user-login',
  /** 个人用户修改密码 */
  USER_CHANGE_PASSWORD = 'user-change-password',
  /** 个人用户绑定邮箱 */
  USER_BIND_EMAIL = 'user-bind-email',
  /** 个人用户绑定微信 */
  USER_BIND_WEIXIN = 'user-bind-weixin',

  // ---------- admin 管理员 ----------
  /** 管理员登录 */
  ADMIN_LOGIN = 'admin-login',
  /** 管理员修改密码 */
  ADMIN_CHANGE_PASSWORD = 'admin-change-password',
  /** 管理员绑定微信 */
  ADMIN_BIND_WEIXIN = 'admin-bind-weixin',
}

/**
 * 发送邮箱验证码目的的描述
 */
export const emailCodeActionDescriptions: Record<EmailCodeAction, string> = {
  [EmailCodeAction.USER_REGISTER]: '个人用户注册',
  [EmailCodeAction.USER_LOGIN]: '个人用户登录',
  [EmailCodeAction.USER_CHANGE_PASSWORD]: '个人用户修改密码',
  [EmailCodeAction.USER_BIND_EMAIL]: '个人用户绑定邮箱',
  [EmailCodeAction.USER_BIND_WEIXIN]: '个人用户绑定微信',

  [EmailCodeAction.ADMIN_LOGIN]: '管理员登录',
  [EmailCodeAction.ADMIN_CHANGE_PASSWORD]: '管理员修改密码',
  [EmailCodeAction.ADMIN_BIND_WEIXIN]: '管理员绑定邮箱',
}
