// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern---estate-d40cf.firebaseapp.com",
  projectId: "mern---estate-d40cf",
  storageBucket: "mern---estate-d40cf.appspot.com",
  messagingSenderId: "919117184688",
  appId: "1:919117184688:web:7ddb2d6cf7467779ebc575"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);