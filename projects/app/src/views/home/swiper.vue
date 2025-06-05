<script setup lang="ts">
const { swiperList } = useHome()

const current = ref<number>(0)
</script>

<template>
  <view class="home_swiper">
    <wd-swiper
      v-if="swiperList?.length"
      v-model:current="current"
      value-key="url"
      :list="swiperList"
      height="200px"
      autoplay
      image-mode="aspectFill"
      custom-class="swiper"
      custom-indicator-class="indicator"
      :indicator="{ type: 'dots-bar' }"
    />
    <wd-img v-else src="/static/images/default.png" width="100%" height="200px" radius="8px" />
  </view>
</template>

<style lang="scss" scoped>
.home_swiper {
  :deep() {
    .swiper {
      &::after {
        // position: absolute;
        inset: 0;
        content: '';
        border-radius: 8px;
        // background: linear-gradient(to top, #00000000, #00000080, transparent);
        background: red;
        z-index: 1;
      }
    }
  }
}
</style>
