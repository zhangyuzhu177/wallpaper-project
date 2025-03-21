<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { isClient, useVModel } from '@vueuse/core'

import { getCaptchaImgApi } from '../../api/code'
import ZInput from './ZInput.vue'
import type { ZInputProps } from './ZInput.vue'

interface ZCaptchaInputProps extends ZInputProps {}

const props = defineProps<ZCaptchaInputProps>()
const emits = defineEmits(['update:modelValue', 'update:bizId'])

const value = useVModel(props, 'modelValue')

/** 加载中 */
const loading = ref(false)
/** 验证码图片 */
const img = ref<string>()

onBeforeMount(getCaptchaImg)

/**
 * 获取验证码图片
 */
async function getCaptchaImg() {
  if (loading.value)
    return

  loading.value = true
  try {
    const res = await getCaptchaImgApi()

    if (res && isClient) {
      emits('update:bizId', res.bizId)
      img.value = res.img
    }
  }
  finally {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}

defineExpose({
  getCaptchaImg,
})
</script>

<template>
  <ZInput
    v-model="value"
    label="验证码"
    placeholder="请输入验证码"
    :rules="[
      (val: string) => val.length === 6 || '请输入 6 位验证码',
    ]"
  >
    <template #append>
      <div
        w35 h12 cursor-pointer flex-center
        relative left-3
        @click="getCaptchaImg"
      >
        <div
          v-if="!img"
          bg="primary-1/12"
          px-6 py-2
          text-base font-400
        >
          获取验证码
        </div>
        <div v-else class="captcha" bg="primary-1/12" v-html="img" />
      </div>
    </template>
  </ZInput>
</template>

<style lang="scss" scoped>
.captcha {
  :deep(svg) {
    path[fill]:not([fill="none"]) {
      fill: black;
      stroke: black;
    }
  }
}
</style>
