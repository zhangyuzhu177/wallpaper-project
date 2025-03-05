/** 阿里云验证码参数 */
export interface ICodeDto {
  /** 阿里云验证码参数 */
  code: string
}

export interface ICodeOptionalDto extends Partial<ICodeDto> { }
