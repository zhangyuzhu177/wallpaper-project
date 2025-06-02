<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  buttonPrimaryBgColor: '#3E7BFA',
  // buttonPrimaryColor: '#07c160',
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
