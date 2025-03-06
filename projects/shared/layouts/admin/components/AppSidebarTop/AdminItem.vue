<script lang="ts" setup>
import type { AdminItemProps } from '../../composables/sidebar'

withDefaults(defineProps<AdminItemProps>(), {
  role: '无',
})
</script>

<template>
  <div
    subtitle-3
    rounded-10 w30px h30px
    flex-center b="1 primary-1"
    text-primary-1 cursor-pointer
  >
    <div v-if="name" v-text="name.substring(0, 1)" />
    <div v-else i-mingcute:user-2-line />

    <q-popup-proxy
      anchor="bottom right"
      self="top right"
      :offset="[0, 4]"
      :breakpoint="0"
      rounded-2 b="1 grey-3" p4
      bg-grey-1
      style="box-shadow: 0px 5px 3px -2px #00000005, 0px 3px 2px -2px #0000000F"
    >
      <div
        max-w-30 overflow-hidden subtitle-4
        flex="~ col items-center gap2"
      >
        <div
          subtitle-2 max-w-full truncate
          v-text="name"
        />
        <div
          p="y3px x2" rounded-10 bg-primary-4
          text-primary-1 max-w-full truncate
          v-text="role"
        />
        <div
          v-if="phone"
          text-grey-7 max-w-full truncate
          v-text="phone"
        />
      </div>
    </q-popup-proxy>
  </div>
</template>
