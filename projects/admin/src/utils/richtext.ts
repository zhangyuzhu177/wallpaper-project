import { isClient } from '@vueuse/core'

// import { fileUploadPublicApi } from './api/file'

/**
 * 初始化富文本组件
 */
export function initRichtext() {
  // 注册富文本插件
  if (isClient) {
    import('shared/components/richtext/registry').then(({ registerRichtext }) => {
      registerRichtext()
    })
  }

  // 自定义上传
  // onCustomUpload.value = async (file, insertFn) => {
  //   const url = await fileUploadPublicApi(
  //     {
  //       path: `cms/${randomString(24, 24, '')}${pathExtName(file.name)}`,
  //     },
  //     file,
  //   )
  //   insertFn(url)
  // }
  // onCustomUploadAttachment.value = async (file, insertFn) => {
  //   const filename = pathBaseName(file.name)
  //   const url = await fileUploadPublicApi(
  //     {
  //       path: `cms/${randomString(24, 24, '')}${pathExtName(file.name)}`,
  //     },
  //     file,
  //   )
  //   insertFn(filename, url)
  // }
}
