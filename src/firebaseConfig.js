import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBuZKPCzJaE7s9IczZ9feBVdQPj4A34pIA",
  authDomain: "myesg-ee4ff.firebaseapp.com",
  projectId: "myesg-ee4ff",
  storageBucket: "myesg-ee4ff.appspot.com",
  messagingSenderId: "1082809271276",
  appId: "1:1082809271276:web:44f7888af879a7793b76c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);