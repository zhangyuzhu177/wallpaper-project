<script setup lang="ts">
const { swiperList } = useHome()

const current = ref<number>(0)
</script>

<template>
  <wd-swiper
    v-if="swiperList?.length"
    v-model:current="current"
    value-key="url"
    :list="swiperList"
    height="200px"
    autoplay
    :indicator="{ type: 'dots-bar' }"
  />
  <wd-img v-else src="/static/images/default.png" width="100%" height="200px" radius="8px" />
</template>
