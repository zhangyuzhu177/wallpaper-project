import type { INoticeIdDto } from '../dto/id/notice.interface'
import type { IOrderOptionalDto } from '../dto/order.interface'
import type { IStatusDto } from '../dto/status.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 公告
 */
export interface INotice
  extends
  ICreatedAt,
  IUpdatedAt,
  IOrderOptionalDto,
  IStatusDto {
  /** 公告的唯一标识 */
  id: INoticeIdDto['noticeId']
  /** 公告标题 */
  title: string
  /** 公告内容 */
  content: string
  /** 发布日期 */
  date: string | Date
  /** 最后一次修改的管理员姓名 */
  adminName?: string
}
