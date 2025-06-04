<script setup lang="ts">
const { recommendList } = useHome()
</script>

<template>
  <view class="flex flex-col gap4">
    <view class="text-lg" v-text="'每日推荐'" />
    <template v-if="recommendList?.length">
      <view class="w-full grid grid-cols-2 gap-4">
        <view
          v-for="item in recommendList" :key="item.id"
          class="w-full h-[230px] b-rd-2"
        >
          <wd-img :src="item.url" width="100%" height="230px" radius="8px" mode="aspectFill" />
        </view>
      </view>
      <ZDivider label="没有更多啦" />
    </template>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
