import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module } from '@nestjs/common'
import { Category, Collection, DownloadRecord, Wallpaper } from 'src/entities'

import { FileModule } from '../file/file.module'
import { SysConfigModule } from '../sys-config/sys-config.module'

import { WallpaperService } from './wallpaper.service'
import { CategoryService } from './category/category.service'
import { CategoryController } from './category/category.controller'
import { WallpaperEntityService } from './wallpaper/wallpaper-entity.service'
import { WallpaperEntityController } from './wallpaper/wallpaper-entity.controller'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Wallpaper,
      Collection,
      DownloadRecord,
    ]),

    FileModule,
    SysConfigModule,
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
    CategoryController,
    WallpaperEntityController,
  ],
})
export class WallpaperModule {}
