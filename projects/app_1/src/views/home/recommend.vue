<script setup lang="ts">
import type { IWallpaper } from 'types'

/** 每日推荐壁纸列表 */
const recommendList = ref<IWallpaper[]>()

/** 计算当前时间 */
const day = computed(() => {
  return new Date().getDate()
})

/** 获取每日推荐壁纸列表 */
async function getRecommendWallpaper() {
  recommendList.value = await getRecommendWallpaperApi()
}

onLoad(getRecommendWallpaper)
</script>

<template>
  <Title class="recommend" title="每日推荐">
    <template #right>
      <view class="recommend_title_icon">
        <uni-icons color="$uni-color-primary" type="calendar" size="24" />
        <text v-text="`${day}号`" />
      </view>
    </template>
    <scroll-view scroll-x :show-scrollbar="false">
      <view class="recommend_content">
        <navigator
          v-for="item in recommendList" :key="item.id"
          url="/pages/preview/preview"
          class="recommend_item"
        >
          <image :src="item.url" mode="aspectFill" />
        </navigator>
      </view>
    </scroll-view>
  </Title>
</template>

<style lang="scss" scoped>
.recommend{

  .recommend_title_icon{
    display: flex;
    align-items: center;
    gap: 4rpx;
    color: $uni-color-primary;
  }

  .recommend_content {
      display: flex;
      gap: 16rpx;

    .recommend_item {
      width: 230rpx;
      height: 400rpx;

      image {
        width: 230rpx;
        height: 400rpx;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
