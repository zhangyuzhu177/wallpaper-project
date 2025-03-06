<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// import logo from '../../../../assets/imgs/logo.svg?raw'
import { useSidebar } from '../../composables/sidebar'
import menuIcon from '../../../../assets/icons/menu.svg?raw'
import closeIcon from '../../../../assets/icons/close.svg?raw'
import logoutIcon from '../../../../assets/icons/logout.svg?raw'
import type { AppSidebarProps } from '../../composables/sidebar'
import ZLogoutDialog from '../../../../components/dialog/ZLogoutDialog.vue'

import AdminItem from './AdminItem.vue'

defineProps<AppSidebarProps>()

const $route = useRoute()
const $router = useRouter()
const { isExpand } = useSidebar()

/** 退出登录对话框 */
const dialog = ref(false)
</script>

<template>
  <!-- App Sidebar Top -->
  <div
    class="admin-app-sidebar-top"
    flex="~ items-center justify-between"
    px4 h12 z-999
    bg-grey-1 b-b="1 grey-3"
  >
    <div flex="~ items-center gap4">
      <!-- Menu -->
      <div
        cursor-pointer text-grey-9
      >
        <div v-html="isExpand ? closeIcon : menuIcon" />
        <q-menu
          v-model="isExpand"
          auto-close square :offset="[0, 14]"
          max-w="full!" w-full left="0!"
          py2 flex="~ col gap2" bg-grey-1
          shadow-none
        >
          <div
            class="admin-menu-list hide-scrollbar"
            flex="~ col 1 gap2" h0
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
                truncate
                style="max-width: calc(100% - 28px);"
                v-text="item.name"
              />
            </div>
          </div>
          <div px4>
            <div h1px bg-grey-3 />
          </div>
          <div
            subtitle-3
            flex="~ items-center gap2"
            p="y14px x4" cursor-pointer
            text-grey-6 hover:bg-grey-2
            @click="dialog = true"
          >
            <div v-html="logoutIcon" />
            <div>
              退出登录
            </div>
          </div>
        </q-menu>
      </div>
      <!-- <div size-7.5 v-html="logo" /> -->
    </div>

    <!-- Admin -->
    <AdminItem v-bind="admin" />

    <ZLogoutDialog v-model="dialog" @logout="admin.logout" />
  </div>
</template>
