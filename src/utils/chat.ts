import { getDocRef } from "@/firebase";
import {
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import type { State } from "@/store/auth";
import type { Chat } from "@/store/chat";

type NewChat = Omit<Chat, "message"> & {
  message: string;
};

export const createChat = async (id: string) => {
  await setDoc(getDocRef(id, "chats"), {
    chat: [],
  });
};

export const getChat = async (id: string) => {
  const docSnap = await getDoc(getDocRef(id, "chats"));
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data().chat;
};

export const getUserChat = async (id: string) => {
  const docSnap = await getDoc(getDocRef(id, "user-chats"));
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};

export const createUserChat = async (
  id: string,
  combinedId: string,
  userData: State
) => {
  await setDoc(getDocRef(id, "user-chats"), {
    [combinedId]: {
      userInfo: {
        photoURL: userData.photoURL,
        displayName: userData.displayName,
      },
      timeStamp: serverTimestamp(),
    },
  });
};

export const sendMessage = async (chatId: string, newChat: NewChat) => {
  await updateDoc(getDocRef(chatId, "chats"), {
    chat: arrayUnion({
      ...newChat,
    }),
  });
};
