import { PermissionType } from 'types'
import { HasPermission } from 'src/guards'
import type { AdminRole } from 'src/entities'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, getQuery } from 'src/utils'
import { Body, Controller, Param, Post } from '@nestjs/common'
import {
  AdminRoleIdDto,
  IdsDto,
  QueryDto,
  QueryResDto,
  SuccessBooleanDto,
  SuccessNumberDto,
  SuccessStringDto,
} from 'src/dto'

import { AdminService } from '../admin.service'
import { AdminRoleService } from './role.service'
import { UpsertAdminRoleBodyDto } from './dto/upsert-admin-role.body'

@ApiTags('Admin Role | 管理员角色')
@Controller('admin/role')
export class AdminRoleController {
  constructor(
    private readonly _adminSrv: AdminService,
    private readonly _roleSrv: AdminRoleService,
  ) { }

  @ApiOperation({
    summary: '查询管理员角色列表',
  })
  @ApiSuccessResponse(QueryResDto<AdminRole>)
  @HasPermission([
    PermissionType.ADMIN_ROLE_QUERY,
    PermissionType.ADMIN_QUERY,
    PermissionType.ADMIN_ASSIGN_ROLE,
  ])
  @Post('query')
  public queryAdminRoleList(
    @Body() body: QueryDto<AdminRole>,
  ) {
    return getQuery(
      this._adminSrv.roleRepo(),
      body,
    )
  }

  @ApiOperation({
    summary: '创建管理员角色',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.ADMIN_ROLE_CREATE,
  )
  @Post('create')
  public createAdminRole(
    @Body() body: UpsertAdminRoleBodyDto,
  ) {
    return this._roleSrv.createAdminRole(body)
  }

  @ApiOperation({
    summary: '批量复制管理员角色',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.ADMIN_ROLE_CREATE,
  )
  @Post('copy')
  public copyAdminRoles(
    @Body() { ids }: IdsDto,
  ) {
    return this._roleSrv.copyAdminRoles(ids)
  }

  @ApiOperation({
    summary: '更新管理员角色',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.ADMIN_ROLE_UPDATE,
  )
  @Post('update/:adminRoleId')
  public updateAdminRole(
    @Param() { adminRoleId }: AdminRoleIdDto,
    @Body() body: UpsertAdminRoleBodyDto,
  ) {
    return this._roleSrv.updateAdminRole(adminRoleId, body)
  }

  @ApiOperation({
    summary: '批量删除管理员角色',
    description: '删除管理员角色时，如果角色已关联用户，则会删除失败',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.ADMIN_ROLE_DELETE,
  )
  @Post('delete')
  public async deleteAdminRoles(
    @Body() { ids }: IdsDto,
  ) {
    if (ids.length === 1) {
      return await this._roleSrv.deleteAdminRole(ids[0])
        ? 1
        : 0
    }

    let success = 0
    for (const id of ids) {
      try {
        const deleteRes = await this._roleSrv.deleteAdminRole(id)
        deleteRes && success++
      }
      catch (_) { }
    }
    return success
  }

  @ApiOperation({
    summary: '删除指定管理员角色',
    description: '删除管理员角色时，如果角色已关联用户，则会删除失败',
  })
  @ApiSuccessResponse(SuccessBooleanDto)
  @HasPermission(
    PermissionType.ADMIN_ROLE_DELETE,
  )
  @Post('delete/:adminRoleId')
  public deleteAdminRoleById(
    @Param() { adminRoleId }: AdminRoleIdDto,
  ) {
    return this._roleSrv.deleteAdminRole(adminRoleId)
  }
}
