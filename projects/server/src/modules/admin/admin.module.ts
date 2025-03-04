import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module } from '@nestjs/common'
import { Admin, AdminRole, Permission } from 'src/entities'

import { AdminService } from './admin.service'
import { AdminRoleService } from './role/role.service'
import { AdminRoleController } from './role/role.controller'
import { AdminEntityService } from './admin/admin-entity.service'
import { PermissionService } from './permission/permission.service'
import { AdminEntityController } from './admin/admin-entity.controller'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      AdminRole,
      Permission,
    ]),

  ],
  providers: [
    AdminService,
    AdminEntityService,
    AdminRoleService,
    PermissionService,
  ],
  exports: [
    AdminService,
    AdminEntityService,
    AdminRoleService,
    PermissionService,
  ],
  controllers: [
    AdminEntityController,
    AdminRoleController,
  ],
})
export class AdminModule {}
