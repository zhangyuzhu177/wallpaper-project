<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const { statusBarHeight, titleBarHeight } = useSystem()

const themeVars: ConfigProviderThemeVars = {
  buttonPrimaryBgColor: '#007AFF',
  buttonSuccessBgColor: '#07C160',
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <!-- <view
      class="fixed z-999 w-full bg-white"
      :style="{ height: `${statusBarHeight + titleBarHeight}px` }"
    >
      <view
        class="flex items-center flex-1"
        :style="{
          height: `${titleBarHeight}px`,
          paddingTop: `${statusBarHeight}px`,
        }"
      >
        <slot name="title" />
      </view>
    </view> -->

    <ZNavbar fixed safe-area-inset-top :left-arrow="false">
      <slot name="title" />
    </ZNavbar>

    <scroll-view
      :scroll-y="true"
      :style="{
        maxHeight: `calc(100vh - var(--window-bottom) - var(--window-top) - ${statusBarHeight + titleBarHeight + 4}px)`,
      }"
    >
      <slot />
    </scroll-view>

    <wd-toast />
    <wd-message-box />
    <privacy-popup />
  </wd-config-provider>
</template>
