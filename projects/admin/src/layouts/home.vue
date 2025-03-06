<script lang="ts" setup>
import Home from 'shared/layouts/admin/home.vue'
import { APP_TITLE } from 'shared/constants/app'
import type { AppSidebarProps } from 'shared/layouts/admin/composables/sidebar'

const { active, adminMenu, pageMenu } = useMenu()
const { adminInfo, logout } = useAdmin()

/** 动态侧边栏菜单列表 */
const sidebarMenu = ref<AppSidebarProps['menu']>()
/** 动态顶部页面菜单列表 */
const headerMenu = computed(() => pageMenu.value?.filter(v => v.flag))

watch(
  adminMenu,
  async (newVal) => {
    sidebarMenu.value = []
    for (const item of newVal) {
      const { name, to } = item
      const icon = to.substring(1)
      sidebarMenu.value.push({
        name,
        to,
        icon: {
          default: await dynamicImport(icon),
          active: await dynamicImport(icon, 'active'),
        },
      })
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

/**
 * 动态加载icon
 */
async function dynamicImport(icon: string, state: 'default' | 'active' = 'default') {
  return (await import(`../assets/menu/${state}/${icon}.svg?raw`)).default
}

provide('active', active)
</script>

<template>
  <Home
    :sidebar="{
      title: APP_TITLE,
      name: '管理后台',
      admin: {
        name: adminInfo?.name,
        role: adminInfo?.adminRole?.name,
        phone: adminInfo?.phone,
        logout,
      },
      menu: sidebarMenu,
    }"
    :header="{
      menu: headerMenu,
    }"
  />
</template>
