import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { IWallpaperIdDto, IWallpaperIdOptionalDto } from 'types'

const DESC = '壁纸的唯一标识'

export class WallpaperIdDto implements IWallpaperIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  wallpaperId: string
}

export class WallpaperIdOptionalDto implements IWallpaperIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  wallpaperId?: WallpaperIdDto['wallpaperId']
}
