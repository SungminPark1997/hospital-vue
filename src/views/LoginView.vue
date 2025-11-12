<template>
  <div class="auth-container">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <BaseInput
        v-model="username"
        label="아이디"
        placeholder="아이디를 입력하세요"
      />
      <BaseInput
        v-model="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
      />

      <BaseButton type="submit" color="primary">로그인</BaseButton>
    </form>

    <p class="mt-3">
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
import BaseInput from "../components/BaseInput.vue";
import { useErrorHandler } from "../composables/useErrorHandlers";

const username = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();
const { error, throwError } = useErrorHandler();

const login = async () => {
  try {
    const res = await loginUser({
      username: username.value,
      password: password.value,
    });

    if (res.success === false) {
      throwError(new Error(res.message), "로그인 실패");
    } else {
      console.log("로그인 성공:", res);
      auth.login(res.data.token, res.data.username, res.data.role);
      console.log(res.role);
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
.error {
  color: red;
  margin-top: 10px;
}
</style>
