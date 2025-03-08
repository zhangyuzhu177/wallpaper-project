import type { Config, IConfigDto, IUpsertSysConfigBodyDto } from 'types'
import { useRequest } from '../hooks/request'

const { $get, $post } = useRequest()

/**
 * 获取指定系统全局配置
 */
export function sysConfigGetApi<T extends Config>(sysConfigId: T) {
  return $get<IConfigDto[T] | null>(`/sys-config/${sysConfigId}`)
}

/**
 * 创建或更新系统全局配置
 */
export function sysConfigUpsertApi<T extends Config>(
  sysConfigId: T,
  body: Required<
    Pick<IUpsertSysConfigBodyDto, T>
  >,
) {
  return $post<T>(`/sys-config/upsert/${sysConfigId}`, body)
}
