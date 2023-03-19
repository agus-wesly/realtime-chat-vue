import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, getDocRef } from "@/firebase";
import { getAllUsers } from "@/firebase";
import { setDoc } from "firebase/firestore";

export const getAuthInfo = (): Promise<User | null> =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      reject
    )
  );

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, provider);
    const { email, uid, photoURL, displayName } = user.user;

    //Find User first
    const allUser = await getAllUsers();
    const userExist = allUser.some((user) => user.uid === uid);
    if (!userExist) {
      //Create new user in DB
      await setDoc(getDocRef(uid, "users"), {
        uid,
        email,
        photoURL,
        displayName,
      });
    }
    return {
      email,
      uid,
      photoURL,
      displayName,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;
  }
};
