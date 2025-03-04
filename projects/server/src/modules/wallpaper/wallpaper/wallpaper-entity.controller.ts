import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { WallpaperService } from '../wallpaper.service'
import { WallpaperEntityService } from './wallpaper-entity.service'

@ApiTags('Wallpaper | 壁纸')
@Controller('wallpaper/entity')
export class WallpaperEntityController {
  constructor(
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _entitySrv: WallpaperEntityService,
  ) {}
}
