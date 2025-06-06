<script setup lang="ts">
import type { ICategory } from 'types'
import { getClassifyListApi } from '@/api/classify'

/** 分类列表 */
const categoryList = ref<ICategory[]>()

/**
 * 获取分类列表
 */
async function getCategoryList() {
  uni.showLoading({ title: '加载中...' })
  try {
    const { data } = await getClassifyListApi({ status: false })
    categoryList.value = data
  }
  finally {
    uni.hideLoading()
    uni.stopPullDownRefresh()
  }
}

/**
 * 跳转分类
 */
function jumpPage(val: ICategory) {
  uni.navigateTo({
    url: `/pages/detail/index?title=${val.name}&classifyId=${val.id}`,
  })
}

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
  categoryList.value = undefined
  getCategoryList()
})

onLoad(() => {
  getCategoryList()
})
</script>

<template>
  <view class="flex">
    <view
      v-if="categoryList?.length"
      class="grid grid-cols-2 gap-3 p4 w-full"
    >
      <Item
        v-for="item in categoryList" :key="item.id"
        :url="item.url" :title="item.name"
        :count="item.wallpapers.length"
        width="100%" height="120px"
        @click="jumpPage(item)"
      />
    </view>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
