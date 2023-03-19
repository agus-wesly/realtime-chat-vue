<template>
  <div
    class="flex items-end gap-2"
    :class="[uid === authStore.uid && 'flex-row-reverse self-end']"
  >
    <img
      :src="profile"
      class="rounded-full w-8 h-8 bg-slate-400 object-cover"
    />
    <div class="rounded-xl bg-gray-300 p-2 px-4 max-w-xs wrap">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const { message, profile, uid } = defineProps({
  message: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
}
</style>
