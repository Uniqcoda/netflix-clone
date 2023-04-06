// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDooKZUn3zejkxRsaFFeZ9sgcuMTQ9r2OY',
  authDomain: 'netflix-clone-f3e45.firebaseapp.com',
  projectId: 'netflix-clone-f3e45',
  storageBucket: 'netflix-clone-f3e45.appspot.com',
  messagingSenderId: '620371663414',
  appId: '1:620371663414:web:b7f52ed7ba60cc02c61697',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export default db;
