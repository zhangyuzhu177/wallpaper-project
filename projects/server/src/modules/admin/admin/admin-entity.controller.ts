import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { AdminService } from '../admin.service'

import { AdminEntityService } from './admin-entity.service'

@ApiTags('Admin | 管理员')
@Controller('admin/entity')
export class AdminEntityController {
  constructor(
    private readonly _adminSrv: AdminService,
    private readonly _entitySrv: AdminEntityService,
  ) {}
}
