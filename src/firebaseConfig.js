import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCaRXH2umVvgoKtGchW65SFW9Qi5xnYka0",
  authDomain: "task6-40582.firebaseapp.com",
  projectId: "task6-40582",
  storageBucket: "task6-40582.appspot.com",
  messagingSenderId: "822280887207",
  appId: "1:822280887207:web:c6398ff05dba9cc337b482",
  measurementId: "G-QWN0N9L21C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



