import type { Admin } from 'src/entities'
import { PermissionType, UserType } from 'types'
import { HasPermission, IsLogin } from 'src/guards'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, getQuery } from 'src/utils'
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import {
  AdminIdDto,
  ChangeStatusBodyDto,
  IdsDto,
  QueryDto,
  QueryResDto,
  RelationRawDto,
  SuccessBooleanDto,
  SuccessNumberDto,
  SuccessStringDto,
} from 'src/dto'

import { AdminService } from '../admin.service'
import { AdminEntityService } from './admin-entity.service'
import { CreateAdminBodyDto } from './dto/create-admin.body'
import { UpdateAdminBodyDto } from './dto/update-admin.body'
import { AssignAdminRoleBodyDto } from './dto/assign-admin-role.body'

@ApiTags('Admin | 管理员')
@Controller('admin/entity')
export class AdminEntityController {
  constructor(
    private readonly _adminSrv: AdminService,
    private readonly _entitySrv: AdminEntityService,
  ) { }

  @ApiOperation({
    summary: '获取当前登入管理员的信息',
  })
  @IsLogin(UserType.ADMIN)
  @Get('own')
  public getOwnProfile(
    @Query() { relation }: RelationRawDto,
    @Req() req: FastifyRequest,
  ) {
    return this._entitySrv.getOwnProfile(req.raw?.admin?.id, relation)
  }

  @ApiOperation({
    summary: '查询管理员列表',
  })
  @ApiSuccessResponse(QueryResDto<Admin>)
  @HasPermission([
    PermissionType.ADMIN_QUERY,
  ])
  @Post('query')
  public queryAdminList(
    @Body() body: QueryDto<Admin>,
  ) {
    return getQuery(
      this._adminSrv.repo(),
      body,
    )
  }

  @ApiOperation({
    summary: '创建管理员',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.ADMIN_CREATE,
  )
  @Post('create')
  public createAdmin(
    @Body() body: CreateAdminBodyDto,
  ) {
    return this._entitySrv.createAdmin(body)
  }

  @ApiOperation({
    summary: '更新管理员',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.ADMIN_UPDATE,
  )
  @Post('update/:adminId')
  public updateAdmin(
    @Param() { adminId }: AdminIdDto,
    @Body() body: UpdateAdminBodyDto,
  ) {
    return this._entitySrv.updateAdmin(adminId, body)
  }

  @ApiOperation({
    summary: '批量删除管理员',
    description: '删除管理员时，如果管理员已被关联机构，则会删除失败',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.ADMIN_DELETE,
  )
  @Post('delete')
  public async deleteAdmin(
    @Body() { ids }: IdsDto,
  ) {
    if (ids.length === 1) {
      return await this._entitySrv.deleteAdmin(ids[0])
        ? 1
        : 0
    }

    let success = 0
    for (const id of ids) {
      try {
        const deleteRes = await this._entitySrv.deleteAdmin(id)
        deleteRes && success++
      }
      catch (_) {}
    }
    return success
  }

  @ApiOperation({
    summary: '删除指定管理员',
    description: '删除管理员时，如果管理员已被关联机构，则会删除失败',
  })
  @ApiSuccessResponse(SuccessBooleanDto)
  @HasPermission(
    PermissionType.ADMIN_DELETE,
  )
  @Post('delete/:adminId')
  public deleteAdminById(
    @Param() { adminId }: AdminIdDto,
  ) {
    return this._entitySrv.deleteAdmin(adminId)
  }

  @ApiOperation({
    summary: '批量修改管理员账号状态',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.ADMIN_CHANGE_STATUS,
  )
  @Post('status')
  public changeAdminStatus(
    @Body() body: ChangeStatusBodyDto,
  ) {
    return this._entitySrv.changeAdminStatus(body)
  }

  @ApiOperation({
    summary: '批量分配管理员角色',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.ADMIN_ASSIGN_ROLE,
  )
  @Post('assign')
  public assignAdminRole(
    @Body() body: AssignAdminRoleBodyDto,
  ) {
    return this._entitySrv.assignAdminRole(body)
  }
}
