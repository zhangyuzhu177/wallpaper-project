import type { INotice } from '../../entities/notice.interface'

/**
 * 创建/更新公告信息
 * 请求参数
 */
export interface IUpsertNoticeBodyDto
  extends
  Pick<
    INotice,
    'title' | 'content' | 'order' | 'date' | 'status'
  > {}
