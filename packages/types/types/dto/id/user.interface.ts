/** 个人用户的唯一标识 */
export interface IUserIdDto {
  /** 个人用户的唯一标识 */
  userId: string
}

/** 个人用户的唯一标识（可选） */
export interface IUserIdOptionalDto extends Partial<IUserIdDto> {}
