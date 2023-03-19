<template>
  <nav class="flex justify-between items-center mb-5">
    <h1 class="hidden md:block text-lg font-semibold">Chat App</h1>
    <div class="block md:hidden">
      <Button icon="pi pi-bars" @click="visible = true" text />
      <Sidebar v-model:visible="visible" style="width: 264px">
        <SidebarVue />
      </Sidebar>
    </div>

    <Button
      @click="handleLogout"
      label="Logout"
      severity="danger"
      outlined
      icon="pi pi-power-off"
    />
  </nav>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import { useAuthStore } from "@/store/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { ref } from "vue";
import SidebarVue from "./Sidebar.vue";

const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  signOut(auth);
};

const visible = ref(false);
</script>

<style scoped>
.p-listbox {
  border: none;
}
</style>
