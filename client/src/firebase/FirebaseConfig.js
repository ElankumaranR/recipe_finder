import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQPGTYc-0oFLl4sRte7crgw6GSED_yX0w",
  authDomain: "recipe-finder-584c7.firebaseapp.com",
  projectId: "recipe-finder-584c7",
  storageBucket: "recipe-finder-584c7.firebasestorage.app",
  messagingSenderId: "384392167262",
  appId: "1:384392167262:web:6b4313583293d4959699cf",
  measurementId: "G-G961CMC0WK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };