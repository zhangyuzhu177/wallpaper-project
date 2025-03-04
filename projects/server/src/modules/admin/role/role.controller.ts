import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { AdminService } from '../admin.service'
import { AdminRoleService } from './role.service'

@ApiTags('Admin Role | 管理员角色')
@Controller('admin/role')
export class AdminRoleController {
  constructor(
    private readonly _adminSrv: AdminService,
    private readonly _roleSrv: AdminRoleService,
  ) {}
}
