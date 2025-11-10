<template>
  <header class="app-header">
    <nav class="nav">
      <!-- 왼쪽 메뉴 -->
      <ul class="nav-list">
        <li><router-link to="/">홈</router-link></li>
        <li><router-link to="/map">지도</router-link></li>
        <li><router-link to="/management">병원 관리</router-link></li>
      </ul>

      <!-- 오른쪽 로그인 / 로그아웃 -->
      <div class="auth-section">
        <template v-if="!auth.isLoggedIn">
          <BaseButton color="primary" @click="goLogin">로그인</BaseButton>
          <BaseButton color="success" @click="goRegister">회원가입</BaseButton>
        </template>

        <template v-else>
          <BaseButton color="gray" @click="goMyPage">마이페이지</BaseButton>
          <BaseButton color="danger" @click="logout">로그아웃</BaseButton>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import BaseButton from "../components/BaseButton.vue";

const router = useRouter();
const auth = useAuthStore();

const goLogin = () => router.push("/login");
const goRegister = () => router.push("/register");
const goMyPage = () => router.push("/mypage");

const logout = () => {
  auth.$reset();
  localStorage.removeItem("token");
  alert("로그아웃 되었습니다.");
  router.push("/login");
};
</script>

<style scoped>
.app-header {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 10px 16px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list a {
  text-decoration: none;
  color: #374151;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.nav-list a:hover {
  background-color: #f3f4f6;
}

.router-link-active {
  background: #eef2ff;
  color: #1e40af;
}

.auth-section {
  display: flex;
  gap: 8px;
  min-width: 200px;
}

.base-btn {
  flex: 1;
  font-size: 0.9rem;
  white-space: nowrap;
}

/* 회색 버튼 추가 */
.base-btn.gray {
  background-color: #6c757d;
}
.base-btn.gray:hover {
  background-color: #5a6268;
}
</style>
