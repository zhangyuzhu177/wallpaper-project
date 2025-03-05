import type { IAdmin } from '../../../entities/admin.interface'
import type { IStatusOptionalDto } from '../../../dto/status.interface'

/**
 * 创建管理员
 * 请求参数
 */
export interface ICreateAdminBodyDto
  extends
  Pick<
    IAdmin,
    'name' | 'phone' | 'email'
    | 'password' | 'adminRoleId'
  >,
  IStatusOptionalDto {}
