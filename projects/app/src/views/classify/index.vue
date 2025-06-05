<script setup lang="ts">
import type { ICategory } from 'types'

/** 分类列表 */
const categoryList = ref<ICategory[]>()

/** */
</script>

<template>
  <view class="flex">
    <view v-if="categoryList?.length" class="grid grid-cols-2 gap-3 p4">
      1
    </view>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
