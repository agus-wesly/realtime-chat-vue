<template>
  <div class="w-52">
    <div class="border border-neutral-100 pl-2 py-3">
      <input
        v-model="searchInput"
        class="bg-transparent outline-none"
        placeholder="Search user"
      />
    </div>

    <!-- SEARCH-LIST -->
    <ul v-if="searchUser" class="flex flex-col mt-5 gap-2">
      <UserList
        v-for="user in searchUser"
        :display-name="user.displayName"
        :photo-u-r-l="user.photoURL"
        :active-uid="selectedUser?.uid"
        :uid="user.uid"
        @set-selected="handleSelectUser"
      />
    </ul>

    <!-- LIST -->

    <div v-else class="mt-5">
      <p>You dont have conversation yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserList from "./Userlist.vue";
import { ref, computed, type Ref } from "vue";
import { useAuthStore, type State } from "@/store/auth";
import { query, where } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { useFirestore } from "@vueuse/firebase/useFirestore";
import { createChat, createUserChat, getChat } from "@/utils/chat";
import { useChatStore } from "@/store/chat";
import { userCollectionRef } from "@/firebase";

const authStore = useAuthStore();
let users = ref<DocumentData | null>(null);

const searchInput = ref("");
const q = query(userCollectionRef, where("uid", "!=", authStore.uid));
const allUser = useFirestore(q);

const searchUser = computed(() => {
  return allUser?.value?.filter((data: any) => {
    return data.displayName.toLowerCase().includes(searchInput.value);
  });
});

// const getUserChat = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allUser = await getUserChat(authStore.uid);
//       if (!allUser) resolve((users.value = null));

//       resolve((users.value = Object.entries(allUser!)));
//       console.log(users.value);
//     } catch (err) {
//       if (err instanceof Error) {
//         reject(err.message);
//       }
//     }
//   });
// };
// await getUserChat();

const selectedUser = ref<State | null>(null);
const handleSelectUser = async (userData: State) => {
  if (selectedUser.value?.uid && selectedUser.value.uid === userData.uid) {
    return;
  }

  const chatStore = useChatStore();
  selectedUser.value = userData;

  const { uid } = userData;
  const combinedId =
    authStore.uid > uid ? authStore.uid + uid : uid + authStore.uid;

  //Check if exists
  try {
    const user = await getChat(combinedId);
    if (!user) {
      await createChat(combinedId);
      //Create current user & other user chat
      await createUserChat(authStore.uid, combinedId, userData);
      await createUserChat(uid, combinedId, authStore.$state);
    }

    chatStore.startChat(combinedId, await getChat(combinedId));
    console.log("Tes");
  } catch (error) {
    console.log(error);
  }
};
</script>
