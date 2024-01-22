// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_mol3i7y-50LrwRFokawmFi5cod3Aplg",
  authDomain: "mern-esates.firebaseapp.com",
  projectId: "mern-esates",
  storageBucket: "mern-esates.appspot.com",
  messagingSenderId: "822969640535",
  appId: "1:822969640535:web:4e842f629677ee6f5e2512",
  measurementId: "G-J82KDWNV8B"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
// export const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage ,app };