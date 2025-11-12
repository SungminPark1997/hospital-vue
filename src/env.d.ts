/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean; // 로그인 여부 검사용
    roles?: string[]; //  roles 속성 정의
  }
}
