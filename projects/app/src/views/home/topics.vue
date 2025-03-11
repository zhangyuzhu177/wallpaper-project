<script setup lang="ts">
import img from '~/static/images/cover.jpg'
</script>

<template>
  <Title class="topics" title="专题精选">
    <template #right>
      <navigator url="/page/classify/classify" class="more" v-text="'More+'" />
    </template>

    <view class="topics_content">
      <Item
        v-for="item in 8" :key="item"
        :title="item" :url="img"
      />
      <Item is-more />
    </view>
  </Title>
</template>

<style lang="scss" scoped>
.topics {
  .more {
    color: $uni-color-grey-5;
  }

  .topics_content {
    display: grid;
    gap:15rpx;
    grid-template-columns: repeat(3,1fr);
  }
}
</style>
