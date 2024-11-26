<template>
  <div
    class="login-page d-flex justify-content-center align-items-center vh-100"
    style="
      background-image: url(&quot;/path/to/background.jpg&quot;);
      background-size: cover;
    "
  >
    <div
      class="login-container p-4 rounded"
      style="background-color: rgba(0, 0, 0, 0.75); width: 400px"
    >
      <h2 class="text-white text-start mb-4">로그인</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText
              class="form-control"
              id="in_label"
              v-model="email"
              variant="filled"
            />
            <label for="in_label">이메일 주소</label>
          </FloatLabel>
        </div>
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText
              class="form-control"
              id="in_label"
              v-model="password"
              variant="filled"
            />
            <label for="in_label">비밀번호</label>
          </FloatLabel>
        </div>
        <div class="mb-3 d-flex align-items-center">
          <Checkbox
            v-model="rememberMe"
            inputId="remember-me"
            name="remember-me"
            value="remember-me"
          />
          <label for="remember-me" class="ms-2 text-white">로그인 유지</label>
        </div>
        <div v-if="errorMessage" class="text-danger mb-3">
          {{ errorMessage }}
        </div>
        <Button type="submit" class="btn btn-danger w-100 mb-3">로그인</Button>
        <div class="text-center text-white">
          <p class="f-s-6 text-secondary">
            계정이 없으신가요?<a class="ms-2" href="#" @click="navigateToSignUp"
              >회원가입</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useBaseRouter } from "../../router/useBaseRouters.ts";
import { useToast } from "primevue/usetoast";
import { setWithExpiry } from "../../utils/local_storage_utils.ts";

const toast = useToast();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");

const { navigateToMain, navigateToSignUp } = useBaseRouter();

const handleLogin = () => {
  if (!validateEmail(email.value)) {
    // 이메일 형식이 아닐 때
    errorMessage.value = "유효한 이메일 형식이 아닙니다.";
    return;
  }

  const storedPassword = localStorage.getItem(email.value);

  if (!storedPassword) {
    // 이메일이 존재하지 않을 때
    errorMessage.value = "등록되지 않은 이메일입니다.";
    return;
  }

  if (storedPassword !== password.value) {
    // 비밀번호가 일치하지 않을 때
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  // 로그인 성공
  localStorage.setItem("remember_me", rememberMe.value ? "true" : "false");
  if (rememberMe.value) {
    setWithExpiry("is_logged_in", 7 * 24 * 60 * 60 * 1000); // 1주일
  } else {
    setWithExpiry("is_logged_in", 60 * 60 * 1000); // 1시간
  }
  errorMessage.value = "";
  showSuccess();
  navigateToMain();
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "로그인 성공",
    detail: "로그인에 성공하였습니다!",
    life: 3000,
  });
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>

<style scoped>
.login-page {
  background-color: #141414;
}
.login-container {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
