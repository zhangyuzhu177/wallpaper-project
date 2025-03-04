/** 账号 */
export interface IAccountDto {
  /** 名称 */
  account: string
}

/** 名称（可选） */
export interface IAccountOptionalDto extends Partial<IAccountDto> { }
