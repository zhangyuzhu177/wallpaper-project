import { ref } from 'vue'

/** 自定义上传图片和视频 */
export const onCustomUpload = ref<(
  /** 待上传的文件 */
  _file: File,
  /** 插入富文本的回调 */
  _insertFn: (_url?: string) => void
) => void>()
/** 自定义上传附件 */
export const onCustomUploadAttachment = ref<(
  /** 待上传的文件 */
  _file: File,
  /** 插入富文本的回调 */
  _insertFn: (_name?: string, _url?: string) => void
) => void>()
