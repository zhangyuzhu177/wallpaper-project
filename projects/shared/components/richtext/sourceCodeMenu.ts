import { nextTick } from 'vue'
import { html_beautify } from 'js-beautify'
import type { IDomEditor, IModalMenu } from '@wangeditor/editor'

const sourceCodeIcon = '<svg viewBox="0 0 436 512"><path d="M425.687 115.799L317.004 9.057C311.057 3.217 303.191 0 294.855 0H31.611C14.181 0 0 14.18 0 31.611v448.777C0 497.82 14.18 512 31.611 512h371.925C420.968 512 436 497.82 436 480.388V138.352c0-8.426-4.3-16.646-10.313-22.553m-27.926 31.053H292.706V37.387zM37.387 474.612V37.388h217.931v108.105c0 21.366 17.383 38.747 38.748 38.747H397.76v290.374zM169.97 234.277l-55.184 75.238l54.519 77.338l-30.558 21.542l-70.01-99.312l71.084-96.917zm127.614-22.228l72.407 97.121l-72.452 99.46l-30.22-22.013l56.23-77.189l-55.938-75.033zm-77.593-32.505l36.886 6.1l-41.802 252.777l-36.887-6.1z"/></svg>'

class SourceCodeMenu implements IModalMenu {
  readonly title = '源代码'
  readonly iconSvg = sourceCodeIcon
  readonly tag = 'button'
  readonly showModal = true
  readonly modalWidth = 1240

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
  isDisabled(_editor: IDomEditor) {
    return false
  }

  /**
   * 点击菜单时触发的函数
   */
  exec(_editor: IDomEditor, _value: string | boolean) {
    // do nothing
  }

  /**
   * 获取弹窗定位节点
   */
  getModalPositionNode(_editor: IDomEditor) {
    return null
  }

  /**
   * 获取弹窗元素内容
   */
  getModalContentElem(editor: IDomEditor) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(`
      <div>
        <label class="babel-container">
          <span>源代码</span>
          <textarea placeholder style="resize: none; height: calc(100vh - 260px); min-height: 260px;"></textarea>
        </label>
        <div class="button-container">
          <button type="button">确定</button>
        </div>
      </div>`, 'text/html')
    const container = doc.body.firstChild as HTMLElement

    const textarea = container.querySelector('textarea')!
    textarea.placeholder = editor.getConfig().placeholder || '请输入内容'
    textarea.value = html_beautify(editor.getHtml())
    nextTick(() => {
      textarea.focus()
    })

    const button = container.querySelector('button')!
    button.onclick = () => {
      const value = textarea.value
      editor.restoreSelection()
      editor.setHtml(value)
    }

    return container
  }
}

export const sourceCodeConf = {
  key: 'sourceCode',
  factory: () => new SourceCodeMenu(),
}
