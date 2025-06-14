import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category, Wallpaper } from 'src/entities'

@Injectable()
export class WallpaperService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepo: Repository<Category>,
    @InjectRepository(Wallpaper)
    private readonly _wallpaperRepo: Repository<Wallpaper>,
  ) {}

  public entityQb(alias = 'w') {
    return this._wallpaperRepo.createQueryBuilder(alias)
  }

  public entityRepo() {
    return this._wallpaperRepo
  }

  public categoryQb(alias = 'c') {
    return this._categoryRepo.createQueryBuilder(alias)
  }

  public categoryRepo() {
    return this._categoryRepo
  }
}
