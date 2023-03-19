<template>
  <div>
    <Navbar />
    <div class="flex gap-8">
      <Sidebar class="hidden md:block" />
      <Chat />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Chat from "@/components/Chats.vue";
</script>
