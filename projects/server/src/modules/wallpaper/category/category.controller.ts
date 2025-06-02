import { PermissionType } from 'types'
import { HasPermission } from 'src/guards'
import type { Category } from 'src/entities'
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
} from 'src/dto'

import { WallpaperService } from '../wallpaper.service'
import { CategoryService } from './category.service'
import { UpsertCategoryBodyDto } from './dto/upsert-category.body'

@ApiTags('Wallpaper Category | 壁纸分类')
@Controller('wallpaper/category')
export class CategoryController {
  constructor(
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _categorySrv: CategoryService,
  ) { }

  @ApiOperation({
    summary: '获取所有分类精选（根据 order 排序）',
  })
  @ApiSuccessResponse(SuccessDto<Category[]>)
  @Get()
  public getCategorys() {
    return this._wallpaperSrv.categoryRepo().find({
      where: {
        status: true,
      },
      order: {
        order: 'ASC',
      },
      relations: {
        wallpapers: true,
      },
      select: {
        id: true,
        name: true,
        url: true,
        wallpapers: {
          id: true,
        },
      },
    })
    // return this._wallpaperSrv.categoryQb()
    //   .orderBy(`COALESCE(c.order, ${Number.MAX_SAFE_INTEGER})`, 'ASC')
    //   .getMany()
  }

  @ApiOperation({
    summary: '查询分类列表',
  })
  @ApiSuccessResponse(QueryResDto<Category>)
  @HasPermission(
    PermissionType.CATEGORY_QUERY,
  )
  @Post('query')
  public queryCategoryList(
    @Body() body: QueryDto<Category>,
  ) {
    return getQuery(
      this._wallpaperSrv.categoryRepo(),
      body,
    )
  }

  @ApiOperation({
    summary: '创建分类',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.CATEGORY_CREATE,
  )
  @Post('create')
  public createCategory(
    @Body() body: UpsertCategoryBodyDto,
  ) {
    return this._categorySrv.createCategory(body)
  }

  @ApiOperation({
    summary: '更新分类',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.CATEGORY_CREATE,
  )
  @Post('update/:categoryId')
  public updateCategory(
    @Body() body: UpsertCategoryBodyDto,
    @Param() { categoryId }: CategoryIdDto,
  ) {
    return this._categorySrv.updateCategory(body, categoryId)
  }

  @ApiOperation({
    summary: '批量删除分类',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.CATEGORY_DELETE,
  )
  @Delete('delete')
  public async deleteCategory(
    @Body() { ids }: IdsDto,
  ) {
    if (ids.length === 1) {
      return await this._categorySrv.deleteCategory(ids[0])
        ? 1
        : 0
    }
    let success = 0
    for (const id of ids) {
      try {
        const deleteRes = await this._categorySrv.deleteCategory(id)
        deleteRes && success++
      }
      catch (_) { }
    }
    return success
  }

  @ApiOperation({
    summary: '删除指定分类',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.CATEGORY_DELETE,
  )
  @Delete('delete/:categoryId')
  public async deleteCategoryById(
    @Param() { categoryId }: CategoryIdDto,
  ) {
    return this._categorySrv.deleteCategory(categoryId)
  }
}
