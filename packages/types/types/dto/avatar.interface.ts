/** 头像 */
export interface IAvatarDto {
  /** 头像 */
  avatar: string
}

/** 头像（可选） */
export interface IAvatarOptionalDto extends Partial<IAvatarDto> {}
