import { defineStore } from "pinia";

export interface Chat {
  photoURL: string;
  message: string;
  uid: string;
}

interface State {
  chatId: string;
  chat: Chat[];
}

export const useChatStore = defineStore("chat", {
  state: (): State => ({
    chatId: "",
    chat: [],
  }),
  getters: {
    allChat(state) {
      return state.chat;
    },
  },
  actions: {
    startChat(id: string, chat: Chat[]) {
      this.chatId = id;
      this.chat = chat;
    },
  },
});
