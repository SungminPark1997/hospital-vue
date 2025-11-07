<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="custom-modal">
      <h2>{{ hospital.bizName }}</h2>
      <p><strong>주소:</strong> {{ hospital.roadAddr || "주소 정보 없음" }}</p>
      <p>
        <strong>상태:</strong>
        {{ hospital.detailStatusName === "영업중" ? "운영 중" : "폐업" }}
      </p>
      <p><strong>전화번호:</strong> {{ hospital.tel || "등록되지 않음" }}</p>
      <button class="btn ghost sm" @click="emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hospital } from "../../api/hospitalApi";
import "../../assets/styles/modal.css";

const props = defineProps<{ hospital: Hospital }>();
const emit = defineEmits<{ (e: "close"): void }>();
</script>
