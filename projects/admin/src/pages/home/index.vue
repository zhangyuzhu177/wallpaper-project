<script lang="ts" setup>
import Page from '~/views/home/page/index.vue'
import Notice from '~/views/home/notice/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <Page v-if="active === pageMenu[0].value" />
    <Notice v-if="active === pageMenu[1].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
