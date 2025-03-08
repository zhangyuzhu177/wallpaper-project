import { decorate } from 'ts-mixer'
import type { IFilePathDto } from 'types'
import { GenerateStringDecorator } from 'src/utils'

export class FilePathDto implements IFilePathDto {
  @decorate(GenerateStringDecorator(
    '上传的文件完整路径（需要带上文件名、后缀）',
  ))
  path: string
}
