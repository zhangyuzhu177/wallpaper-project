<script lang="ts" setup>
import Home from '~/views/home/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <Home v-if="active === pageMenu[0].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
