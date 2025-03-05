<script setup lang="ts">
import cover from '~/static/images/cover.jpg'

const list = [
  {
    img: cover,
  },
  {
    img: cover,
  },
  {
    img: cover,
  },
]
</script>

<template>
  <view class="home_banner">
    <swiper
      class="swiper"
      indicator-color="#ffffff3a"
      indicator-active-color="#fff"
      circular indicator-dots autoplay
    >
      <swiper-item v-for="{ img } in list" :key="img">
        <image :src="img" />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.home_banner {
  .swiper {
    width: 100%;
    height: 340rpx;

    swiper-item {
      display: flex;
      justify-content: center;

      image {
        width: 90%;
        height: 100%;
        border-radius: 24rpx;
      }
    }
  }
}
</style>
