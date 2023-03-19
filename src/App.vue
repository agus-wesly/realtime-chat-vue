<template>
  <main class="p-10 py-5 max-w-5xl m-auto">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { onAuthStateChanged } from "@firebase/auth";
import { defineComponent, onMounted, onUnmounted } from "vue";
import { auth } from "./firebase";
import { useAuthStore } from "./store/auth";
import type { Unsubscribe } from "@firebase/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "app",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    
    let abort: Unsubscribe | null;
    onMounted(() => {
      abort = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, photoURL, displayName } = user;
          authStore.login({ email, uid, photoURL, displayName });
          router.push("/");
        } else {
          authStore.logout();
          router.push({ name: "login" });
        }
      });
      onUnmounted(() => {
        if (abort) abort();
      });
    });
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  display: none;
}
</style>
