import { ConfigDto } from 'src/dto'
import type { IUpsertSysConfigBodyDto } from 'types'

/**
 * 创建/更新系统全局配置
 * 请求参数
 */
export class UpsertSysConfigBodyDto
  extends ConfigDto
  implements IUpsertSysConfigBodyDto {}
