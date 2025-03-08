<script lang="ts" setup>
import Category from '~/views/wallpaper/category/index.vue'
import Wallpaper from '~/views/wallpaper/wallpaper/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <Category v-if="active === pageMenu[0].value" />
    <Wallpaper v-if="active === pageMenu[1].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
