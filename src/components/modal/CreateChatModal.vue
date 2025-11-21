<template>
  <BModal v-model="visible" title="채팅 상대 선택" hide-footer>
    <div>
      <div
        v-for="u in users"
        :key="u.id"
        class="user-item"
        :class="{ active: selectedUser === u.id }"
        @click="selectedUser = u.id"
      >
        {{ u.name }}
      </div>
    </div>

    <div class="d-flex justify-content-end gap-2 mt-3">
      <BButton variant="secondary" @click="close">취소</BButton>
      <BButton variant="primary" :disabled="!selectedUser" @click="createRoom">
        생성하기
      </BButton>
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BModal, BButton } from "bootstrap-vue-3";

const emit = defineEmits<{
  (e: "created", targetUserId: number): void;
}>();

const props = defineProps<{
  users: { id: number; name: string }[];
}>();

// 👇 BModal 표시 여부를 제어하는 상태
const visible = ref(false);
const selectedUser = ref<number | null>(null);

// 부모에서 호출할 메서드
const open = () => {
  selectedUser.value = null;
  visible.value = true;
};

const close = () => {
  visible.value = false;
};

const createRoom = () => {
  if (!selectedUser.value) return;

  emit("created", selectedUser.value);

  close();
};

// 부모에서 open/close 쓸 수 있게 노출
defineExpose({ open, close });
</script>

<style scoped>
.user-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.user-item.active {
  background: #4f8dfd;
  color: white;
  border-color: #4f8dfd;
}
</style>
