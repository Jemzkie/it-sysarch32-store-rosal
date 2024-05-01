import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABAYK9_gf4__4qII_ZWUIdFw9Rv1kGEy4",
  authDomain: "jemuel-shop.firebaseapp.com",
  projectId: "jemuel-shop",
  storageBucket: "jemuel-shop.appspot.com",
  messagingSenderId: "689822515381",
  appId: "1:689822515381:web:44cd9acd35317b844c3efc",
  measurementId: "G-CB766Y15EM",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
