import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-295ac.firebaseapp.com",
  projectId: "loginonecart-295ac",
  storageBucket: "loginonecart-295ac.firebasestorage.app",
  messagingSenderId: "3650319806",
  appId: "1:3650319806:web:1d9b573f9000287ac7b5ef"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider= new GoogleAuthProvider()

export{auth,provider}