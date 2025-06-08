<script setup lang="ts">
import Avatar from '../components/avatar/Avatar.vue'
import { toast } from '@/utils/toast'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const name = ref(userInfo.value.name)

const disabled = computed(() => {
  return userInfo.value.name === name.value || !name.value
})

function copyText(val: string) {
  uni.setClipboardData({
    data: val,
    success: () => {
      toast.success('复制成功')
    },
    fail: () => {
      uni.showToast({ title: '复制失败', icon: 'none' })
    },
  })
}

/**
 * 保存
 */
function handleSave() {
  if (disabled.value)
    return

  userStore.updateOwnUser({
    name: name.value,
  })
  uni.switchTab({
    url: '/pages/user/index',
  })
}
</script>

<template>
  <view class="px4 py6 flex flex-col justify-between gap6">
    <view class="flex flex-col gap6 items-center ">
      <Avatar />

      <view class="w-full flex flex-col bg-grey-1 b-rd-2">
        <view class="p4 flex items-center gap6">
          <view class="flex items-center gap1">
            账号
          </view>
          <view
            class="flex-1 flex items-center justify-between"
            @click="copyText(userInfo?.account)"
            v-text="userInfo?.account"
          />
        </view>

        <view class="h-[1px] w-full bg-[#F0F0F0]" />

        <view class="p4 flex items-center gap6">
          <view class="flex items-center gap1">
            昵称
          </view>
          <view class="z-input flex-1 flex items-center justify-between">
            <wd-input
              v-model="name"
              class="w-full"
              :maxlength="10"
              show-word-limit
              type="text"
              custom-class="name_input"
              placeholder="请输入昵称"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="btn w-full flex py-6">
      <wd-button
        :disabled="disabled"
        custom-class="save_btn"
        @click="handleSave"
      >
        保存
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.btn {
  :deep() {
    .save_btn {
      width: 100%;
    }
  }
}

.z-input{
  :deep() {
    .name_input {
      width: 100%;
      input {
        font-size: 16px !important;
      }
    }
  }
}
</style>
