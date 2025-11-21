<template>
  <div class="chat-room-wrap">
    <header class="chat-header">
      <button class="back-btn" @click="goBack">← 뒤로가기</button>
      <h2>방 #{{ roomId }}</h2>
    </header>

    <!-- 메시지 영역 -->
    <main class="chat-body" ref="chatBodyRef">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="msg-row"
        :class="msg.senderId === myId ? 'me' : 'other'"
      >
        <div class="msg-bubble">
          {{ msg.message }}
        </div>
      </div>
    </main>

    <!-- 입력 영역 -->
    <footer class="chat-input-bar">
      <input
        type="text"
        v-model="draft"
        @keyup.enter="sendChat"
        placeholder="메시지를 입력하세요..."
      />
      <button @click="sendChat">전송</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getChats } from "../api/chatApi";

import { useAuthStore } from "../store/authStore";

const route = useRoute();
const router = useRouter();
const userStore = useAuthStore();

const roomId = Number(route.params.roomId);
const myId = Number(userStore.id); // 현재 로그인한 사용자 ID

const messages = ref<any[]>([]);
const draft = ref("");
const chatBodyRef = ref<HTMLElement | null>(null);

let stompClient: any = null;

// 🟦 뒤로가기
const goBack = () => {
  router.push("/chat");
};

// 🟦 스크롤 아래로 이동
const scrollToBottom = () => {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
    }
  });
};

// 🟦 WebSocket 연결
const connectWebSocket = () => {
  const socket = new SockJS("http://localhost:8081/ws-chat");
  stompClient = Stomp.over(socket);

  // 웹 소켓 연결하는 로직
  stompClient.connect({}, () => {
    console.log("웹소켓 연결됨");

    // 방 구독
    stompClient.subscribe(`/topic/chat/${roomId}`, (msg: any) => {
      const body = JSON.parse(msg.body);
      messages.value.push(body);
      scrollToBottom();
    });
  });
};

// 🟦 메시지 전송
const sendChat = () => {
  if (!draft.value.trim()) return;

  const chatMsg = {
    roomId,
    senderId: myId,
    message: draft.value,
  };

  stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMsg));

  draft.value = "";
};

// 🟦 컴포넌트 로드 시 실행
onMounted(async () => {
  // 1) 이전 메시지 로드
  const res = await getChats(roomId);
  console.log(res);
  if (res.success) {
    messages.value = res.data;
    scrollToBottom();
  }

  // 2) 웹소켓 연결
  connectWebSocket();
});

// 🟦 컴포넌트 종료 시 연결 해제
onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log("웹소켓 연결 종료");
    });
  }
});
</script>

<style scoped>
.chat-room-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.chat-header {
  padding: 14px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.msg-row {
  display: flex;
  margin-bottom: 10px;
}
.msg-row.other {
  justify-content: flex-start;
}
.msg-row.me {
  justify-content: flex-end;
}

.msg-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  background: #4f8dfd;
  color: white;
}
.msg-row.other .msg-bubble {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.chat-input-bar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #fff;
  border-top: 1px solid #ddd;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
