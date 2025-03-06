<script lang="ts" setup>
import { watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

// import logo from '../../../../assets/imgs/logo.svg?raw'
import { useSidebar } from '../../composables/sidebar'
import type { AppSidebarProps } from '../../composables/sidebar'

import AdminItem from './AdminItem.vue'

withDefaults(defineProps<AppSidebarProps>(), {
  name: '管理后台',
})

const $route = useRoute()
const $router = useRouter()
const { width } = useWindowSize()
const { isExpand, ANIMATION_TIME, BASE_WIDTH, changeState } = useSidebar()

watch(
  width,
  (newVal, oldVal) => {
    if ((!oldVal || oldVal >= BASE_WIDTH) && newVal < BASE_WIDTH)
      changeState(false)
    else if ((!oldVal || oldVal < BASE_WIDTH) && newVal >= BASE_WIDTH)
      changeState(true)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <!-- App Sidebar Left -->
  <div
    class="admin-app-sidebar-left"
    flex="~ col gap2" pb8 z-999
    bg-grey-1 b-r="1 grey-3"
    :max-w="isExpand ? 80 : 13"
    :style="{
      transition: `max-width ${ANIMATION_TIME}ms`,
    }"
  >
    <div flex="~ col">
      <!-- Title -->
      <div flex="~ col items-center gap2" p="y4 x11px">
        <!-- <div size-7.5 v-html="logo" /> -->
        <div
          flex="~ col items-center" px-5px
          whitespace-nowrap overflow-hidden
          max-w-full
          :class="isExpand ? 'visible' : 'invisible'"
        >
          <h4 v-text="title" />
          <h4 v-text="name" />
        </div>
      </div>
      <!-- Unpack -->
      <div flex="~ justify-end">
        <div
          p="x1 y2" bg-grey-2 text-grey-6
          rounded-l-2 cursor-pointer
          @click="changeState()"
        >
          <div v-if="isExpand" size-4 i-mingcute:left-line />
          <div v-else size-4 i-mingcute:right-line />
        </div>
      </div>
    </div>

    <div flex="~ 1 col gap4" h0>
      <!-- Menu -->
      <div
        class="admin-menu-list hide-scrollbar"
        flex="~ 1 col gap2" h0
      >
        <div
          v-for="item of menu"
          :key="item.name"
          class="menu-item"
          :class="{
            active: $route.path === item.to,
          }"
          subtitle-3
          flex="~ items-center gap2"
          p="y14px r4 l13px" cursor-pointer
          text-grey-6 b-l="3px transparent"
          @click="$router.push(item.to)"
        >
          <div
            v-html="item.icon[
              $route.path === item.to
                ? 'active'
                : 'default'
            ]"
          />
          <div
            v-if="isExpand"
            truncate
            style="max-width: calc(100% - 28px);"
            v-text="item.name"
          />
        </div>
      </div>

      <!-- Admin -->
      <AdminItem v-bind="admin" />
    </div>
  </div>
</template>
