import type { User } from 'src/entities'
import { Throttle } from '@nestjs/throttler'
import { PermissionType, UserType } from 'types'
import { HasPermission, IsLogin } from 'src/guards'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, getQuery } from 'src/utils'
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import {
  AvatarOptionalDto,
  ChangeStatusBodyDto,
  QueryDto,
  QueryResDto,
  RelationRawDto,
  SuccessBooleanDto,
  SuccessNumberDto,
  SuccessStringDto,
  UserIdDto,
} from 'src/dto'

import { UserService } from './user.service'
import { CreateUserBodyDto } from './dto/create-user.body'
import { UpdateUserBodyDto } from './dto/update-user.body'
import { ChangeUserDownloadConfigBodyDto } from './dto/change-user-download-config.body'

@ApiTags('User | 个人用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly _userSrv: UserService,
  ) { }

  @ApiOperation({
    summary: '获取当前登入个人用户的信息',
  })
  @IsLogin(UserType.USER)
  @Get('own')
  public getOwnProfile(
    @Query() { relation }: RelationRawDto,
    @Req() req: FastifyRequest,
  ) {
    return this._userSrv.getOwnProfile(req.raw.user.id, relation)
  }

  @ApiOperation({
    summary: '修改当前登入个人用户的头像',
  })
  @ApiSuccessResponse(SuccessBooleanDto)
  @IsLogin(UserType.USER)
  @Post('own/avatar')
  public async changeOwnAvatar(
    @Body() { avatar = null }: AvatarOptionalDto,
    @Req() req: FastifyRequest,
  ) {
    const updateRes = await this._userSrv.repo().update(
      { id: req.raw.user.id },
      { avatar },
    )
    return updateRes.affected > 0
  }

  @ApiOperation({
    summary: '查询个人用户列表',
  })
  @ApiSuccessResponse(QueryResDto<User>)
  @HasPermission([
    PermissionType.USER_QUERY,
  ])
  @Post('query')
  public queryUserList(
    @Body() body: QueryDto<User>,
  ) {
    return getQuery(
      this._userSrv.repo(),
      body,
    )
  }

  @ApiOperation({
    summary: '创建个人用户',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @Throttle(10000, 60)
  @HasPermission(
    PermissionType.USER_CREATE,
  )
  @Post('create')
  public createUser(
    @Body() body: CreateUserBodyDto,
  ) {
    return this._userSrv.createUser(body)
  }

  @ApiOperation({
    summary: '更新指定个人用户',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission(
    PermissionType.USER_UPDATE,
  )
  @Post('update/:userId')
  public updateUser(
    @Param() { userId }: UserIdDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this._userSrv.updateUser(userId, body)
  }

  @ApiOperation({
    summary: '批量修改个人用户状态',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.USER_CHANGE_STATUS,
  )
  @Post('status')
  public changeUserStatus(
    @Body() body: ChangeStatusBodyDto,
  ) {
    return this._userSrv.changeUserStatus(body)
  }

  @ApiOperation({
    summary: '批量修改个人用户的下载次数限制',
  })
  @ApiSuccessResponse(SuccessNumberDto)
  @HasPermission(
    PermissionType.USER_CHANGE_DOWNLOAD_LIMIT,
  )
  @Post('download/config')
  public changeUserDownloadConfig(
    @Body() body: ChangeUserDownloadConfigBodyDto,
  ) {
    return this._userSrv.changeUserDownloadConfig(body)
  }
}
