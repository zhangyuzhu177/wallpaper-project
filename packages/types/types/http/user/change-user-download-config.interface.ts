import type { IIdsDto } from '../../dto/id/ids.interface'
import type { IUser } from '../../entities/user.interface'

/**
 * 修改用户下载次数配置
 * 请求参数
 */
export interface IChangeUserDownloadConfigBodyDto
  extends
  IIdsDto,
  Pick<
    IUser,
    'downloadLimit'
  > {}
