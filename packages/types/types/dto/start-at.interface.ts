/** 开始时间 */
export interface IStartAtDto {
  /** 开始时间 */
  startAt: string | Date
}

/** 开始时间（可选） */
export interface IStartAtOptionalDto extends Partial<IStartAtDto> {}
