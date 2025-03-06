<script lang="ts" setup>
import { ref } from 'vue'
import { QFile } from 'quasar'
import { useVModel } from '@vueuse/core'
import type { QFileProps } from 'quasar'

import ZBtn from '../btn/ZBtn.vue'
import type { ZBtnProps } from '../btn/ZBtn.vue'
import type { hint } from '../../utils/upload/rejected'
import { onRejected } from '../../utils/upload/rejected'

interface ZUploadProps extends ZBtnProps {
  /**
   * 上传文件绑定的值
   */
  modelValue?: File | File[]
  /**
   * 逗号分隔的允许上传的文件类型规范列表
   *
   * 例：`image/jpeg, .pdf`
   */
  accept?: QFileProps['accept']
  /**
   * 是否允许多个文件上传
   */
  multiple?: QFileProps['multiple']
  /**
   * 最大允许上传的文件数量
   */
  maxFiles?: QFileProps['maxFiles']
  /**
   * 单个文件的最大尺寸
   *
   * 单位：`字节`
   */
  maxFileSize?: QFileProps['maxFileSize']
  /**
   * 是否禁用上传文件
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
    'modelValue' | 'label' | 'hint' | 'accept' | 'multiple'
    | 'maxFiles' | 'maxFileSize' | 'disable'
  >
}

const props = withDefaults(defineProps<ZUploadProps>(), {
  label: '上传文件',
  icon: 'upload',
})
defineEmits<{
  /**
   * 更新上传文件绑定的值
   */
  'update:modelValue': [ZUploadProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
const zFileRef = ref<InstanceType<typeof QFile>>()

/**
 * 触发 QFile 点击事件，选择文件
 */
function clickUpload() {
  if (!props.disable)
    zFileRef.value?.pickFiles()
}
</script>

<template>
  <div class="z-upload">
    <!-- 上传文件 -->
    <QFile
      ref="zFileRef"
      v-model="value"
      class="hidden!" append
      :accept :max-files :disable
      :multiple :max-file-size
      @rejected="val => onRejected(val, hintMessage)"
    />
    <div cursor-pointer @click="clickUpload">
      <slot>
        <ZBtn v-bind="props" />
      </slot>
    </div>
  </div>
</template>
