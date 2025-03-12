import { PermissionType } from 'types'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'

import type { Notice } from 'src/entities'
import { HasPermission } from 'src/guards'
import { ApiSuccessResponse, getQuery } from 'src/utils'
import { ChangeStatusBodyDto, IdsDto, NoticeIdDto, QueryDto, QueryResDto, SuccessDto, SuccessNumberDto, SuccessStringDto } from 'src/dto'
import { NoticeService } from './notice.service'
import { UpsertNoticeBodyDto } from './dto/upsert-notice.body'

@ApiTags('Notice | 公告管理')
@Controller('notice')
export class NoticeController {
  constructor(
    private readonly _noticeSrv: NoticeService,
  ) { }

  @ApiOperation({
    summary: '获取所有公告（根据 date、order 排序）',
  })
  @ApiSuccessResponse(SuccessDto<Notice[]>)
  @Get()
  public getNotices() {
    return this._noticeSrv.qb()
      .where('n.status = :status', { status: 1 })
      .orderBy(`COALESCE(n.order, ${Number.MAX_SAFE_INTEGER})`, 'ASC')
      .addOrderBy('n.date', 'DESC')
      .select(['n.id', 'n.title'])
      .getMany()
  }

  @ApiOperation({
    summary: '获取指定公告详情',
  })
  @ApiSuccessResponse(SuccessDto<Notice[]>)
  @Get(':noticeId')
  public getNoticesById(
    @Param() { noticeId }: NoticeIdDto,
  ) {
    return this._noticeSrv.repo().findOneBy({ id: noticeId })
  }

  @ApiOperation({
    summary: '查询公告列表',
  })
  @ApiSuccessResponse(QueryResDto<Notice>)
  @HasPermission(
    PermissionType.NOTICE_QUERY,
  )
  @Post('query')
  public queryNoticeList(
    @Body() body: QueryDto<Notice>,
  ) {
    return getQuery(
      this._noticeSrv.repo(),
      body,
    )
  }

  @ApiOperation({
    summary: '创建公告信息',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.NOTICE_CREATE,
  )
  @Post('create')
  public createNotice(
    @Body() body: UpsertNoticeBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._noticeSrv.createNotice(body, req.raw.admin?.name)
  }

  @ApiOperation({
    summary: '更新公告信息',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.NOTICE_UPDATE,
  )
  @Post('update/:noticeId')
  public updateNotice(
    @Param() { noticeId }: NoticeIdDto,
    @Body() body: UpsertNoticeBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._noticeSrv.updateNotice(noticeId, body, req.raw.admin?.name)
  }

  @ApiOperation({
    summary: '批量删除公告信息',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.NOTICE_DELETE,
  )
  @Post('delete')
  public deleteNotice(
    @Body() { ids }: IdsDto,
  ) {
    return this._noticeSrv.deleteNotice(ids)
  }

  @ApiOperation({
    summary: '批量修改公告状态',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.NOTICE_CHANGE_STATUS,
  )
  @Post('status')
  public updateNoticeStatus(
    @Body() body: ChangeStatusBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._noticeSrv.changeNoticeStatus(body, req.raw.admin?.name)
  }
}
