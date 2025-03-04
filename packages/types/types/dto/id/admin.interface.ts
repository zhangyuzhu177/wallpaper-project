/** 管理员的唯一标识 */
export interface IAdminIdDto {
  /** 管理员的唯一标识 */
  adminId: string
}

/** 管理员的唯一标识（可选） */
export interface IAdminIdOptionalDto extends Partial<IAdminIdDto> {}
