// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVn_kM5s0OBa0LVL_9bYk0CUylJ2Q9NuQ",
  authDomain: "insta-clone-34e3d.firebaseapp.com",
  projectId: "insta-clone-34e3d",
  storageBucket: "insta-clone-34e3d.appspot.com",
  messagingSenderId: "133601017408",
  appId: "1:133601017408:web:49553ea6ed3d5bfd4229a5",
  measurementId: "G-E4CV5XDWE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


export {app, auth, firestore, storage};
