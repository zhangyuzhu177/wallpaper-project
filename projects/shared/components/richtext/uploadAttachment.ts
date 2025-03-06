import type { IButtonMenu, IDomEditor } from '@wangeditor/editor'
import { DomEditor, SlateRange, SlateTransforms } from '@wangeditor/editor'

const uploadAttachmentIcon = '<svg viewBox="0 0 1024 1024"><path d="M665.821116 327.053068l-64.958782-64.926783-324.79391 324.729911c-53.822991 53.790991-53.822991 141.053355 0 194.844347s141.053355 53.790991 194.876346 0l389.752692-389.688693a229.531696 229.531696 0 0 0 0-324.729912 229.627694 229.627694 0 0 0-324.761911 0L126.727224 476.458266l-0.863984 0.831985c-125.085655 125.085655-125.085655 327.833853 0 452.887508 125.053655 125.053655 327.865853 125.053655 452.983507 0l0.831984-0.863984 0.031999 0.032 279.322763-279.290764-64.990781-64.926782-279.322763 279.258764-0.831984 0.831984a228.731711 228.731711 0 0 1-323.065943 0 228.603714 228.603714 0 0 1 0-322.969944l0.895983-0.831985-0.031999-0.063998L600.958332 132.208721c53.694993-53.726993 141.149353-53.726993 194.876346 0s53.694993 141.149353 0 194.844347L406.081986 716.741761c-17.919664 17.919664-47.039118 17.919664-64.958782 0a45.983138 45.983138 0 0 1 0-64.926783L665.917114 327.053068z"></path></svg>'

class UploadAttachmentMenu implements IButtonMenu {
  readonly title = '上传附件'
  readonly iconSvg = uploadAttachmentIcon
  readonly tag = 'button'

  /**
   * 获取编辑器内容源码
   */
  getValue(_editor: IDomEditor) {
    return ''
  }

  /**
   * 菜单是否需要激活
   */
  isActive(_editor: IDomEditor, _active?: boolean) {
    return false
  }

  /**
   * 菜单是否需要禁用
   */
  isDisabled(editor: IDomEditor) {
    const { selection } = editor
    if (selection == null)
      return true
    if (SlateRange.isExpanded(selection))
      return true // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)

    const hasVoidElem = selectedElems.some(elem => editor.isVoid(elem))
    if (hasVoidElem)
      return true // 选中了 void 元素，禁用

    const hasPreElem = selectedElems.some(elem => DomEditor.getNodeType(elem) === 'pre')
    if (hasPreElem)
      return true // 选中了 pre 元素，禁用

    return false
  }

  /**
   * 点击菜单时触发的函数
   */
  exec(editor: IDomEditor, _value: string | boolean) {
    // 添加 file input（每次重新创建 input）
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.click()
    // 选中文件
    fileInput.onchange = () => {
      const files = fileInput.files
      this.uploadAttachments(editor, files)
    }
  }

  /**
   * 上传附件
   */
  private async uploadAttachments(editor: IDomEditor, files: FileList | null) {
    // 获取上传附件的方法
    const { customUpload } = editor.getMenuConfig('uploadAttachment')

    if (!customUpload || !files?.length)
      return

    const fileList = Array.prototype.slice.call(files)

    // 按顺序上传
    for (const file of fileList) {
      await customUpload(
        file,
        (name: string, url: string) => this.insertAttachment(editor, name, url),
      )
    }
  }

  /**
   * 将附件插入到编辑器中
   */
  private insertAttachment(editor: IDomEditor, name?: string, url?: string) {
    if (!name || !url)
      return

    // 还原选区
    editor.restoreSelection()

    // 插入节点
    const nodes = [
      {
        text: ' ',
      },
      {
        type: 'link',
        url,
        children: [
          {
            text: name,
          },
        ],
      },
      {
        text: ' ',
      },
    ]
    SlateTransforms.insertNodes(editor, nodes)
  }
}

export const uploadAttachmentConf = {
  key: 'uploadAttachment',
  factory: () => new UploadAttachmentMenu(),
}
