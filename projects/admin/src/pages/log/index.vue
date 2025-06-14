<script setup lang="ts">
import DownloadRecord from '~/views/log/download-record/index.vue'
import CollationRecord from '~/views/log/collection-record/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <DownloadRecord v-if="active === pageMenu[0].value" />
    <CollationRecord v-else-if="active === pageMenu[1].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
