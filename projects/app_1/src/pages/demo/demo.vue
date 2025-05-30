<script lang="ts" setup>
interface PetsList {
  _id: string
  url: string
  author?: string
  content?: string
  shop?: string
  comment?: string
}

/** 数据 */
const list = ref<PetsList[]>()
/** 显示回到顶部、刷新按钮 */
const isShow = ref(false)
/** 定时器 */
let timer: number | null = null

/**
 * 获取数据
 */
async function getList() {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
  try {
    const res: any = await uni.request({
      // url: 'https://api.thecatapi.com/v1/images/search?limit=10',
      url: 'https://tea.qingnian8.com/tools/taoShow',
      data: {
        size: 10,
      },
      header: {
        'access-key': 'zhangyuzhu123',
      },
    })
    list.value = [...list.value || [], ...(res.data.data as PetsList[])]
  }
  catch (error) {
    console.error(error)
  }
  finally {
    uni.hideLoading()
    uni.stopPullDownRefresh()
  }
}

/** 预览图片 */
function onPreview(index: number) {
  uni.previewImage({
    current: index,
    urls: list.value?.map(item => item.url) || [],
  })
}

/**
 * 刷新
 */
function refresh() {
  uni.startPullDownRefresh()
}

/**
 * 回到顶部
 */
function jumpTop() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  })
}

/** 监听页面滚动 */
onPageScroll((e) => {
  isShow.value = e.scrollTop > 100
})

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
  list.value = undefined
  getList()
})

/**
 * 上拉加载更多
 */
onReachBottom(() => {
  if (timer)
    clearTimeout(timer)
  timer = setTimeout(() => {
    getList()
  }, 500)
})

/** 获取数据 */
onLoad(getList)
</script>

<template>
  <view class="pets-demo">
    <view class="pets-layout">
      <view v-for="(item, index) in list" :key="item._id" class="pets-item">
        <image lazy-load :src="item.url" mode="widthFix" @click="onPreview(index)" />
        <text v-if="item.content">
          {{ item.content }}
        </text>
        <text>{{ item.author || item.shop }}</text>
      </view>
    </view>
    <view v-if="isShow" class="pets-btn">
      <view class="pets-btn-item" @click="refresh">
        <uni-icons type="refreshempty" size="24" />
      </view>
      <view class="pets-btn-item" @click="jumpTop">
        <uni-icons type="arrow-up" size="24" />
      </view>
    </view>
    <view class="load">
      <uni-load-more icon-type="circle" status="loading" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.pets-demo {

  .pets-layout {
    column-count: 2;
    column-gap: 10px;

    .pets-item {
      break-inside: avoid;
      margin-bottom: 10px;
      background-color: #f0f0f0;
      border-radius: 8px;
      overflow: hidden;

      image {
        width: 100%;
        display: block;
      }

      text {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .pets-btn {
    position: fixed;
    bottom: 32rpx;
    right: 16rpx;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    padding-bottom: env(saf-area-inset-bottom);
    /** 底部安全区域css环境变量 */

    .pets-btn-item {
      padding: 16rpx;
      border-radius: 50%;
      background-color: #ffffff3a;
      text-align: center;
    }
  }

  .load {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
