import { Mixin } from 'ts-mixer'
import type { IChangeStatusBodyDto } from 'types'

import { IdsDto } from '../../id/ids.dto'
import { StatusDto } from '../../status.dto'

/**
 * 修改数据状态
 * 请求参数
 */
export class ChangeStatusBodyDto
  extends Mixin(
    IdsDto,
    StatusDto,
  )
  implements IChangeStatusBodyDto {}
