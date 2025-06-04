<script setup lang="ts">
interface ItemProps {
  /**
   * 标题
   */
  title?: string
  /**
   * 图片地址
   */
  url?: string
  /**
   * 数量
   */
  count?: number
}
defineProps<ItemProps>()
</script>

<template>
  <view
    class="b-rd-2 relative w-[140px] h-[180px]"
  >
    <wd-img
      :src="url"
      width="140px"
      height="180px"
      radius="8px"
      mode="aspectFill"
    />
    <view
      class="bg-black-2 absolute inset-0 b-rd-2 flex
          gap-1 flex-col justify-end text-grey-1 p-3"
    >
      <view v-text="title" />
      <view
        class="text-xs text-white-8"
        v-text="`${count} 张`"
      />
    </view>
  </view>
</template>
