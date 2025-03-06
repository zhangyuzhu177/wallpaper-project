<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
</script>

<template>
  <div
    class="admin-auth-layout"
    full bg-grey-2 relative
  >
    <div
      class="admin-auth-layout-card hide-scrollbar"
      absolute-center
      rounded-10px bg-grey-1
      max-w-132 p="4 sm:16"
    >
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-auth-layout {
  > .admin-auth-layout-card {
    box-shadow: 0px 0px 16px 0px #005BA114;
    width: calc(100% - 32px);
    max-height: calc(100% - 112px);

    @media (min-width: 600px) {
      width: calc(100% - 96px);
      max-height: calc(100% - 256px);
    }
  }
}
</style>
