import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module } from '@nestjs/common'
import { Category, Wallpaper } from 'src/entities'

import { WallpaperService } from './wallpaper.service'
import { CategoryService } from './category/category.service'
import { WallpaperEntityService } from './wallpaper/wallpaper-entity.service'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wallpaper,
      Category,
    ]),

  ],
  providers: [
    WallpaperService,
    CategoryService,
    WallpaperEntityService,
  ],
  exports: [
    WallpaperService,
    CategoryService,
    WallpaperEntityService,
  ],
  controllers: [
  ],
})
export class WallpaperModule {}
