<template>
  <div class="container my-5">
    <div class="card shadow-sm p-4">
      <h3 class="mb-4 text-center fw-bold">마이페이지</h3>

      <div v-if="auth.isLoggedIn" class="d-flex align-items-center gap-4">
        <!-- 📝 사용자 정보 -->
        <div class="flex-grow-1">
          <h5 class="fw-semibold mb-1">{{ auth.username }} 님</h5>
          <p class="text-muted mb-3">
            권한: <span class="fw-bold">{{ auth.role || "일반 사용자" }}</span>
          </p>

          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="editProfile">
              <i class="bi bi-pencil-square me-1"></i> 정보 수정
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="logout">
              <i class="bi bi-box-arrow-right me-1"></i> 로그아웃
            </button>
          </div>
        </div>
      </div>

      <!-- 🔒 비로그인 상태 -->
      <div v-else class="text-center py-4">
        <p class="mb-3">로그인 후 이용할 수 있습니다.</p>
        <router-link to="/login" class="btn btn-primary">
          <i class="bi bi-box-arrow-in-right me-1"></i> 로그인하러 가기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  alert("로그아웃 되었습니다.");
  router.push("/login");
};

const editProfile = () => {
  alert("프로필 수정 기능은 준비 중입니다!");
};
</script>
