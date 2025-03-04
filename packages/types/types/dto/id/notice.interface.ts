/** 公告的唯一标识 */
export interface INoticeIdDto {
  /** 公告的唯一标识 */
  noticeId: string
}

/** 公告的唯一标识（可选） */
export interface INoticeIdOptionalDto extends Partial<INoticeIdDto> {}
