import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category, Collection, DownloadRecord, Wallpaper } from 'src/entities'

@Injectable()
export class WallpaperService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepo: Repository<Category>,
    @InjectRepository(Wallpaper)
    private readonly _wallpaperRepo: Repository<Wallpaper>,
    @InjectRepository(Collection)
    private readonly _collectionRepo: Repository<Collection>,
    @InjectRepository(DownloadRecord)
    private readonly _downloadRecordRepo: Repository<DownloadRecord>,

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

  public downloadRecordQb(alias = 'dl') {
    return this._downloadRecordRepo.createQueryBuilder(alias)
  }

  public downloadRecordRepo() {
    return this._downloadRecordRepo
  }

  public collectionQb(alias = 'col') {
    return this._collectionRepo.createQueryBuilder(alias)
  }

  public collectionRepo() {
    return this._collectionRepo
  }
}
