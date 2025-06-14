import type { ICollection, IDownloadRecord, IQueryDto, IQueryPaginatedResData } from 'types'
import { useRequest } from '../hooks/request'

const { $post } = useRequest()

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
