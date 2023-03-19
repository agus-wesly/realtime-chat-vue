<template>
  <div class="flex flex-col flex-1 border-neutral-400 border h-[83vh]">
    <div class="flex-none h-16 shadow-md flex justify-between p-5">
      <div class="flex items-center gap-4">
        <img
          :src="
            authStore.photoURL ||
            'https://www.dlsu.edu.ph/wp-content/uploads/2022/08/anonymous.png'
          "
          alt="profile"
          class="w-8 h-8 rounded-full object-cover"
          referrerpolicy="no-referrer"
        />
        <h3>{{ authStore.displayName }}</h3>
      </div>

      <div>
        <i class="pi pi-info-circle cursor-pointer"></i>
      </div>
    </div>

    <div
      class="flex-1 overflow-auto bg-neutral-100 p-5 flex flex-col gap-6"
      ref="bodyChatRef"
    >
      <Chat
        v-for="chat in chatStore.allChat"
        :message="chat.message"
        :profile="chat.photoURL"
        :key="chat.uid"
        :uid="chat.uid"
      />
    </div>

    <form
      @submit.prevent="handleSendChat"
      class="flex-none h-16 bg-white flex justify-between border-t border-neutral-400"
    >
      <input
        placeholder="Enter a text "
        class="border-none bg-transparent outline-none w-full rounded p-5"
        v-model="newMessage"
      />
      <button type="submit" class="p-4">
        <i class="pi pi-send"></i>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Chat from "./Chat.vue";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { sendMessage } from "@/utils/chat";
import { onSnapshot, type Unsubscribe } from "firebase/firestore";
import { getDocRef } from "@/firebase";

const authStore = useAuthStore();
const chatStore = useChatStore();

//Listen to change
let unsub: Unsubscribe | null = null;

const bodyChatRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const chatBody = bodyChatRef.value;
  chatBody?.addEventListener("DOMNodeInserted", () => {
    chatBody.scrollTop = chatBody.scrollHeight;
  });
});

watch(
  () => chatStore.chatId,
  (currId, prevId) => {
    if (prevId !== currId) {
      if (unsub) unsub();
    }
    if (currId) {
      console.log("Current", currId);

      unsub = onSnapshot(getDocRef(currId, "chats"), (doc) => {
        chatStore.chat = doc.data()?.chat;
      });
    }
  }
);

const newMessage = ref("");
const handleSendChat = async () => {
  await sendMessage(chatStore.chatId, {
    message: newMessage.value,
    photoURL:
      authStore.photoURL ||
      "https://www.dlsu.edu.ph/wp-content/uploads/2022/08/anonymous.png",
    uid: authStore.uid,
  });

  newMessage.value = "";
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
}
</style>
