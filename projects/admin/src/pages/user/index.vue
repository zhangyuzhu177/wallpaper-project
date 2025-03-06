<script lang="ts" setup>
import User from '~/views/user/user/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <User v-if="active === pageMenu[0].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
