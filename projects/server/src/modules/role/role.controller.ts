import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { RoleService } from './role.service'

@Controller('role')
@ApiTags('Role | 角色')
export class RoleController {
  constructor(
    private readonly _roleSrv: RoleService,
  ) {}
}
