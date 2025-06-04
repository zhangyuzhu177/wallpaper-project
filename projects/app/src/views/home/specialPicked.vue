<script setup lang="ts">
const { pickedList } = useHome()

/**
 * 跳转分类
 */
function jumpPage(id?: string) {
  if (id) {
    uni.navigateTo({
      url: `/pages/details/index?type=classify&classifyId=${id}`,
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
      <view class="text-lg" v-text="'专题精选'" />
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
          :url="item.url" :title="item.name" :count="item.wallpapers.length"
          @click="jumpPage(item.id)"
        />
      </view>
    </scroll-view>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
