// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";

// ✅ 전역 스타일
import "../src/assets/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css"; //  CSS만 가져오기
import "bootstrap-icons/font/bootstrap-icons.css"; //  아이콘용 CSS
import "bootstrap-vue-3/dist/bootstrap-vue-3.css"; //  (누락되면 모달 안뜸)

// ✅ 라이브러리
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import BootstrapVue3 from "bootstrap-vue-3";

// ✅ 앱 생성
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.mount("#app");
