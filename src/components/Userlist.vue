<template>
  <li
    :class="[isActive ? 'bg-blue-200' : 'bg-neutral-100 hover:bg-neutral-200']"
    class="p-2 cursor-pointer"
    @click="$emit('setSelected', userData)"
  >
    <div class="flex items-center gap-5">
      <img
        class="w-10 h-10 object-cover rounded-full"
        :src="
          props.photoURL ||
          'https://www.dlsu.edu.ph/wp-content/uploads/2022/08/anonymous.png'
        "
        referrerpolicy="no-referrer"
      />
      <div>
        <p
          :class="[isActive ? 'text-blue-800' : 'text-neutral-800']"
          class="truncate text-sm font-semibold"
        >
          {{ props.displayName }}
        </p>
        <p v-if="props.lastMesssage" class="text-xs">
          {{ props.lastMesssage }}
        </p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  lastMesssage: {
    type: String,
  },
  activeUid: {
    type: String,
  },
});

const isActive = computed(() => props.uid === props.activeUid);
const userData = {
  uid: props.uid,
  photoURL: props.photoURL,
  displayName: props.displayName,
};
</script>

<style scoped></style>
