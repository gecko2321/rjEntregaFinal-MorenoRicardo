
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG,
  authDomain: "ceramicagloria-react.firebaseapp.com",
  projectId: "ceramicagloria-react",
  storageBucket: "ceramicagloria-react.appspot.com",
  messagingSenderId: "502871082439",
  appId: "1:502871082439:web:bfb29f72381da5a76205e2"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)