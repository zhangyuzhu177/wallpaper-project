/** 数据权限（数据板块、数据库、数据目录的 id） */
export interface IPermissionsDto {
  /** 数据权限（数据板块、数据库、数据目录的 id） */
  permissions: string[]
}

/** 数据权限（数据板块、数据库、数据目录的 id）（可选） */
export interface IPermissionsOptionalDto extends Partial<IPermissionsDto> {}
