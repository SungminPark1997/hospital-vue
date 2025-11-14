<template>
  <div class="container my-5">
    <div class="card shadow-sm p-4">
      <h3 class="mb-4 text-center fw-bold">마이페이지</h3>

      <div class="d-flex align-items-center gap-4">
        <!-- 📝 사용자 정보 -->
        <div class="flex-grow-1">
          <h5 class="fw-semibold mb-1">{{ auth.username }} 님</h5>
          <p class="text-muted mb-3">
            권한: <span class="fw-bold">{{ auth.role || "일반 사용자" }}</span>
          </p>

          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="togglePasswordForm">
              <i class="bi bi-pencil-square me-1"></i> 비밀번호 변경
            </button>

            <button class="btn btn-outline-danger btn-sm" @click="logout">
              <i class="bi bi-box-arrow-right me-1"></i> 로그아웃
            </button>
          </div>
        </div>
      </div>

      <!-- 🔽 비밀번호 변경 폼 -->
      <div v-if="showPasswordForm" class="mt-4 border-top pt-4">
        <h5 class="fw-bold mb-3">비밀번호 변경</h5>

        <div class="mb-3">
          <BaseInput
            type="password"
            class="form-control"
            v-model="oldPassword"
            label="현재 비밀번호"
          />
        </div>

        <div class="mb-3">
          <BaseInput
            type="password"
            class="form-control"
            v-model="newPassword"
            label="새 비밀번호"
          />
        </div>

        <div class="mb-3">
          <BaseInput
            type="password"
            class="form-control"
            label="새 비밀번호 확인"
            v-model="newPasswordCheck"
          />
        </div>

        <!-- 에러 메시지 -->
        <p v-if="error" class="text-danger small mb-2 ms-1">
          {{ error }}
        </p>

        <div class="d-flex gap-2">
          <BaseButton color="success" @click="changePasswordHandler">
            <i class="bi bi-check-lg me-1"></i>
            비밀번호 변경하기
          </BaseButton>

          <BaseButton color="gray" @click="togglePasswordForm">
            취소
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { changePassword } from "../api/userApi";
import BaseButton from "../components/BaseButton.vue";
import { useErrorHandler } from "../composables/useErrorHandlers";
import BaseInput from "../components/BaseInput.vue";

const auth = useAuthStore();
const router = useRouter();

const showPasswordForm = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const newPasswordCheck = ref("");

const { error, throwError } = useErrorHandler();
// 🔽 비밀번호 변경 폼 열기/닫기
const togglePasswordForm = () => {
  showPasswordForm.value = !showPasswordForm.value;
  error.value = "";
  oldPassword.value = "";
  newPassword.value = "";
  newPasswordCheck.value = "";
};

// 🔽 로그아웃
const logout = () => {
  auth.logout();
  alert("로그아웃 되었습니다.");
  router.push("/login");
};

// 🔥 비밀번호 변경 요청
const changePasswordHandler = async () => {
  // 비밀번호 확인 검사
  if (newPassword.value !== newPasswordCheck.value) {
    error.value = "새 비밀번호가 서로 일치하지 않습니다.";
    return;
  }

  try {
    const res = await changePassword({
      username: auth.username,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    console.log("res", res);
    if (res.success) {
      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");

      auth.logout();
      router.push("/login");
    } else {
      alert("비밀번호 변경에 실패하였습니다");
    }
  } catch (e) {
    error.value = "비밀번호 변경에 실패했습니다.";
    throwError(e, "비밀번호 변경 실패");
  }
};

onMounted(() => {
  console.log("MyPageView mounted, 현재 사용자:", auth.username);
});
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
