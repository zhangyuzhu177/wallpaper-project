import { file2FormData } from 'utils'
import type { IFilePathDto } from 'types'
import { useRequest } from '../hooks/request'

const { $post } = useRequest()

/**
 * 上传公共文件
 */
export function fileUploadPublicApi(query: IFilePathDto, file: File) {
  return $post<string>(
    '/file/entity/public',
    file2FormData(file),
    { params: query },
  )
}
