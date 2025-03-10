import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _wallpaperErrors: ErrorMessageCollection = {
  [ErrorCode.WALLPAPER_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '壁纸不存在',
  },
  [ErrorCode.WALLPAPER_DOWNLOAD_LIMIT_EXCEED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '下载壁纸次数超出限制',
  },
  [ErrorCode.WALLPAPER_COLLECTION_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '壁纸未收藏',
  },
  [ErrorCode.WALLPAPER_COLLECTION_EXISTS]: {
    httpStatus: HttpStatus.CONFLICT,
    message: '壁纸已收藏',
  },
}

export default _wallpaperErrors
