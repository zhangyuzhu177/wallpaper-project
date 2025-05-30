<script lang="ts" setup>
import { type ConfigProviderThemeVars, useMessage } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
const message = useMessage()

function alert() {
  message.alert({
    msg: '提示文案',
    title: '标题',
  })
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-button @click="alert">
      alert
    </wd-button>
    <wd-toast>1213213</wd-toast>
    <wd-message-box />
    <privacy-popup />
  </wd-config-provider>
</template>
