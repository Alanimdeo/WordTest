import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "메인", component: () => import("./components/Main.vue") },
        { path: "/test", name: "테스트", component: () => import("./components/Test.vue") },
        { path: "/create", name: "생성", component: () => import("./components/Create.vue") },
    ],
});
