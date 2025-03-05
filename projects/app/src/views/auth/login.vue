<script setup lang="ts">
function login() {
  uni.getUserProfile({
    desc: '登录后同步数据',
    success: (res) => {
      console.log(res)

      uni.login({
        provider: 'weixin', // 使用微信登录
        success(loginRes) {
          console.log(loginRes)
        },
      })
    },
  })
  // uni.login({
  //   provider: 'weixin', // 使用微信登录
  //   success(loginRes) {
  //     console.log(loginRes)
  //   },
  // })
  // console.log(res)
}

function decryptPhoneNumber(e) {
  console.log(e)
}
</script>

<template>
  <div class="">
    <button @click="login">
      登录
    </button>
  </div>
</template>

<style scoped></style>
