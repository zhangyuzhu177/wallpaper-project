/**
 * 错误码
 */
export enum ErrorCode {
  // ---------- 通用错误码 ----------
  /** 未知错误 */
  COMMON_UNEXPECTED_ERROR = 100001,
  /** 参数校验错误 */
  COMMON_PARAMS_NOT_VALID = 100002,
  /** 未定义的错误码 */
  COMMON_ERROR_CODE_NOT_DEFINED = 100003,
  /** 未实现的功能 */
  COMMON_NOT_IMPLEMENTED = 100004,
  /** 已废弃的功能 */
  COMMON_DEPRECATED = 100005,

  // ---------- 权限相关错误码 ----------
  /** 没有相关权限 */
  PERMISSION_DENIED = 200001,

  // ---------- 短信相关错误码 ----------
  /** 短信发送失败 */
  SMS_SEND_FAIL = 300001,

  // ---------- 全局配置相关错误码 ----------
  /** 全局配置不存在 */
  SYS_CONFIG_NOT_EXISTS = 400001,

  // ---------- 公告管理相关错误码 ----------
  /** 公告不存在 */
  NOTICE_NOT_EXISTS = 500001,

  // ---------- 用户认证相关错误码 ----------
  /** 用户未登录 */
  AUTH_NOT_LOGIN = 600001,
  /** 登录过期 */
  AUTH_LOGIN_EXPIRED = 600002,
  /** 账号已在其他设备登录 */
  AUTH_ACCOUNT_LOGIN_OTHER = 600003,
  /** 账号已被停用 */
  AUTH_ACCOUNT_IS_DISABLE = 600004,

  /** 密码错误 */
  AUTH_PASSWORD_NOT_MATCHED = 600101,
  /** 验证码错误 */
  AUTH_CODE_NOT_MATCHED = 600102,

  /** 账号未注册 */
  AUTH_ACCOUNT_NOT_REGISTERED = 600201,
  /** 账号已被注册 */
  AUTH_ACCOUNT_REGISTERED = 600202,
  /** 账号不存在 */
  AUTH_ACCOUNT_NOT_EXISTS = 600203,
  /** 账号已存在 */
  AUTH_ACCOUNT_EXISTS = 600303,
  /** 账号不匹配 */
  AUTH_ACCOUNT_NOT_MATCHED = 600304,

  /** 手机号未注册 */
  AUTH_PHONE_NOT_REGISTERED = 600401,
  /** 手机号已被注册 */
  AUTH_PHONE_REGISTERED = 600402,
  /** 手机号不存在 */
  AUTH_PHONE_NOT_EXISTS = 600403,
  /** 手机号已存在 */
  AUTH_PHONE_EXISTS = 600404,
  /** 手机号不匹配 */
  AUTH_PHONE_NOT_MATCHED = 600405,

  /** 邮箱未注册 */
  AUTH_EMAIL_NOT_REGISTERED = 600501,
  /** 邮箱已被注册 */
  AUTH_EMAIL_REGISTERED = 600502,
  /** 邮箱不存在 */
  AUTH_EMAIL_NOT_EXISTS = 600503,
  /** 邮箱已存在 */
  AUTH_EMAIL_EXISTS = 600504,
  /** 邮箱不匹配 */
  AUTH_EMAIL_NOT_MATCHED = 600505,

  // ---------- 管理员相关错误码 ----------
  /** 管理员不存在 */
  ADMIN_NOT_EXISTS = 700001,
  /** 管理员已存在 */
  ADMIN_EXISTS = 700002,
  /** 禁止更新系统管理员 */
  ADMIN_UPDATE_DISABLE = 700003,
  /** 禁止删除系统管理员 */
  ADMIN_DELETE_DISABLE = 700004,

  // ---------- 管理员角色相关错误码 ----------
  /** 管理员角色名已存在 */
  ADMIN_ROLE_NAME_EXISTS = 800001,
  /** 管理员角色不存在 */
  ADMIN_ROLE_NOT_EXISTS = 800002,
  /** 禁止更新默认管理员角色 */
  ADMIN_ROLE_UPDATE_DISABLE = 800003,
  /** 禁止删除默认管理员角色 */
  ADMIN_ROLE_DELETE_DISABLE = 800004,
  /** 管理员角色已被分配 */
  ADMIN_ROLE_IN_USAGE = 800005,
  /** 禁止更新系统管理员的角色 */
  ADMIN_ROLE_UPDATE_SYS_ADMIN_DISABLE = 800006,

  // ---------- 个人用户相关错误码 ----------
  /** 用户不存在 */
  USER_NOT_EXISTS = 900001,
  /** 用户已存在 */
  USER_EXISTS = 900002,

  // ---------- 壁纸分类相关错误码 ----------
  /** 分类不存在 */
  CATEGORY_NOT_EXISTS = 110001,
  /** 分类已存在 */
  CATEGORY_EXISTS = 110002,
  /** 分类已关联壁纸 */
  CATEGORY_IN_USAGE = 110003,

  // ---------- 壁纸相关错误码 ----------
  /** 壁纸不存在 */
  WALLPAPER_NOT_EXISTS = 120001,
}

export type ErrorMessageCollection = Partial<
  Record<
    ErrorCode,
    {
      httpStatus: import('@nestjs/common').HttpStatus
      message: string
    }
  >
>
