/** 收藏的唯一标识 */
export interface ICollectionIdDto {
  /** 收藏的唯一标识 */
  collectionId: string
}

/** 收藏的唯一标识（可选） */
export interface ICollectionIdOptionalDto extends Partial<ICollectionIdDto> {}
