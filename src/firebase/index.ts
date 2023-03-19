// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3JPbuLeh3DevbMoPL0w1RmGACwvU4p7Q",
  authDomain: "fir-security-32828.firebaseapp.com",
  projectId: "fir-security-32828",
  storageBucket: "fir-security-32828.appspot.com",
  messagingSenderId: "909308432643",
  appId: "1:909308432643:web:dc64516a7720b2a77a9936",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const chatCollectionRef = collection(db, "chats");
export const userCollectionRef = collection(db, "users");
export const userChatCollectionRef = collection(db, "user-chats");

export const getDocRef = (id: string, collection: string) => {
  return doc(db, collection, id);
};

export const getAllUsers = async () => {
  const users: any[] = [];
  const userDocSnap = await getDocs(userCollectionRef);
  userDocSnap.forEach((doc) => {
    users.push({
      uid: doc.id,
      ...doc.data(),
    });
  });
  return users;
};

export const getUser = async (id: string) => {
  const docSnap = await getDoc(getDocRef(id, "users"));
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};
