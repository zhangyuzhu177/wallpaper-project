<script lang="ts" setup>
import { ref } from 'vue'
import { QFile } from 'quasar'
import { useVModel } from '@vueuse/core'
import type { QFileProps } from 'quasar'

import ZIconBtn from '../btn/ZIconBtn.vue'
import type { hint } from '../../utils/upload/rejected'
import { onRejected } from '../../utils/upload/rejected'

export interface ZDragUploadProps {
  /**
   * 拖拽上传文件绑定的值
   */
  modelValue?: File
  /**
   * `label`
   *
   * 或使用默认插槽代替
   *
   * 默认值：`选择文件`
   */
  label?: string
  /**
   * 逗号分隔的允许上传的文件类型规范列表
   *
   * 例：`image/jpeg, .pdf`
   */
  accept?: QFileProps['accept']
  /**
   * 单个文件的最大尺寸
   *
   * 单位：`字节`
   */
  maxFileSize?: QFileProps['maxFileSize']
  /**
   * 是否显示已上传文件
   *
   * 默认值：`true`
   */
  showFileList?: boolean
  /**
   * 是否禁用拖拽上传文件
   */
  disable?: boolean
  /**
   * 上传文件，未通过验证时弹出的提示信息
   */
  hintMessage?: hint
  /**
   * 其他参数
   *
   * 继承自 `quasar` 的 `QFileProps`
   */
  params?: Omit<
    QFileProps,
    'modelValue' | 'label' | 'hint' | 'accept'
    | 'maxFileSize' | 'disable'
  >
}

const props = withDefaults(defineProps<ZDragUploadProps>(), {
  label: '选择文件',
  showFileList: true,
})
defineEmits<{
  /**
   * 更新拖拽上传文件绑定的值
   */
  'update:modelValue': [ZDragUploadProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')

const zFileRef = ref<InstanceType<typeof QFile>>()

/** 是否拖拽 */
const drag = ref(false)

/**
 * 触发 QFile 点击事件，选择文件
 */
function clickUpload() {
  if (!props.disable)
    zFileRef.value?.pickFiles()
}

/**
 * 拖拽文件
 */
function dragFile(e: DragEvent) {
  drag.value = false
  const { files } = e.dataTransfer ?? {}
  if (files)
    zFileRef.value?.addFiles(files)
}
</script>

<template>
  <div
    class="z-drag-upload"
    flex="~ col gap2"
    text-sm font-500
  >
    <!-- 上传文件 -->
    <QFile
      ref="zFileRef"
      v-model="value"
      class="hidden!"
      :accept :disable
      :max-file-size
      @rejected="val => onRejected(val, hintMessage)"
    />

    <!-- 文件列表 -->
    <div
      v-if="showFileList && value"
      rounded-6px h9 px3 bg-grey-2
      flex="~ items-center gap2"
    >
      <div flex="~ 1 items-center gap2" w0>
        <div icon i-mingcute:folder-line />
        <div flex-1 truncate v-text="value.name" />
      </div>
      <ZIconBtn
        icon="i-mingcute:close-line"
        @click="value = undefined"
      />
    </div>

    <!-- 拖拽区域 -->
    <div
      class="drag-area"
      :class="{ drag }"
      relative
    >
      <div
        rounded-6px py10
        flex="~ col items-center gap4"
        b="1 dashed primary-1"
        bg-primary-4
        @dragenter.prevent="drag = !drag"
        @dragleave.prevent="drag = !drag"
        @dragover.prevent
        @drop.prevent="dragFile"
      >
        <div
          w10 h10 rounded-6px
          flex-center text-primary-1
          b="1 dashed primary-1"
          cursor-pointer transition
          hover="b-solid bg-primary-1/10"
          @click="clickUpload"
        >
          <div size-5 i-mingcute:add-line />
        </div>
        <slot>
          <div v-text="label" />
        </slot>
      </div>

      <!-- 禁用 -->
      <div
        v-if="disable"
        absolute inset-0 z-10
        cursor-not-allowed
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-drag-upload {
  .drag-area {
    &.drag {
      > div {
        border-style: solid;

        > div:first-child {
          border-style: solid;
        }
      }
    }
  }
}
</style>
