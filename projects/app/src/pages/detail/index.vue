<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import Detail from '@/views/detail/index.vue'

type DetailsType = 'history' | 'collect' | 'classify'

interface IOptions {
  type: DetailsType
  classifyId?: string
}

const type = ref<DetailsType>()

onLoad((options: IOptions) => {
  type.value = options.type
})
</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="w-full">
        <ZNavbar :title="type" :capsule="true" />
      </view>
    </template>
    <Detail />
  </uni-layout>
</template>
