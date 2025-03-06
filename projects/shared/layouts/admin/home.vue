<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

import { useSidebar } from './composables/sidebar'
import AppHeader from './components/AppHeader.vue'
import type { AppSidebarProps } from './composables/sidebar'
import AppSidebarTop from './components/AppSidebarTop/index.vue'
import type { AppHeaderProps } from './components/AppHeader.vue'
import AppSidebarLeft from './components/AppSidebarLeft/index.vue'

export interface AdminHomeLayoutProps {
  /**
   * `App Sidebar` 参数
   */
  sidebar: AppSidebarProps
  /**
   * `App Header` 参数
   */
  header: AppHeaderProps
}

const props = defineProps<AdminHomeLayoutProps>()

const { width } = useWindowSize()
const { isExpand, BASE_WIDTH, changeState } = useSidebar()
</script>

<template>
  <div
    class="admin-home-layout"
    full bg-grey-1 relative flex
    :style="{
      flexDirection: width >= 600 ? 'row' : 'column',
    }"
  >
    <AppSidebarLeft v-if="width >= 600" v-bind="sidebar" />
    <AppSidebarTop v-else v-bind="sidebar" />

    <div
      :class="
        width >= 960
          ? 'flex-1 w0'
          : width >= 600
            ? 'absolute inset-0 left-13'
            : 'flex-1 h0'
      "
      flex="~ col"
    >
      <AppHeader v-bind="props.header" />
      <RouterView
        class="flex-1 h0 p4"
      />
    </div>

    <!-- 展开菜单的遮罩 -->
    <div
      v-if="width < BASE_WIDTH && isExpand"
      bg-black-7 absolute inset-0 z-998
      @click="() => changeState()"
    />
  </div>
</template>

<style lang="scss">
.admin-menu-list {
  > .menu-item {
    &:not(.active) {
      &:hover {
        background-color: var(--grey-2);
      }
    }

    &.active {
      color: var(--primary-1);
      background-color: var(--primary-4);
      border-left-color: var(--primary-1);
    }
  }
}
</style>
