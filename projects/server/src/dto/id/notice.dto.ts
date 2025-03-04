import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { INoticeIdDto, INoticeIdOptionalDto } from 'types'

const DESC = '公告的唯一标识'

export class NoticeIdDto implements INoticeIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  noticeId: string
}

export class NoticeIdOptionalDto implements INoticeIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  noticeId?: NoticeIdDto['noticeId']
}
