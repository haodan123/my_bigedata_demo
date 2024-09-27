import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/index1",
    },
    {
      path: "/index1",
      name: "index1",
      component: () => import("@/views/sc1/index.vue"),
    }, {
      path: "/index2",
      name: "index2",
      component: () => import("@/views/sc2/index.vue"),
    }, {
      path: "/index3",
      name: "index3",
      component: () => import("@/views/sc3/index.vue"),
    }
  ],
});

export default router;
