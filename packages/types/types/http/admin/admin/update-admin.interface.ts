import type { IPasswordOptionalDto } from '../../../dto/password.interface'

import type { ICreateAdminBodyDto } from './create-admin.interface'

/**
 * 更新管理员
 * 请求参数
 */
export interface IUpdateAdminBodyDto
  extends
  Omit<
    ICreateAdminBodyDto,
    'password'
  >,
  IPasswordOptionalDto {}
