import type {
  ICategory,
  IIdsDto,
  IQueryDto,
  IQueryPaginatedResData,
  IUpsertCategoryBodyDto,
} from 'types'
import { useRequest } from '../hooks/request'

const { $post, $delete } = useRequest()

/**
 * 查询分类列表
 */
export function categoryQueryApi(body: IQueryDto<ICategory>) {
  return $post<IQueryPaginatedResData<ICategory>>('/wallpaper/category/query', body)
}

/**
 * 创建分类
 */
export function categoryCreateApi(body: IUpsertCategoryBodyDto) {
  return $post<string>('/wallpaper/category/create', body)
}

/**
 * 更新分类
 */
export function categoryUpdateApi(body: IUpsertCategoryBodyDto, categoryId: string) {
  return $post<string>(`/wallpaper/category/update/${categoryId}`, body)
}

/**
 * 删除分类
 */
export function categoryDeleteApi(body: IIdsDto) {
  return $delete<number>('/wallpaper/category/delete', body)
}

/**
 * 删除指定分类
 */
export function categoryDeleteByIdApi(categoryId: string) {
  return $delete<number>(`/wallpaper/category/delete/${categoryId}`)
}
