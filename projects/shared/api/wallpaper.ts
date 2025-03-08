import type {
  IIdsDto,
  IQueryDto,
  IQueryPaginatedResData,
  IUpsertWallpaperBodyDto,
  IWallpaper,
} from 'types'
import { useRequest } from '../hooks/request'

const { $post, $delete } = useRequest()

/**
 * 查询壁纸列表
 */
export function wallpaperQueryApi(body: IQueryDto<IWallpaper>) {
  return $post<IQueryPaginatedResData<IWallpaper>>('/wallpaper/entity/query', body)
}

/**
 * 创建壁纸
 */
export function wallpaperCreateApi(body: IUpsertWallpaperBodyDto) {
  return $post<string>('/wallpaper/entity/create', body)
}

/**
 * 更新壁纸
 */
export function wallpaperUpdateApi(body: IUpsertWallpaperBodyDto, wallpaperId: string) {
  return $post<string>(`/wallpaper/entity/update/${wallpaperId}`, body)
}

/**
 * 删除壁纸
 */
export function wallpaperDeleteApi(body: IIdsDto) {
  return $delete<number>('/wallpaper/entity/delete', body)
}

/**
 * 删除指定壁纸
 */
export function wallpaperDeleteByIdApi(wallpaperId: string) {
  return $delete<number>(`/wallpaper/entity/delete/${wallpaperId}`)
}
