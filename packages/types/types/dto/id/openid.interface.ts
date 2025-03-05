/** 微信openid */
export interface IOpenIdDto {
  /** 微信openid */
  openid: string
}

/** 微信openid（可选） */
export interface IOpenIdOptionalDto extends Partial<IOpenIdDto> {}
