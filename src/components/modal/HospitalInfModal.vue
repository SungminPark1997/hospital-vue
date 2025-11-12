<template>
  <BModal
    v-model="show"
    :title="hospital.bizName"
    centered
    @hide="emit('close')"
  >
    <div>
      <p class="mb-2">
        <i class="bi bi-geo-alt-fill text-primary me-2"></i>
        <strong>주소:</strong>
        <span>{{ hospital.roadAddr || "주소 정보 없음" }}</span>
      </p>

      <p class="mb-2">
        <i
          :class="[
            hospital.detailStatusName === '영업중'
              ? 'bi bi-check-circle-fill text-success me-2'
              : 'bi bi-x-circle-fill text-danger me-2',
          ]"
        ></i>
        <strong>상태:</strong>
        <span>
          {{ hospital.detailStatusName === "영업중" ? "운영 중" : "폐업" }}
        </span>
      </p>

      <p class="mb-0">
        <i class="bi bi-telephone-fill text-secondary me-2"></i>
        <strong>전화번호:</strong>
        <span>{{ hospital.tel || "등록되지 않음" }}</span>
      </p>
    </div>

    <template #footer>
      <BButton variant="outline-secondary" @click="closeModal">닫기</BButton>
    </template>
  </BModal>
</template>

<script setup lang="ts">
import type { Hospital } from "../../api/hospitalApi";
import { ref, onMounted } from "vue";
import { BModal, BButton } from "bootstrap-vue-3";

const props = defineProps<{ hospital: Hospital }>();
const emit = defineEmits<{ (e: "close"): void }>();

// BModal 제어용 상태
const show = ref(false);

// 모달이 화면에 나타나면 자동으로 열림
onMounted(() => {
  show.value = true;
  console.log("모달 열림:", props.hospital.bizName);
});

const closeModal = () => {
  show.value = false;
  emit("close");
};
</script>

<style scoped></style>
