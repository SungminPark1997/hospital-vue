// main.js
import { createApp } from "vue";
import { createPinia } from "pinia"; // ✅ Pinia 임포트
import "../src/assets/styles/global.css";
import App from "./App.vue";
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";

// ✅ Pinia 인스턴스 생성
const pinia = createPinia();

// ✅ 앱 생성 및 등록 순서 중요
const app = createApp(App);
app.use(pinia); // 🟢 반드시 먼저 등록!
app.use(router);
app.use(BootstrapIconsPlugin);

app.mount("#app");
