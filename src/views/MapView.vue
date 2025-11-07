<template>
  <div id="map" style="width: 100%; height: 500px"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // 1️⃣ Kakao Map SDK 스크립트 동적 로드
  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=6051d465fa0e2eb2534336d0fcf53341&autoload=false"; // autoload=false 중요
  document.head.appendChild(script);

  // 2️⃣ 스크립트 로드 후 실행
  script.onload = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 좌표
        level: 3, // 확대 레벨 (1~14)
      };

      const map = new window.kakao.maps.Map(container, options);

      // 3️⃣ 마커 예시
      const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 4️⃣ 마커 클릭 이벤트
      const info = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">서울시청</div>',
      });
      window.kakao.maps.event.addListener(marker, "click", () => {
        info.open(map, marker);
      });
    });
  };
});
</script>
