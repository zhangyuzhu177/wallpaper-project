import { PermissionType, UserType } from 'types'
import { HasPermission, IsLogin } from 'src/guards'
import type { User, Wallpaper } from 'src/entities'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, getQuery, getQueryPaging } from 'src/utils'
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common'
import {
  CategoryIdDto,
  IdsDto,
  QueryDto,
  QueryPagination,
  QueryResDto,
  StatusDto,
  SuccessDto,
  SuccessNumberDto,
  SuccessStringDto,
  UserIdDto,
  WallpaperIdDto,
} from 'src/dto'

import { WallpaperService } from '../wallpaper.service'
import { WallpaperEntityService } from './wallpaper-entity.service'
import { UpsertWallpaperBodyDto } from './dto/upsert-wallpaper.body'

@ApiTags('Wallpaper Entity | 壁纸')
@Controller('wallpaper/entity')
export class WallpaperEntityController {
  constructor(
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _entitySrv: WallpaperEntityService,
  ) { }

  @ApiOperation({
    summary: '获取指定分类下的壁纸列表',
  })
  @ApiSuccessResponse(QueryResDto<Wallpaper>)
  @Post('query/:categoryId')
  public async getWallpapersByCategoryId(
    @Body() body: QueryPagination,
    @Param() { categoryId }: CategoryIdDto,
  ) {
    const { total, page, pageSize } = await getQueryPaging(
      this._wallpaperSrv.entityRepo(),
      {
        pagination: body,
        where: { categoryId },
      },
    )
    const data = await this._wallpaperSrv.entityRepo().find({
      where: { categoryId },
      relations: {
        category: true,
        collections: true,
        downloadRecords: true,
      },
      ...(
        body.pageSize !== 'all'
          ? {
              skip: (body.page - 1) * body.pageSize,
              take: body.pageSize,
            }
          : {}
      ),
      select: {
        category: {
          id: true,
          name: true,
        },
        collections: {
          id: true,
          userId: true,
        },
        downloadRecords: {
          id: true,
          userId: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    })
    return {
      page,
      pageSize,
      total,
      data,
    }
  }

  @ApiOperation({
    summary: '获取每日推荐',
  })
  @ApiSuccessResponse(SuccessDto<Wallpaper>)
  @Get('recommend')
  public getDailyRecommend() {
    return this._entitySrv.getDailyRecommend()
  }

  @ApiOperation({
    summary: '下载指定壁纸',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @IsLogin(UserType.USER)
  @Get('download/:wallpaperId')
  public downloadWallpaper(
    @Param() { wallpaperId }: WallpaperIdDto,
    @Req() req: FastifyRequest,
  ) {
    return this._entitySrv.downloadWallpaper(wallpaperId, req.raw.user)
  }

  @ApiOperation({
    summary: '获取下载的壁纸列表',
  })
  @ApiSuccessResponse(QueryResDto<Wallpaper>)
  @IsLogin(UserType.USER)
  @Post('query/download/:userId')
  public async queryDownloadWallpaper(
    @Param() { userId }: UserIdDto,
    @Body() body: QueryPagination,
  ) {
    const { total, page, pageSize } = await getQueryPaging(
      this._wallpaperSrv.entityRepo(),
      {
        pagination: body,
        where: {
          downloadRecords: {
            userId,
          },
        },
      },
    )
    const data = await this._wallpaperSrv.entityRepo().find({
      where: {
        downloadRecords: {
          userId,
        },
      },
      ...(
        body.pageSize !== 'all'
          ? {
              skip: (body.page - 1) * body.pageSize,
              take: body.pageSize,
            }
          : {}
      ),
      relations: {
        category: true,
        collections: true,
        downloadRecords: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        collections: {
          id: true,
          userId: true,
        },
        downloadRecords: {
          id: true,
          userId: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    })
    return {
      page,
      pageSize,
      total,
      data,
    }
  }

  @ApiOperation({
    summary: '添加/取消收藏',
  })
  @ApiSuccessResponse(SuccessDto<User>)
  @IsLogin(UserType.USER)
  @Post('collection/:wallpaperId')
  public collectionWallpaper(
    @Body() { status }: StatusDto,
    @Param() { wallpaperId }: WallpaperIdDto,
    @Req() req: FastifyRequest,
  ) {
    return this._entitySrv.collectionWallpaper(status, wallpaperId, req.raw.user.id)
  }

  @ApiOperation({
    summary: '查询收藏列表',
  })
  @ApiSuccessResponse(QueryResDto<Wallpaper>)
  @IsLogin(UserType.USER)
  @Post('query/collection/:userId')
  public async queryCollectionWallpaper(
    @Param() { userId }: UserIdDto,
    @Body() body: QueryPagination,
  ) {
    const { total, page, pageSize } = await getQueryPaging(
      this._wallpaperSrv.entityRepo(),
      {
        pagination: body,
        where: {
          collections: {
            userId,
          },
        },

      },
    )
    const data = await this._wallpaperSrv.entityRepo().find({
      where: {
        collections: {
          userId,
        },
      },
      ...(
        body.pageSize !== 'all'
          ? {
              skip: (body.page - 1) * body.pageSize,
              take: body.pageSize,
            }
          : {}
      ),
      relations: {
        category: true,
        collections: true,
        downloadRecords: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        collections: {
          id: true,
          userId: true,
        },
        downloadRecords: {
          id: true,
          userId: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    })

    return {
      page,
      pageSize,
      total,
      data,
    }
  }

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
      this._wallpaperSrv.entityRepo(),
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
