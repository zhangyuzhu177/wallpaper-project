<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

import ZDialog from './ZDialog.vue'
import type { ZDialogProps } from './ZDialog.vue'

export interface ZLogoutDialogProps extends Pick<ZDialogProps, 'modelValue'> {
  /**
   * 退出登录
   */
  onLogout: () => void
}

const props = defineProps<ZLogoutDialogProps>()
defineEmits<{
  /**
   * 更新对话框绑定的值
   */
  'update:modelValue': [ZDialogProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <ZDialog
    v-model="value"
    title="退出登录"
    confirm-text="退出"
    footer
    :wrapper-style="{
      fontWeight: '500',
    }"
    @ok="() => onLogout()"
  >
    是否退出登录？
  </ZDialog>
</template>
