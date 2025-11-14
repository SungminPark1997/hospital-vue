import { onUnmounted, nextTick, ref } from "vue";

export interface KakaoMapOptions {
  lat: number;
  lng: number;
  markerText?: string;
}

// 카카오맵
export function useKakaoMap(containerId: string, markers: KakaoMapOptions[]) {
  let map: any = null;
  let clusterer: any = null;
  const kakaoLoaded = ref(false);
  let renderedOnce = false;

  /**
   * ✅ Kakao SDK 로드
   */
  const loadKakaoSdk = (): Promise<typeof window.kakao> => {
    return new Promise((resolve, reject) => {
      // 이미 로드된 경우
      if (window.kakao && window.kakao.maps) {
        resolve(window.kakao);
        return;
      }

      // 기존 스크립트가 있으면 기다림
      const existing = document.getElementById("kakao-map-sdk");
      if (existing) {
        const check = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(check);
            resolve(window.kakao);
          }
        }, 100);
        return;
      }

      // 새로 추가
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6051d465fa0e2eb2534336d0fcf53341&autoload=false&libraries=clusterer";
      script.onload = () => {
        window.kakao.maps.load(() => resolve(window.kakao));
      };
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  };

  /**
   * ✅ 지도 초기화 (1회)
   */
  const initMap = (kakao: typeof window.kakao) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error("❌ 지도 컨테이너 없음:", containerId);
      return;
    }

    const centerLat = markers[0]?.lat ?? 37.5665;
    const centerLng = markers[0]?.lng ?? 126.978;

    map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(centerLat, centerLng),
      level: 6,
    });

    clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
      gridSize: 60,
    });
  };

  /**
   * ✅ 마커 렌더링 (1회만)
   */
  const renderMarkers = (kakao: typeof window.kakao) => {
    if (!map || !clusterer || renderedOnce) return;
    if (!markers || markers.length === 0) {
      console.warn("⚠️ 마커 데이터가 비어있습니다.");
      return;
    }

    const kakaoMarkers = markers.map((m) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(m.lat, m.lng),
      });

      if (m.markerText) {
        const info = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${m.markerText}</div>`,
        });
        kakao.maps.event.addListener(marker, "click", () =>
          info.open(map, marker)
        );
      }

      return marker;
    });

    clusterer.addMarkers(kakaoMarkers);
    renderedOnce = true;
    console.log(`✅ 지도 초기화 & 마커 ${kakaoMarkers.length}개 렌더링 완료`);
  };

  /**
   * ✅ 실행
   */
  const init = async () => {
    await nextTick();
    const kakao = await loadKakaoSdk();
    initMap(kakao);
    kakaoLoaded.value = true;
    renderMarkers(kakao);
  };

  init();

  /**
   * ✅ 언마운트 시 정리
   */
  onUnmounted(() => {
    if (clusterer) clusterer.clear();
    map = null;
    clusterer = null;
    console.log("🧹 지도 리소스 해제 완료");
  });
}
