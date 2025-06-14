<script lang="ts" setup>
import Home from '~/views/home/home/index.vue'
import pageConfig from '~/views/home/pageConfig/index.vue'
import Notice from '~/views/home/notice/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <Home v-if="active === pageMenu[0].value" />
    <pageConfig v-else-if="active === pageMenu[1].value" />
    <Notice v-else-if="active === pageMenu[2].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
