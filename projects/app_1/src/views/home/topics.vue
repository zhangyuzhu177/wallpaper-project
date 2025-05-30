<script setup lang="ts">
import type { ICategory } from 'types'

/** 分类列表 */
const categoryList = ref<ICategory[]>()
/** 是否展示更多 */
const isMore = ref(false)

/**
 * 获取分类列表
 */
async function getCategoryList() {
  const res = await getCategoryListApi()
  if (res.length >= 7) {
    isMore.value = true
    categoryList.value = res.slice(0, 7)
  }
  else {
    categoryList.value = res
  }
}

onLoad(getCategoryList)
</script>

<template>
  <Title class="topics" title="专题精选">
    <template #right>
      <navigator
        class="more" open-type="switchTab"
        url="/pages/classify/classify"
        v-text="'More+'"
      />
    </template>

    <view class="topics_content">
      <Item
        v-for="{ id, name, url } in categoryList" :key="id"
        :title="name" :url="url" :category-id="id"
      />
      <Item v-if="isMore" is-more />
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
