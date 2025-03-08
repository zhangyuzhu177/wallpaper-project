import { ErrorCode } from 'types'
import * as OssClient from 'ali-oss'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { OssConfig } from 'src/config/_oss.config'
import { responseError, responseParamsError } from 'src/utils'
import type { ListV2ObjectsQuery, RequestOptions } from 'ali-oss'

@Injectable()
export class FileService {
  /** Oss 服务客户端 */
  private readonly _client: OssClient
  constructor(
    private readonly _cfgSrv: ConfigService,
  ) {
    this._client = new OssClient(_cfgSrv.get<OssConfig>('oss'))
  }

  /**
   * 上传文件
   */
  public async upload(path: string, file: any) {
    if (!path) {
      responseParamsError([{
        property: 'path',
        constraints: {
          path: 'path 参数是必须的',
        },
      }])
    }
    if (!file) {
      responseParamsError([{
        property: 'file',
        constraints: {
          file: 'file 参数是必须的',
        },
      }])
    }

    const uploadRes = await this._client.put(path, file)

    return uploadRes.res
  }

  /**
   * 签发临时的下载链接
   */
  public async signUrl(
    path: string,
    filename?: string,
      expires = 10,
  ) {
    if (!path) {
      responseParamsError([{
        property: 'path',
        constraints: {
          path: 'path 参数是必须的',
        },
      }])
    }

    try {
      await this._client.head(path)
      return this._client.signatureUrl(
        path,
        {
          expires,
          response: filename
            ? {
                'content-disposition': `attachment; filename=${encodeURIComponent(filename)}`,
              }
            : undefined,
        },
      )
    }
    catch (e) {
      if (e.message.match(/Object not exists/))
        responseError(ErrorCode.FILE_NOT_FOUND)
      else
        responseError(ErrorCode.COMMON_UNEXPECTED_ERROR, e.message)
    }
  }

  /**
   * 获取指定文件的状态
   */
  public async stat(
    path: string,
  ) {
    try {
      return await this._client.head(path)
    }
    catch (e) {
      if (e.message.match(/Object not exists/))
        responseError(ErrorCode.FILE_NOT_FOUND)
      else
        responseError(ErrorCode.COMMON_UNEXPECTED_ERROR, e.message)
    }
  }

  /**
   * 列举指定 Bucket 中的文件
   */
  public list(
    query?: ListV2ObjectsQuery,
    options?: RequestOptions,
  ) {
    return this._client.listV2(query, options)
  }
}
