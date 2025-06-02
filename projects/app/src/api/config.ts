import { Config } from 'types'
import type { IConfigDto } from 'types'
import { http } from '@/utils/http'

/**
 * 获取轮播图配置
 */
export function getBannerConfigApi() {
  return http.get<IConfigDto[Config.BANNER_CONFIG]>(`/sys-config/${Config.BANNER_CONFIG}`)
}
