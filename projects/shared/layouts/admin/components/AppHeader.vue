<script lang="ts" setup>
import type { Ref } from 'vue'
import { inject, watch } from 'vue'

import ZTabs from '../../../components/tabs/ZTabs.vue'

export interface AppHeaderProps {
  /**
   * 菜单
   */
  menu?: {
    /**
     * 菜单名称
     */
    name: string
    /**
     * 菜单绑定的值
     */
    value: string
  }[]
}

const props = defineProps<AppHeaderProps>()

const active = inject<Ref<string>>('active')

watch(
  () => props.menu,
  (newVal) => {
    if (active) {
      if (newVal?.length) {
        if (!newVal.find(v => v.value === active.value))
          active.value = newVal[0].value
      }
      else {
        active.value = ''
      }
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    class="admin-app-header"
    bg-grey-1 b-b="1 grey-3"
    px4 h="15 sm:16"
  >
    <ZTabs
      v-model="active"
      :options="menu?.map(v => ({
        name: v.value,
        label: v.name,
      }))"
    />
  </div>
</template>

<style lang="scss" scoped>
.admin-app-header {
  .z-tabs {
    :deep(.q-tab) {
      flex: 0;

      @media (min-width: 600px) {
        flex: 1;
      }
    }
  }
}
</style>
