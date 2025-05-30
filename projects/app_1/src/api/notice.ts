import type { INotice } from 'types'

/**
 * 获取公告列表
 */
export function getNoticeListApi() {
  return request<INotice[]>({
    url: '/notice',
  })
}

/**
 * 获取公告详情
 */
export function getNoticeDetailApi(id: string) {
  return request<INotice>({
    url: `/notice/${id}`,
  })
}
