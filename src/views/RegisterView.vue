<template>
  <div class="auth-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="아이디" required />
      <input v-model="name" placeholder="이름" required />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        required
      />
      <BaseButton type="submit" color="success">회원가입</BaseButton>
    </form>

    <p>
      이미 계정이 있으신가요?
      <router-link to="/login">로그인</router-link>
    </p>

    <p v-if="message" class="msg">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../api/userApi";
import BaseButton from "../components/BaseButton.vue";

const username = ref("");
const name = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

const register = async () => {
  try {
    const res = await registerUser({
      username: username.value,
      name: name.value,
      password: password.value,
    });

    if (res.success) {
      message.value = "회원가입 성공! 로그인 페이지로 이동합니다.";
      setTimeout(() => router.push("/login"), 1500);
    } else {
      message.value = "회원가입 실패. 이미 존재하는 아이디일 수 있습니다.";
    }
  } catch (err) {
    console.error("회원가입 오류:", err);
    message.value = "회원가입 중 오류가 발생했습니다.";
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
.msg {
  color: #007bff;
  margin-top: 10px;
}
</style>
