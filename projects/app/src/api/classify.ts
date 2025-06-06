import type { ICategory, IStatusOptionalDto } from 'types'
import { http } from '@/utils/http'

/**
 * 获取分类列表
 */
export function getClassifyListApi(body: IStatusOptionalDto) {
  return http.post<ICategory[]>('/wallpaper/category/list', body)
}
