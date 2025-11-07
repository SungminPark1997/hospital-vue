<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-container" @click.stop>
      <h2 class="modal-title">
        🏥 {{ isEdit ? "병원 정보 수정" : "새 병원 등록" }}
      </h2>

      <form @submit.prevent="submitForm" class="modal-form">
        <!-- 병원명 -->
        <div class="mb-3">
          <label class="form-label"
            >병원명 <span class="text-danger">*</span></label
          >
          <input
            type="text"
            v-model.trim="form.bizName"
            class="form-control"
            required
          />
        </div>

        <!-- 병원 종류 -->
        <div class="mb-3">
          <label class="form-label"
            >병원 종류 <span class="text-danger">*</span></label
          >
          <input
            type="text"
            v-model.trim="form.bizType"
            class="form-control"
            required
          />
        </div>

        <!-- 상세 상태명 -->
        <div class="mb-3">
          <label class="form-label">상태</label>
          <select v-model.trim="form.detailStatusName" class="form-select">
            <option value="영업중">영업중</option>
            <option value="폐업">폐업</option>
          </select>
        </div>

        <!-- 전화번호 -->
        <div class="mb-3">
          <label class="form-label">전화번호</label>
          <input
            type="text"
            v-model.trim="form.tel"
            class="form-control"
            placeholder="예: 02-123-4567"
          />
        </div>

        <!-- 주소 -->
        <div class="mb-3">
          <label class="form-label">도로명 주소</label>
          <input
            type="text"
            v-model.trim="form.roadAddr"
            class="form-control"
            placeholder="예: 서울특별시 강남구 테헤란로 123"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">지번 주소</label>
          <input
            type="text"
            v-model.trim="form.lotAddr"
            class="form-control"
            placeholder="예: 서울특별시 강남구 역삼동 123-45"
          />
        </div>

        <!-- 우편번호 -->
        <div class="mb-3">
          <label class="form-label">우편번호</label>
          <input
            type="text"
            v-model.trim="form.roadZip"
            class="form-control"
            placeholder="예: 06236"
          />
        </div>

        <!-- 좌표 -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">X 좌표</label>
            <input
              type="number"
              step="0.0001"
              v-model.number="form.xcoord"
              class="form-control"
              placeholder="예: 203895.66"
            />
          </div>
          <div class="col">
            <label class="form-label">Y 좌표</label>
            <input
              type="number"
              step="0.0001"
              v-model.number="form.ycoord"
              class="form-control"
              placeholder="예: 457580.99"
            />
          </div>
        </div>

        <!-- 생성일 / 수정일 (수정 모드에서만 표시) -->
        <div v-if="isEdit" class="mt-3 text-muted small">
          <p>
            <strong>등록일:</strong> {{ formatDate(form.createdAt) || "-" }}
          </p>
          <p>
            <strong>수정일:</strong> {{ formatDate(form.updatedAt) || "-" }}
          </p>
        </div>

        <!-- 버튼 -->
        <div class="text-end mt-4">
          <button
            type="button"
            class="btn btn-secondary me-2"
            @click="emit('close')"
          >
            닫기
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEdit ? "수정 완료" : "등록" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Hospital } from "../../api/hospitalApi";
import { formatDate } from "../../utils/date";
const props = defineProps<{
  isEdit?: boolean;
  hospital?: Hospital | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", data: any): void;
}>();

const form = ref<Partial<Hospital>>({
  bizName: "",
  bizType: "",
  statusCode: null,
  detailStatusCode: null,
  detailStatusName: "",
  tel: "",
  roadAddr: "",
  lotAddr: "",
  roadZip: "",
  xcoord: null,
  ycoord: null,
  createdAt: "",
  updatedAt: "",
});

// ✅ 수정 모드 시 기존 데이터 자동 주입
watch(
  () => props.hospital,
  (val) => {
    if (props.isEdit && val) {
      form.value = { ...val };
    }
    console.log("HospitalFormModal - form data:", form.value);
  },
  { immediate: true }
);

watch(
  () => form.value.detailStatusName,
  (name) => {
    if (name === "영업중") form.value.detailStatusCode = 13;
    else if (name === "폐업") form.value.detailStatusCode = 3;
  }
);

// ✅ 제출
const submitForm = () => {
  if (!form.value.bizName || !form.value.bizType) {
    alert("병원명과 병원 종류는 필수 입력 항목입니다.");
    return;
  }
  emit("submit", { ...form.value });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
}
.modal-container {
  background: #fff;
  border-radius: 10px;
  padding: 22px;
  width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  font-size: 0.9rem;
}
.modal-title {
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 1rem;
}
.form-label {
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
