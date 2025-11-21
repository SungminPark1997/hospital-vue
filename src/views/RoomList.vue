<template>
  <div class="room-list-wrap">
    <header class="chat-header">
      <h2>채팅방 목록</h2>
    </header>

    <div class="room-list">
      <div
        v-for="room in chatRooms"
        :key="room.id"
        class="room-item"
        @click="goRoom(room.id)"
      >
        📌 방 #{{ room.id }}
      </div>
    </div>

    <!-- 자식 ref -->
    <CreateChatModal
      ref="chatModalRef"
      :users="users"
      @created="onRoomCreated"
    />

    <button @click="openModal">채팅방 만들기</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CreateChatModal from "../components/modal/CreateChatModal.vue";
import { getAllUsers, User } from "../api/userApi";
import { useAuthStore } from "../store/authStore";
import { createChatRoom, getChatRooms } from "../api/chatApi";

const router = useRouter();

// 자식 컴포넌트 인스턴스 ref
const chatModalRef = ref<InstanceType<typeof CreateChatModal> | null>(null);

// 더미 방 목록
const chatRooms = ref([]);

// 유저 목록
const users = ref(<User[]>[]);
const userStore = useAuthStore();
// 모달 열기 (자식의 open() 호출)
const openModal = () => {
  console.log("모달 열기");
  chatModalRef.value?.open();
};

// 방 생성 완료 처리 roomid는 백에서 받아오도록 하자
const onRoomCreated = async (targetUserId: number) => {
  const creatorId = Number(userStore.id);

  const res = await createChatRoom(creatorId, targetUserId);
  console.log(res);
  const rooms = await getChatRooms(Number(userStore.id));
  if (rooms.success) {
    chatRooms.value = rooms.data;
  }
  router.push(`/chat/room/${Number(res.data.roomId)}`);
};

// 채팅방 이동
const goRoom = (id: number) => {
  router.push(`/chat/room/${id}`);
};

onMounted(async () => {
  const currentUserName = userStore.username; // 현재 로그인한 사용자 이름

  const res = await getAllUsers();
  if (res.success) {
    users.value = res.data
      // ① 먼저 자신 제외
      .filter((u: any) => u.username !== currentUserName)
      // ② 필요한 필드로 변환
      .map((u: any) => ({
        id: u.id,
        name: u.username,
      }));

    console.log("유저 목록:", users.value);
  } else {
    alert("유저 목록을 가져오지 못했습니다.");
    return;
  }
  const rooms = await getChatRooms(Number(userStore.id));
  if (rooms.success) {
    chatRooms.value = rooms.data;
  }
});
</script>
<style scoped>
.room-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.room-list {
  height: 300px; /* 🔥 절대 변경되지 않는 고정 높이 */
  overflow-y: auto; /* 🔥 내부 스크롤 */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

/* 리스트 아이템 스타일 */
.room-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.room-item:last-child {
  border-bottom: none;
}

/* 버튼이 고정되어 아래에 배치되도록 */
button {
  align-self: flex-end;
}
</style>
