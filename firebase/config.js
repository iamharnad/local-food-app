// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVBxo9YOHJDbawnk4enS2IjDNokwbC1SQ',
  authDomain: 'localfoodapp-bf385.firebaseapp.com',
  projectId: 'localfoodapp-bf385',
  storageBucket: 'localfoodapp-bf385.firebasestorage.app',
  messagingSenderId: '528030225025',
  appId: '1:528030225025:web:963e97625cef04d9c6b380',
  measurementId: 'G-ELHW3XH6WH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
