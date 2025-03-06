import { Boot } from '@wangeditor/editor'

import { sourceCodeConf } from './sourceCodeMenu'
import { uploadAttachmentConf } from './uploadAttachment'

/**
 * 注册富文本插件
 */
export function registerRichtext() {
  try {
    Boot.registerMenu(sourceCodeConf)
    Boot.registerMenu(uploadAttachmentConf)
  }
  catch (_) {}
}
