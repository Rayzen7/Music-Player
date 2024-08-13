// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNKVGzcgSPotc4aDhFwAdLgzWekgi_pJk",
  authDomain: "song-e806c.firebaseapp.com",
  projectId: "song-e806c",
  storageBucket: "song-e806c.appspot.com",
  messagingSenderId: "319451465495",
  appId: "1:319451465495:web:9964bf324f1e2b7ee39952",
  measurementId: "G-0KLD71YYPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };