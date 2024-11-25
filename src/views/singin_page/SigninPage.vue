<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100" style="background-image: url('/path/to/background.jpg'); background-size: cover;">
    <div class="login-container p-4 rounded" style="background-color: rgba(0, 0, 0, 0.75); width: 400px;">
      <h2 class="text-white text-start mb-4">로그인</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText class="form-control" id="in_label" v-model="email" variant="filled" />
            <label for="in_label">이메일 주소 또는 휴대폰 번호</label>
          </FloatLabel>
        </div>
        <div class="mb-3">
          <FloatLabel variant="in">
            <InputText class="form-control" id="in_label" v-model="password" variant="filled" />
            <label for="in_label">비밀번호</label>
          </FloatLabel>
        </div>
        <div class="mb-3 d-flex align-items-center">
          <Checkbox v-model="rememberMe" inputId="remember-me" name="remember-me" value="Normal" />
          <label for="remember-me" class="ms-2">로그인 유지</label>
        </div>
        <div v-if="errorMessage" class="text-danger mb-3">
          {{ errorMessage }}
        </div>
        <Button type="submit" class="btn btn-danger w-100 mb-3">로그인</Button>
        <div class="text-center text-white">
          <p class="f-s-6 text-secondary">계정이 없으신가요?<a class="ms-2" href="#" @click="navigateToSignUp">회원가입</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button"
import {useBaseRouter} from "../../router/useBaseRouters.ts";

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');

const {navigateToMain, navigateToSignUp} = useBaseRouter()

const handleLogin = () => {
  if (validateEmail(email.value)) {
    if (email.value === 'test@example.com' && password.value === 'password123') {
      if (rememberMe.value) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
      } else {

      }
      navigateToMain()
    } else {
      errorMessage.value = '아이디 또는 비밀번호가 잘못되었습니다.';
    }
  } else {
    errorMessage.value = '유효한 이메일 형식이 아닙니다.';
  }
};

const validateEmail = (email) => {
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
