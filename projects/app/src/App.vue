<script setup lang="ts">
const { isLogin, getOwnProfile } = useUser()

onLaunch(() => {
  if (isLogin.value)
    getOwnProfile()
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-plus/index.scss";
</style>
