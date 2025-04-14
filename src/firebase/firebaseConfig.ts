import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";            
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvOTuhfSL7JhzRRlhmzxaWM_Ot8win_2s",
    authDomain: "elevenflow-ca262.firebaseapp.com",
    projectId: "elevenflow-ca262",
    storageBucket: "elevenflow-ca262.firebasestorage.app",
    messagingSenderId: "935885536750",
    appId: "1:935885536750:web:fc3d0d473c85fa7f3162ff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
