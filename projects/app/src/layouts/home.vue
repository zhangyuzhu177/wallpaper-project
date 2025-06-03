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
    <view
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
    </view>

    <scroll-view
      :scroll-y="true"
      :style="{
        paddingTop: `${statusBarHeight + titleBarHeight}px`,
        height: `calc(100vh - var(--window-bottom) - var(--window-top) - ${statusBarHeight + titleBarHeight}px)`,
      }"
    >
      <slot />
    </scroll-view>
    <wd-toast />
    <wd-message-box />
    <privacy-popup />
  </wd-config-provider>
</template>
