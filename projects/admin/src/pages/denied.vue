<script lang="ts" setup>
const { logout } = useAdmin()

/** 退出登录对话框 */
const dialog = ref(false)
</script>

<template>
  <div>
    <ZEmpty
      label="您没有访问权限"
      relative style="top: calc((100% - 344px) * 0.22)"
    >
      <ZBtn
        label="退出登录"
        size="big"
        @click="dialog = true"
      />
    </ZEmpty>

    <ZLogoutDialog
      v-model="dialog"
      @logout="logout"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
