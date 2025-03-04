import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _wallpaperErrors: ErrorMessageCollection = {
  [ErrorCode.WALLPAPER_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '壁纸不存在',
  },
}

export default _wallpaperErrors
