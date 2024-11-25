<template>
  <div class="main-page d-flex justify-content-center align-items-center vh-100" style="background-image: url('/path/to/background.jpg'); background-size: cover; background-position: center;">
    <h1 class="text-white">환영합니다! 메인 페이지</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {useBaseRouter} from "../../router/useBaseRouters.ts";

const {navigateToSignIn} = useBaseRouter()

onMounted(() => {
  const rememberMe = localStorage.getItem('rememberMe');

  if (!rememberMe) {
    // rememberMe 또는 로그인 정보가 없는 경우 로그인 페이지로 이동
    navigateToSignIn();
  }
});
</script>

<style scoped>
.main-page {
  background-color: #141414;
}
</style>
