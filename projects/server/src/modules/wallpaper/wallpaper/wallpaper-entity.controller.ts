import { PermissionType } from 'types'
import { HasPermission } from 'src/guards'
import type { Wallpaper } from 'src/entities'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, getQuery } from 'src/utils'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import {
  CategoryIdDto,
  IdsDto,
  QueryDto,
  QueryResDto,
  SuccessDto,
  SuccessNumberDto,
  SuccessStringDto,
  WallpaperIdDto,
} from 'src/dto'

import { WallpaperService } from '../wallpaper.service'
import { WallpaperEntityService } from './wallpaper-entity.service'
import { UpsertWallpaperBodyDto } from './dto/upsert-wallpaper.body'

@ApiTags('Wallpaper | 壁纸')
@Controller('wallpaper/entity')
export class WallpaperEntityController {
  constructor(
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _entitySrv: WallpaperEntityService,
  ) { }

  @ApiOperation({
    summary: '获取指定分类下的壁纸列表',
  })
  @ApiSuccessResponse(SuccessDto<Wallpaper>)
  @Get(':categoryId')
  async getWallpapersByCategoryId(
    @Param() { categoryId }: CategoryIdDto,
  ) { }

  @ApiOperation({
    summary: '查询壁纸列表',
  })
  @ApiSuccessResponse(QueryResDto<Wallpaper>)
  @HasPermission(
    PermissionType.WALLPAPER_QUERY,
  )
  @Post('query')
  public queryWallpaperList(
    @Body() body: QueryDto<Wallpaper>,
  ) {
    return getQuery(
      this._wallpaperSrv.entitiyRepo(),
      body,
    )
  }

  @ApiOperation({
    summary: '上传壁纸',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.WALLPAPER_CREATE,
  )
  @Post('create')
  public createWallpaper(
    @Body() body: UpsertWallpaperBodyDto,
  ) {
    return this._entitySrv.createWallpaper(body)
  }

  @ApiOperation({
    summary: '更新壁纸',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.WALLPAPER_UPDATE,
  )
  @Post('update/:wallpaperId')
  public updateWallpaper(
    @Body() body: UpsertWallpaperBodyDto,
    @Param() { wallpaperId }: WallpaperIdDto,
  ) {
    return this._entitySrv.updateWallpaper(body, wallpaperId)
  }

  @ApiOperation({
    summary: '删除壁纸',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.WALLPAPER_DELETE,
  )
  @Delete('delete')
  public async deleteWallpaper(
    @Body() { ids }: IdsDto,
  ) {
    if (ids.length === 1) {
      return await this._entitySrv.deleteWallpaper(ids[0])
        ? 1
        : 0
    }
    let success = 0
    for (const id of ids) {
      try {
        const deleteRes = await this._entitySrv.deleteWallpaper(id)
        deleteRes && success++
      }
      catch (_) { }
    }
    return success
  }

  @ApiOperation({
    summary: '删除指定的壁纸',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.WALLPAPER_DELETE,
  )
  @Delete('delete/:wallpaperId')
  public deleteWallpaperById(
    @Param() { wallpaperId }: WallpaperIdDto,
  ) {
    return this._entitySrv.deleteWallpaper(wallpaperId)
  }
}
