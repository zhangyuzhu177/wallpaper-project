import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Admin, AdminRole, Permission } from 'src/entities'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly _adminRepo: Repository<Admin>,
    @InjectRepository(AdminRole)
    private readonly _roleRepo: Repository<AdminRole>,
    @InjectRepository(Permission)
    private readonly _permissionRepo: Repository<Permission>,
  ) {}

  public qb(alias = 'a') {
    return this._adminRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._adminRepo
  }

  public roleQb(alias = 'r') {
    return this._roleRepo.createQueryBuilder(alias)
  }

  public roleRepo() {
    return this._roleRepo
  }

  public permissionQb(alias = 'p') {
    return this._permissionRepo.createQueryBuilder(alias)
  }

  public permissionRepo() {
    return this._permissionRepo
  }
}
