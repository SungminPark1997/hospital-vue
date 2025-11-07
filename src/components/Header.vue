<template>
  <header class="app-header">
    <nav class="nav">
      <!-- 좌측 메뉴 -->
      <ul class="nav-list">
        <li><router-link to="/">홈</router-link></li>
        <li><router-link to="/map">지도</router-link></li>
        <li><router-link to="/management">병원 관리</router-link></li>
      </ul>

      <!-- 우측 로그인 / 로그아웃 -->
      <div class="auth-section">
        <button v-if="!auth.isLoggedIn" class="btn" @click="goLogin">
          로그인
        </button>
        <button v-if="!auth.isLoggedIn" class="btn" @click="goRegister">
          회원가입
        </button>
        <button v-else class="btn btn-logout" @click="logout">로그아웃</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
const router = useRouter();

const auth = useAuthStore();
const goLogin = () => {
  router.push("/login");
};

const goRegister = () => {
  router.push("/register");
};

const logout = () => {
  localStorage.removeItem("token"); // 토큰 삭제

  auth.logout();
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
  width: 100%;
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
}
.router-link-active {
  background: #eef2ff;
  color: #1e40af;
}
.auth-section {
  display: flex;
  gap: 8px;
}
.btn {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn:hover {
  background-color: #1e40af;
}
.btn-logout {
  background-color: #ef4444;
}
.btn-logout:hover {
  background-color: #b91c1c;
}
</style>
