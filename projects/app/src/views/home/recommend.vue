<script setup lang="ts">
const { recommendList } = useHome()

/**
 * 跳转预览页面
 */
function jumpPreview(index: number) {
  uni.navigateTo({
    url: `/pages/detail/preview?index=${index}&type=recommend`,
  })
}
</script>

<template>
  <view class="flex flex-col gap4">
    <view class="subtitle-1" v-text="'每日推荐'" />
    <template v-if="recommendList?.length">
      <view class="w-full grid grid-cols-2 gap-3">
        <view
          v-for="(item, index) in recommendList" :key="item.id"
          class="w-full h-[230px] b-rd-3"
          @click="jumpPreview(index)"
        >
          <wd-img :src="item.url" width="100%" height="230px" radius="12px" mode="aspectFill">
            <template #loading>
              <view class="w-full h-full flex center bg-[#EFEFEF]" />
            </template>
          </wd-img>
        </view>
      </view>
      <ZDivider label="没有更多啦" />
    </template>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
