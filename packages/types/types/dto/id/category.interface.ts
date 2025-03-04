/** 壁纸分类的唯一标识 */
export interface ICategoryIdDto {
  /** 壁纸分类的唯一标识 */
  categoryId: string
}

/** 壁纸分类的唯一标识（可选） */
export interface ICategoryIdOptionalDto extends Partial<ICategoryIdDto> {}
