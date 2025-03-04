/** 管理员角色的唯一标识 */
export interface IAdminRoleIdDto {
  /** 管理员角色的唯一标识 */
  adminRoleId: string
}

/** 管理员角色的唯一标识（可选） */
export interface IAdminRoleIdOptionalDto extends Partial<IAdminRoleIdDto> { }
