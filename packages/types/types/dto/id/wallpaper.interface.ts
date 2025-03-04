/** 壁纸的唯一标识 */
export interface IWallpaperIdDto {
  /** 壁纸的唯一标识 */
  wallpaperId: string
}

/** 壁纸的唯一标识（可选） */
export interface IWallpaperIdOptionalDto extends Partial<IWallpaperIdDto> {}
