import { IsLogin } from 'src/guards'
import { ApiFormData } from 'src/decorators'
import { arrayHasIntersection } from 'utils'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse, responseError } from 'src/utils'
import { ErrorCode, PermissionType, UserType } from 'types'
import { Body, Controller, Post, Query, Req } from '@nestjs/common'
import { FileBodyDto, FilePathDto, SuccessStringDto } from 'src/dto'

import { FileService } from './file.service'

@ApiTags('File | 文件服务')
@Controller('file')
export class FileController {
  constructor(
    private readonly _fileSrv: FileService,
  ) { }

  @ApiOperation({
    summary: '上传文件',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @ApiFormData()
  @IsLogin(UserType.ADMIN, true)
  @Post('upload')
  public async uploadPublicFile(
    @Query() { path }: FilePathDto,
    @Body() { file }: FileBodyDto,
    @Req() req: FastifyRequest,
  ) {
    if (!file?.file)
      responseError(ErrorCode.FILE_NOT_FOUND)

    // 校验用户权限
    const { admin } = req.raw
    // 管理员
    const permission = admin.adminRole?.permissions?.map(({ name }) => name) ?? []
    if (!arrayHasIntersection(
      permission,
      [
        PermissionType.CONFIG_UPSERT,
        PermissionType.CATEGORY_CREATE,
        PermissionType.CATEGORY_UPDATE,
        PermissionType.WALLPAPER_CREATE,
        PermissionType.WALLPAPER_UPDATE,
      ],
    ))
      responseError(ErrorCode.PERMISSION_DENIED)

    return this._fileSrv.upload(
      path,
      await file.toBuffer(),
    )
  }
}
