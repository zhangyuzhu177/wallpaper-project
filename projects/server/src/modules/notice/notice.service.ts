import { Notice } from 'src/entities'
import { In, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { responseError } from 'src/utils'
import { ErrorCode } from 'types'
import type { ChangeStatusBodyDto } from 'src/dto'
import type { UpsertNoticeBodyDto } from './dto/upsert-notice.body'

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly _noticeRepo: Repository<Notice>,
  ) { }

  /**
   * 创建公告信息
   */
  public async createNotice(body: UpsertNoticeBodyDto, adminName?: string) {
    const insertRes = await this._noticeRepo.insert({
      ...body,
      adminName,
    })
    return insertRes.identifiers[0].id
  }

  /**
     * 更新公告信息
     */
  public async updateNotice(id: string, body: UpsertNoticeBodyDto, adminName?: string) {
    if (!(await this._noticeRepo.existsBy({ id })))
      responseError(ErrorCode.NOTICE_NOT_EXISTS)

    const { order } = body
    await this._noticeRepo.update(
      { id },
      {
        ...body,
        order: order ?? null,
        adminName,
      },
    )
    return id
  }

  /**
     * 删除公告信息
     */
  public async deleteNotice(ids: string[]) {
    if (ids.length === 1 && !(await this._noticeRepo.existsBy({ id: ids[0] })))
      responseError(ErrorCode.NOTICE_NOT_EXISTS)

    const deleteRes = await this._noticeRepo.delete({
      id: In(ids),
    })
    return deleteRes.affected
  }

  /**
     * 批量修改公告状态
     */
  public async changeNoticeStatus(body: ChangeStatusBodyDto, adminName?: string) {
    const { ids, status } = body
    if (ids.length === 1 && !(await this._noticeRepo.existsBy({ id: ids[0] })))
      responseError(ErrorCode.NOTICE_NOT_EXISTS)

    const updateRes = await this._noticeRepo.update(
      { id: In(ids) },
      {
        status,
        adminName,
      },
    )

    return updateRes.affected
  }

  public qb(alias = 'n') {
    return this._noticeRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._noticeRepo
  }
}
