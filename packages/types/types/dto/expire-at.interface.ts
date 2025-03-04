/** 过期时间 */
export interface IExpireAtDto {
  /** 过期时间 */
  expireAt: string | Date
}

/** 过期时间（可选） */
export interface IExpireAtOptionalDto extends Partial<IExpireAtDto> {}
