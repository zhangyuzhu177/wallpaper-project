import type { INotice } from 'types'
import { http } from '@/utils/http'

/**
 * 获取公告列表
 */
export function getNoticeListApi() {
  return http.get<INotice[]>('/notice')
}

/**
 * 获取公告详情
 */
export function getNoticeDetailApi(id: string) {
  return http.get<INotice>(`/notice/${id}`)
}
