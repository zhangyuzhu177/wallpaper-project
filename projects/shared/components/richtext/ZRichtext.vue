<script lang="ts" setup>
import { objectPick } from 'utils'
import '@wangeditor/editor/dist/css/style.css'
import { isClient, useVModel } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import type { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import ZLabel from '../label/ZLabel.vue'
import type { ZLabelProps } from '../label/ZLabel.vue'
import '../../styles/richtext.scss'

import { onCustomUpload, onCustomUploadAttachment } from './config'

export interface ZRichtextProps extends ZLabelProps {
  /**
   * 富文本框绑定的值
   */
  modelValue?: string
  /**
   * 富文本框占位符
   */
  placeholder?: string
  /**
   * 是否只读富文本框
   */
  readonly?: boolean
  /**
   * 是否聚焦富文本框
   *
   * 默认值：`false`
   */
  autoFocus?: boolean
}

const props = withDefaults(defineProps<ZRichtextProps>(), {
  autoFocus: false,
})
defineEmits<{
  /**
   * 更新富文本框绑定的值
   */
  'update:modelValue': [ZRichtextProps['modelValue']]
}>()

const EditorComponent = shallowRef<typeof Editor>()
const ToolbarComponent = shallowRef<typeof Toolbar>()
if (isClient) {
  import('@wangeditor/editor-for-vue').then((module) => {
    EditorComponent.value = module.Editor
    ToolbarComponent.value = module.Toolbar
  })
}

const value = useVModel(props, 'modelValue')

/** 蒙层 */
const modal = ref(false)

/** 编辑器实例 */
const editorRef = shallowRef<IDomEditor>()
/** 工具栏基本配置 */
const toolbarConfig: Partial<IToolbarConfig> = {
  modalAppendToBody: true,
  insertKeys: {
    index: 31,
    keys: ['uploadAttachment', 'sourceCode'],
  },
}
/** 编辑器基本配置 */
const editorConfig = computed<Partial<IEditorConfig>>(() => {
  const { placeholder, readonly, autoFocus } = props
  return {
    placeholder,
    readOnly: readonly,
    autoFocus,
    // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
    hoverbarKeys: {
      attachment: {
        menuKeys: ['downloadAttachment'], // “下载附件”菜单
      },
    },
    MENU_CONF: {
      uploadImage: {
        customUpload: onCustomUpload.value,
      },
      uploadVideo: {
        customUpload: onCustomUpload.value,
      },
      uploadAttachment: {
        customUpload: onCustomUploadAttachment.value,
      },
    },
  }
})

/**
 * 创建编辑器的回调
 */
async function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
  if (!isClient)
    return

  // 监听 `modalOrPanelShow` 和 `modalOrPanelHide` 自定义事件设置样式、蒙层
  editor.on(
    'modalOrPanelShow',
    (modalOrPanel) => {
      if (modalOrPanel.type !== 'modal')
        return

      const el = modalOrPanel.$elem[0] as HTMLElement
      el.classList.add('rich-text-model')
      modal.value = true
    },
  )
  editor.on(
    'modalOrPanelHide',
    () => {
      modal.value = false
    },
  )
}

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div
    class="z-rich-text"
    flex="~ col gap1"
  >
    <ZLabel v-bind="objectPick(props, 'label', 'required', 'aligned', 'explain')" />

    <div
      rounded-6px flex="~ col"
      bg-grey-1 b="1 solid grey-3"
    >
      <template v-if="ToolbarComponent">
        <ToolbarComponent
          :default-config="toolbarConfig"
          :editor="editorRef"
          b-b="1px grey-3"
        />
      </template>
      <template v-if="EditorComponent">
        <EditorComponent
          v-model="value"
          :default-config="editorConfig"
          h="120!"
          @on-created="handleCreated"
        />
      </template>
    </div>

    <Teleport v-if="modal" to="body">
      <div fixed inset-0 bg="black-4" z-10001 />
    </Teleport>
  </div>
</template>

<style lang="scss">
.z-rich-text {
  .w-e-toolbar {
    background-color: transparent;
  }

  .w-e-full-screen-container {
    z-index: 10000;
  }

  .w-e-text-container {
    background-color: transparent;

    .w-e-scroll {
      overflow-y: scroll !important;
    }

    .w-e-text-placeholder {
      font-size: 14px;
      line-height: 22px;
      color: var(--grey-5);
      font-style: normal;
      left: 12px;
      width: calc(100% - 24px);
    }

    [data-slate-editor] {
      padding: 0 12px;
    }
  }
}

body {
  > .w-e-modal.rich-text-model {
    position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 10002;
    border: none;
    border-radius: 10px;
    box-shadow: none;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    padding: 30px 24px 24px;
    max-width: calc(100% - 40px);
    min-width: 280px;

    .btn-close {
      right: 24px;
      top: 20px;
      border-radius: 3px;

      svg {
        width: 12px;
        height: 12px;
      }

      &:hover {
        background-color: var(--grey-3);
      }
    }

    .babel-container {
      margin-bottom: 24px;

      span {
        margin-bottom: 4px;
      }

      input, textarea {
        padding: 13px 12px;
        border-radius: 6px;

        &:focus-visible {
          outline: none;
          border-color: var(--primary-1);
        }

        &::-webkit-input-placeholder {
          color: var(--grey-5);
          opacity: 1;
        }
      }

      &:hover {
        input {
          border-color: var(--primary-1);
        }
      }
    }

    .button-container {
      margin-bottom: 0;
      text-align: right;

      button {
        border: none;
        border-radius: 8px;
        color: var(--grey-1);
        font-weight: 500;
        height: 36px;
        padding: 8px 12px;
        min-width: 112px;

        &:hover {
          background-color: var(--primary-2);
        }

        &:active {
          background-color: var(--primary-3);
        }
      }
    }
  }
}
</style>
