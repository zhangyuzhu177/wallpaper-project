<script lang="ts" setup>
onLoad((e) => {
  console.log(e)
})

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="detail_layout page_bg">
    <Header>
      <view class="title">
        <view class="icon" @click="jumpBack">
          <uni-icons type="arrow-left" size="20" />
        </view>
        <text v-text="'公告'" />
        <view class="icon" style="opacity: 0;">
          <uni-icons type="arrow-left" size="20" />
        </view>
      </view>
    </Header>
    detail
  </view>
</template>

<style lang="scss" scoped>
.detail_layout{
  .title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
