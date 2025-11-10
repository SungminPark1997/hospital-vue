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
import { useErrorHandler } from "../composables/useErrorHandlerts";

// 유저 아이디/비밀번호
const username = ref("");
const password = ref("");

const router = useRouter();

// 로그인 여부 상태 관리 스토어
const auth = useAuthStore();
const { error, throwError } = useErrorHandler();

// 로그인 처리 함수
const login = async () => {
  try {
    const res = await loginUser({
      username: username.value,
      password: password.value,
    });

    if (res.success === false) {
      throwError(new Error(res.message), "로그인 실패");
    } else {
      localStorage.setItem("token", res.token); // 로그인 성공하면 localstorage에 토큰 저장 (나중에는 http only 쿠키로 바꿔야 할듯)
      auth.login(res.token, res.username, res.role); // 스토어에 로그인 상태 반영
      alert("로그인 성공!");
      router.push("/");
    }
  } catch (err) {
    throwError(err, "로그인 실패");
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
