<template>
  <div id="map" style="width: 100%; height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getActiveHospitals } from "../api/hospitalApi";
import type { Hospital } from "../api/hospitalApi";
import { useKakaoMap } from "../composables/useKaKaoMap";

const activeHospitals = ref<Hospital[]>([]);

onMounted(async () => {
  // 1️⃣ 병원 데이터 가져오기
  activeHospitals.value = await getActiveHospitals();
  console.log("🏥 병원 데이터:", activeHospitals.value.length);

  // 2️⃣ 좌표가 있는 병원만 필터링
  const validHospitals = activeHospitals.value.filter(
    (h) => h.xcoord !== null && h.ycoord !== null
  );

  // 3️⃣ KakaoMap용 마커 리스트 생성
  const markerList = validHospitals.map((h) => ({
    lat: Number(h.ycoord),
    lng: Number(h.xcoord),
    markerText: h.bizName,
  }));

  console.log("📍 유효 마커 개수:", markerList.length);

  // 4️⃣ 지도 렌더링 (DOM 준비 완료 시점)
  useKakaoMap("map", markerList);
});
</script>
