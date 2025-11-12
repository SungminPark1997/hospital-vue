import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Management from "../views/ManagementView.vue";
import Map from "../views/MapView.vue";
import RegisterView from "../views/RegisterView.vue";
import { useAuthStore } from "../store/authStore";
import MyPageView from "../views/MyPageView.vue";
import LoginView from "../views/LoginView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/map",
    name: "map",
    component: Map,
    meta: { requiredAuth: true },
  },
  {
    path: "/management",
    name: "management",
    component: Management,
    meta: { roles: ["ADMIN"] },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPageView,
    meta: { requiredAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.roles && !to.meta.roles.includes(auth.role ?? "")) {
    console.log(auth.role);
    alert("접근 권한이 없습니다.");
    return next("/");
  }
  if (to.path === "/login" && auth.isLoggedIn) {
    return next("/"); // 홈으로 리다이렉트
  }
  if (to.meta.requiredAuth && !auth.isLoggedIn) {
    alert("로그인이 필요합니다.");
    return next("/login");
  }

  next();
});
export default router;
