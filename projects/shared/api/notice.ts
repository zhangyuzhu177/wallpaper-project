import type {
  IChangeStatusBodyDto,
  INotice,
  IQueryDto,
  IQueryPaginatedResData,
  IUpsertNoticeBodyDto,
} from 'types'
import { useRequest } from '../hooks/request'

const { $post } = useRequest()

/**
 * 查询公告列表
 */
export function noticeQueryApi(body: IQueryDto<INotice>) {
  return $post<IQueryPaginatedResData<INotice>>('/notice/query', body)
}

/**
 * 创建公告信息
 */
export function noticeCreateApi(body: IUpsertNoticeBodyDto) {
  return $post<string>('/notice/create', body)
}

/**
 * 更新公告信息
 */
export function noticeUpdateApi(noticeId: string, body: IUpsertNoticeBodyDto) {
  return $post<string>(`/notice/update/${noticeId}`, body)
}

/**
 * 批量删除公告信息
 */
export function noticeDeleteApi(ids: string[]) {
  return $post<number>('/notice/delete', { ids })
}

/**
 * 批量修改公告状态
 */
export function noticeChangeStatusApi(body: IChangeStatusBodyDto) {
  return $post<number>('/notice/status', body)
}

/**
 * 同步公告列表
 */
export function noticeSyncApi() {
  return $post<number>('/notice/sync')
}
