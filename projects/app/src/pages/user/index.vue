<route lang="json5">
{
  "layout": "home",
  "needLogin":true,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import User from '@/views/user/index.vue'
</script>

<template>
  <User />
</template>
