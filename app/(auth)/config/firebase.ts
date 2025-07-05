// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCqyb3m9eS7Sy2S-lv9r6LsPhLzaxXPl_c",
  authDomain: "expanse-tracker-7783d.firebaseapp.com",
  projectId: "expanse-tracker-7783d",
  storageBucket: "expanse-tracker-7783d.firebasestorage.app",
  messagingSenderId: "347914359109",
  appId: "1:347914359109:web:9c31ce91226ebfb95e6e2c",
  measurementId: "G-J43CKRLQLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage),
})


// db 

export const firestore = getFirestore(app);