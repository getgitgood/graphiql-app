// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBc176Kmg_rgWChwKl2A0qK3EfiWrPtV14',
  authDomain: 'graphiql-app-1b9c0.firebaseapp.com',
  projectId: 'graphiql-app-1b9c0',
  storageBucket: 'graphiql-app-1b9c0.appspot.com',
  messagingSenderId: '783488770718',
  appId: '1:783488770718:web:71ce42e1e875d0e923518f',
  measurementId: 'G-E3JTXEH0RM'
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// }
export {
  auth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
};
