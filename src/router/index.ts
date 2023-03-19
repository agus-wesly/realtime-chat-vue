import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import { getAuthInfo } from "@/utils/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

router.beforeEach(async (to) => {
  const isSignedIn = await getAuthInfo();

  if (to.meta.requireAuth && !isSignedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }

  if (isSignedIn && (to.fullPath === "/login" || to.fullPath == "/register")) {
    return {
      path: "/",
    };
  }
});

export default router;
