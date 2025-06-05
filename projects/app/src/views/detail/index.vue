<script setup lang="ts">
type DetailsType = 'history' | 'collect' | 'classify'

interface IOptions {
  type: DetailsType
  classifyId?: string
}

onLoad((options: IOptions) => {
  const { type, classifyId } = options
})
</script>

<template>
  <view>
    详情
  </view>
</template>
