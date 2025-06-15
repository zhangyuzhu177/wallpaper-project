import type {
  ICollection,
  IDownloadRecord,
  IQueryDto,
  IQueryPaginatedResData,
} from 'types'

import { useRequest } from '../hooks/request'

const { $get, $post } = useRequest()

export interface ICategoryWallpaperCountResData {
  name: string
  value: number
}

export interface ICategoryDownloadCountResData {
  header: string[]
  data: number[]
}

export interface IUserActionCountResData {
  header: string[]
  data: number[][]
}

/**
 * 获取下载记录日志
 */
export function getDownloadLogApi(body: IQueryDto<IDownloadRecord>) {
  return $post<IQueryPaginatedResData<IDownloadRecord>>('/log/download-record/query', body)
}

/**
 * 获取收藏记录日志
 */
export function getCollectionLogApi(body: IQueryDto<ICollection>) {
  return $post<IQueryPaginatedResData<ICollection>>('/log/collection-record/query', body)
}

/**
 * 获取分类下壁纸数量占比统计
 */
export function getCategoryWallpaperCountApi() {
  return $get<ICategoryWallpaperCountResData[]>('/log/category-wallpaper-count')
}

/**
 * 获取分类下载壁纸次数统计
 */
export function getCategoryDownloadCountApi() {
  return $get<ICategoryDownloadCountResData[]>('/log/category-download-count')
}

/**
 * 获取30天用户下载收藏行为统计
 */
export function getUserActionCountApi() {
  return $get<IUserActionCountResData[]>('/log/user-action-count')
}
