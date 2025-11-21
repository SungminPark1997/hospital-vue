import api from "./axios";

export interface ChatRoom {
  id: number;
  memberCount: number;
}
export interface CreateRoomResponse {
  data: {
    roomId: number;
  };

  message: string;
  success: boolean;
}

// ✅ 채팅방 목록 가져오기
export async function getChatRooms(userId: number): Promise<any> {
  const { data } = await api.get(`/chat/rooms/${userId}`);
  return data;
}

export async function createChatRoom(
  creatorId: number,
  targetUserId: number
): Promise<CreateRoomResponse> {
  const { data } = await api.post<CreateRoomResponse>("/chat/create", {
    creatorId,
    targetUserId,
  });
  return data;
}

export async function getChats(roomId: number) {
  const { data } = await api.get(`/chat/messages/${roomId}`);
  return data;
}
