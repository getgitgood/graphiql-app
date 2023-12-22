import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { updateUserStatus } from '../features/projectSlice';
import { useAppDispatch } from '../hooks/appHooks';

const firebaseConfig = {
  apiKey: 'AIzaSyBc176Kmg_rgWChwKl2A0qK3EfiWrPtV14',
  authDomain: 'graphiql-app-1b9c0.firebaseapp.com',
  projectId: 'graphiql-app-1b9c0',
  storageBucket: 'graphiql-app-1b9c0.appspot.com',
  messagingSenderId: '783488770718',
  appId: '1:783488770718:web:71ce42e1e875d0e923518f',
  measurementId: 'G-E3JTXEH0RM'
};

initializeApp(firebaseConfig);
const auth = getAuth();

export {
  auth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence
};

onAuthStateChanged(auth, (user) => {
  const dispatch = useAppDispatch();
  if (user) {
    setPersistence(auth, browserLocalPersistence);
  }
  dispatch(updateUserStatus(Boolean(user)));
});
