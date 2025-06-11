<script setup lang="ts">
import type { ICategory } from 'types'

const { pickedList } = useHome()

/**
 * 跳转分类
 */
function jumpPage(val?: ICategory) {
  if (val) {
    uni.navigateTo({
      url: `/pages/detail/index?title=${val.name}&classifyId=${val.id}`,
    })
  }
  else {
    uni.switchTab({
      url: '/pages/classify/index',
    })
  }
}
</script>

<template>
  <view class="flex flex-col gap4">
    <view class="flex justify-between items-center">
      <view class="subtitle-1" v-text="'专题精选'" />
      <view
        class="text-sm text-grey-5"
        @click="jumpPage()"
        v-text="'More+'"
      />
    </view>

    <scroll-view
      v-if="pickedList?.length"
      scroll-x :show-scrollbar="false"
    >
      <view class="flex gap3">
        <Item
          v-for="item in pickedList" :key="item.id"
          :url="item.url" :title="item.name"
          :count="item.wallpapers.length"
          width="140px" height="180px"
          @click="jumpPage(item)"
        />
      </view>
    </scroll-view>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
