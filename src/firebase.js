import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEfYO0X1z0HZvKlaaFLz6kHYhmEaNFYKo",
  authDomain: "renewly-1.firebaseapp.com",
  projectId: "renewly-1",
  storageBucket: "renewly-1.firebasestorage.app",
  messagingSenderId: "1073634610332",
  appId: "1:1073634610332:web:cf373e6a3ce39f74e27159",
  measurementId: "G-CXCJC0EQ2V"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, googleProvider, facebookProvider, appleProvider };