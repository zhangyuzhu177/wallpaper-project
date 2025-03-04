import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { WallpaperService } from '../wallpaper.service'
import { CategoryService } from './category.service'

@ApiTags('Wallpaper Category | 壁纸分类')
@Controller('wallpaper/category')
export class CategoryEntityController {
  constructor(
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _categorySrv: CategoryService,
  ) {}
}
