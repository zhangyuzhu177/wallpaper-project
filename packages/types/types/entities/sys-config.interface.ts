import type { IConfigDto } from '../dto/config.interface'
import type { ISysConfigIdDto } from '../dto/id/sys-config.interface'
import type { Config } from '../enum/config.enum'

import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 系统全局配置
 */
export interface ISysConfig<T extends Config>
  extends
  ICreatedAt,
  IUpdatedAt {
  /** 系统全局配置的唯一标识 */
  id: ISysConfigIdDto<T>['sysConfigId']
  /** 系统全局配置 */
  config: IConfigDto[T]
  /** 最后一次修改的管理员姓名 */
  adminName?: string
}
