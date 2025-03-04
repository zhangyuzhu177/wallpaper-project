import type { Config } from '../../enum/config.enum'

/** 系统全局配置的唯一标识 */
export interface ISysConfigIdDto<T = Config> {
  /** 系统全局配置的唯一标识 */
  sysConfigId: T
}

/** 系统全局配置的唯一标识（可选） */
export interface ISysConfigIdOptionalDto<T = Config> extends Partial<ISysConfigIdDto<T>> { }
