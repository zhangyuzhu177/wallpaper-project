<script setup lang="ts">
import type { ICategory } from 'types'
import { getSelectedTopicsApi } from '@/api/classify'

/** 专题精选列表 */
const classifys = ref<ICategory[]>()

/**
 * 获取专题精选
 */
async function getSelectedTopics() {
  const { data } = await getSelectedTopicsApi()
  classifys.value = data
  console.log(classifys.value)
}

onLoad(() => {
  getSelectedTopics()
})
</script>

<template>
  <view class="flex flex-col gap4">
    <view class="flex justify-between items-center">
      <view class="text-lg">
        专题精选
      </view>
      <view class="text-sm text-grey-5">
        More+
      </view>
    </view>

    <scroll-view
      :scroll-x="true"
      :show-scrollbar="false"
      class="content"
    >
      <view
        v-for="item in classifys" :key="item.id"
        class="b-rd-2 relative w-[140px] h-[180px]"
      >
        <wd-img
          :src="item.url" width="140px" height="180px" radius="8px"
        />
        <view
          class="bg-black-2 absolute inset-0 b-rd-2 flex gap-1 flex-col justify-end text-grey-1 p-3"
        >
          <view v-text="item.name" />
          <view class="text-xs text-white-8" v-text="`${item.wallpapers.length} 张`" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.content {
  :deep(.uni-scroll-view) {
    border-radius: 8px;

    .uni-scroll-view-content{
      display: flex;
      gap: 12px;
    }
  }
}
</style>
