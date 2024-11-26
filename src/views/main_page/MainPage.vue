<template>
  <Header />
  <div
    class="main-page d-flex justify-content-center align-items-center vh-100"
    style="
      background-image: url(&quot;/path/to/background.jpg&quot;);
      background-size: cover;
      background-position: center;
    "
  >
    <h1 class="text-white">환영합니다! 메인 페이지</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { checkIsLoggedIn } from "../../utils/local_storage_utils.ts";
import Header from "../components/Header.vue";
import { useBaseRouter } from "../../router/useBaseRouters.ts";

const { navigateToSignIn } = useBaseRouter();

onMounted(() => {
  if (!checkIsLoggedIn()) {
    navigateToSignIn();
  }
});
</script>

<style scoped>
.main-page {
  background-color: #141414;
}
</style>
