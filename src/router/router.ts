import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Management from "../views/ManagementView.vue";
import Map from "../views/MapView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

import { useAuthStore } from "../store/authStore";
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.roles && !to.meta.roles.includes(auth.role ?? "")) {
    alert("접근 권한이 없습니다.");
    return next("/");
  }

  if (to.meta.requiredAuth && !auth.isLoggedIn) {
    alert("로그인이 필요합니다.");
    return next("/login");
  }

  next();
});
export default router;
