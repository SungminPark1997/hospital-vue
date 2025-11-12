<template>
  <div class="auth-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <BaseInput
        v-model="username"
        label="아이디"
        placeholder="아이디를 입력하세요"
      />
      <BaseInput v-model="name" label="이름" placeholder="이름을 입력하세요" />
      <BaseInput
        v-model="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
      />

      <BaseButton type="submit" color="success">회원가입</BaseButton>
    </form>

    <p class="mt-3">
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
import BaseInput from "../components/BaseInput.vue";
import { useErrorHandler } from "../composables/useErrorHandlers";
const { error, throwError } = useErrorHandler();
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
    throwError(err, "회원가입 실패");
    message.value = error.value;
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
.msg {
  color: #007bff;
  margin-top: 10px;
}
</style>
