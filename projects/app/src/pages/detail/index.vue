<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
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
  <view class="w-full h-full flex flex-col">
    <ZNavbar fixed safe-area-inset-top :capsule="true">
      {{ type }}
    </ZNavbar>
  </view>
</template>
