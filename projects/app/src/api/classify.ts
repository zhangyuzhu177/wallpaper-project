import type { ICategory } from 'types'

/**
 * 获取分类列表
 */
export function getCategoryListApi() {
  return request<ICategory[]>({
    url: '/wallpaper/category',
  })
}
