<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import EditProfile from '@/views/user/settings/EditProfile.vue'
import AccountSecurity from '@/views/user/settings/AccountSecurity.vue'

const { statusBarHeight, titleBarHeight } = useSystem()

const title = ref('')

onLoad((options: { title: string }) => {
  title.value = options.title
})
</script>

<template>
  <view class="w-full h-full flex flex-col">
    <ZNavbar fixed safe-area-inset-top :capsule="true">
      {{ title }}
    </ZNavbar>
    <view
      class="bg-grey-2"
      :style="{
        height: `calc(100vh - ${statusBarHeight + titleBarHeight + 50}px)`,
      }"
    >
      <EditProfile v-if="title === '编辑资料'" />
      <AccountSecurity v-else-if="title === '账号与安全'" />
    </view>
  </view>
</template>
