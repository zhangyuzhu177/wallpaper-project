import type { ICategory } from 'types'
import { http } from '@/utils/http'

/**
 * 获取专题精选
 */
export function getSelectedTopicsApi() {
  return http.get<ICategory[]>('/wallpaper/category')
}
