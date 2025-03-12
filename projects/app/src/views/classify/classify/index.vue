<script setup lang="ts">
import type { ICategory } from 'types'

/** 分类列表 */
const categoryList = ref<ICategory[]>()

/**
 * 获取分类列表
 */
async function getCategoryList() {
  uni.showLoading({
    title: '加载中',
  })
  try {
    categoryList.value = await getCategoryListApi()
  }
  finally {
    uni.hideLoading()
  }
}

onLoad(getCategoryList)
</script>

<template>
  <div class="classify_layout page_bg">
    <Header title="分类" />
    <view class="classify_content">
      <Item
        v-for="{ id, name, url } in categoryList" :key="id"
        :title="name" :url="url" :category-id="id"
      />
    </view>
  </div>
</template>

<style lang="scss" scoped>
.classify_layout {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  gap: 36rpx;
  padding-bottom: 30rpx;

  .classify_content {
    padding: 0 30rpx;
    gap:15rpx;
    display: grid;
    grid-template-columns: repeat(3,1fr);
  }
}
</style>
