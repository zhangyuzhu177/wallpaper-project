<script setup lang="ts">
// 初始化全局 router
globalRouter.value = useRouter() as any
</script>

<template>
  <RouterView full />
</template>
