<template>
  <header class="header d-flex align-items-center px-4 py-2">
    <!-- 로고 -->
    <div class="logo me-4">
      <img
        src="/src/assets/logo.png"
        alt="Logo"
        class="logo-img"
        @click="navigateToMain"
        style="cursor: pointer"
      />
    </div>

    <!-- 메뉴 -->
    <nav class="menu flex-grow-1">
      <ul class="menu-list d-flex list-unstyled mb-0">
        <li class="menu-item me-4">
          <a href="#" class="text-white" @click.prevent="navigateToMain"
            >메인</a
          >
        </li>
        <li class="menu-item me-4">
          <a href="#" class="text-white" @click.prevent="navigateToPopular"
            >대세 콘텐츠</a
          >
        </li>
        <li class="menu-item me-4">
          <a href="#" class="text-white" @click.prevent="navigateToWishlist"
            >내가 찜한 리스트</a
          >
        </li>
        <li class="menu-item">
          <a href="#" class="text-white" @click.prevent="navigateToSearch"
            >찾아보기</a
          >
        </li>
      </ul>
    </nav>

    <!-- 사용자 정보 -->
    <div class="user-info d-flex align-items-center">
      <span v-if="isLoggedIn" class="text-white me-3"
        >안녕하세요, {{ userEmail }}</span
      >
      <Button v-if="isLoggedIn" class="p-button-danger" @click="handleLogout"
        >로그아웃</Button
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Button from "primevue/button";
import { useBaseRouter } from "../../router/useBaseRouters.ts";

const {
  navigateToWishlist,
  navigateToMain,
  navigateToPopular,
  navigateToSearch,
  navigateToSignIn,
} = useBaseRouter();

// 사용자 상태 관리
const userEmail = ref("");
const isLoggedIn = computed(() => !!userEmail.value); // 이메일이 있으면 로그인 상태

// 로그아웃 처리
const handleLogout = () => {
  localStorage.removeItem("is_logged_in"); // 로그인 상태 제거
  userEmail.value = "";
  alert("로그아웃 되었습니다.");
  navigateToSignIn();
};

// 사용자 정보 로드
onMounted(() => {
  const loggedInData = JSON.parse(localStorage.getItem("is_logged_in"));
  const currentTime = new Date().getTime();

  if (loggedInData && currentTime < loggedInData.expiresAt) {
    // 로그인 상태일 경우 사용자 이메일 표시
    userEmail.value = localStorage.getItem("email") || "";
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 이동
    navigateToSignIn();
  }
});
</script>

<style scoped>
.header {
  background-color: #141414;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
}

.logo-img {
  height: 40px;
}

.menu-list {
  display: flex;
  margin: 0;
  padding: 0;
}

.menu-item a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.menu-item a:hover {
  text-decoration: underline;
}

.user-info {
  font-size: 1rem;
}
</style>
