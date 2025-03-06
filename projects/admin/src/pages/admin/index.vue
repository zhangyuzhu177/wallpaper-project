<script lang="ts" setup>
import Admin from '~/views/admin/admin/index.vue'
import Role from '~/views/admin/role/index.vue'

const { active, pageMenu } = useMenu()
</script>

<template>
  <div v-if="pageMenu?.length">
    <Admin v-if="active === pageMenu[0].value" />
    <Role v-else-if="active === pageMenu[1].value" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
