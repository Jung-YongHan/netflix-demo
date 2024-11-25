<template>
  <div class="signup-page d-flex justify-content-center align-items-center vh-100" style="background-image: url('/path/to/background.jpg'); background-size: cover;">
    <div class="signup-container p-4 rounded" style="background-color: rgba(0, 0, 0, 0.75); width: 400px;">
      <h2 class="text-white text-start mb-4">회원가입</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText class="form-control" id="email" v-model="email" variant="filled" />
            <label for="email">이메일 주소</label>
          </FloatLabel>
        </div>
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText class="form-control" type="password" id="password" v-model="password" variant="filled" />
            <label for="password">비밀번호</label>
          </FloatLabel>
        </div>
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText class="form-control" type="password" id="confirmPassword" v-model="confirmPassword" variant="filled" />
            <label for="confirmPassword">비밀번호 확인</label>
          </FloatLabel>
        </div>
        <div class="mb-3 d-flex align-items-center">
          <Checkbox v-model="agreeToTerms" inputId="agree-to-terms" />
          <label for="agree-to-terms" class="ms-2 text-white">약관에 동의합니다</label>
        </div>
        <div v-if="errorMessage" class="text-danger mb-3">
          {{ errorMessage }}
        </div>
        <Button type="submit" class="btn btn-primary w-100 mb-3">회원가입</Button>
        <div class="text-center text-white">
          <p class="f-s-6 text-secondary">이미 계정이 있으신가요?<a class="ms-2" href="#" @click="navigateToSignIn">로그인</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import {useBaseRouter} from "../../router/useBaseRouters.ts";

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const errorMessage = ref('');

const {navigateToSignIn} = useBaseRouter()

const handleSignup = () => {
  if (!validateEmail(email.value)) {
    errorMessage.value = '유효한 이메일 형식이 아닙니다.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.';
    return;
  }
  if (!agreeToTerms.value) {
    errorMessage.value = '약관에 동의하셔야 회원가입이 가능합니다.';
    return;
  }

  // 회원가입 성공 시 로그인 페이지로 이동
  navigateToSignIn()
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>

<style scoped>
.signup-page {
  background-color: #141414;
}
.signup-container {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
