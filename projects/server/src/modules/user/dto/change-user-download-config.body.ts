import { IdsDto } from 'src/dto'
import { GenerateNumberDecorator } from 'src/utils'
import type { IChangeUserDownloadConfigBodyDto } from 'types'

/**
 * 修改用户数据表格试用配置
 * 请求参数
 */
export class ChangeUserDownloadConfigBodyDto
  extends IdsDto
  implements IChangeUserDownloadConfigBodyDto {
  @GenerateNumberDecorator('下载次数限制', 3, true)
  downloadLimit?: number
}
