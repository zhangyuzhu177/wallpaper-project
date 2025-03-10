/** 下载记录的唯一标识 */
export interface IDownloadRecordIdDto {
  /** 下载记录的唯一标识 */
  downloadRecordId: string
}

/** 下载记录的唯一标识（可选） */
export interface IDownloadRecordIdOptionalDto extends Partial<IDownloadRecordIdDto> {}
