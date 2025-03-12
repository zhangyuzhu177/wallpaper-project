import type { IConfigDto } from 'types'
import { Config } from 'types'
import { request } from '.'

/**
 * 获取轮播图配置
 */
export function getBannerConfigApi() {
  return request<IConfigDto[Config.BANNER_CONFIG]>({
    url: `/sys-config/${Config.BANNER_CONFIG}`,
    method: 'GET',
  })
}
