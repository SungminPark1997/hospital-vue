<template>
  <div class="auth-container">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="아이디" required />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        required
      />
      <BaseButton type="submit" color="primary">로그인</BaseButton>
    </form>

    <p>
      계정이 없으신가요?
      <router-link to="/register">회원가입</router-link>
    </p>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../api/userApi";
import { useAuthStore } from "../store/authStore";
import BaseButton from "../components/BaseButton.vue";

// 유저 아이디/비밀번호
const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// 로그인 여부 상태 관리 스토어
const auth = useAuthStore();

// 로그인 처리 함수
const login = async () => {
  try {
    const res = await loginUser({
      username: username.value,
      password: password.value,
    });

    if (res.success === false) {
      error.value = "로그인 실패. 아이디 또는 비밀번호를 확인하세요.";
    } else {
      localStorage.setItem("token", res.token);
      auth.login(res.token, res.username, res.role);
      alert("로그인 성공!");
      router.push("/");
    }
  } catch (err) {
    console.error(err);
    error.value = "로그인 중 오류가 발생했습니다.";
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 350px;
  margin: 80px auto;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
