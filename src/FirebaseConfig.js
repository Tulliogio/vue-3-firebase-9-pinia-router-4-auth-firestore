import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
     apiKey: "AIzaSyCHiOVwDtcYWwkyZxNg7lE8Je3MbuvRmus",
     authDomain: "vue-3-2022-3728f.firebaseapp.com",
     projectId: "vue-3-2022-3728f",
     storageBucket: "vue-3-2022-3728f.appspot.com",
     messagingSenderId: "255132372499",
     appId: "1:255132372499:web:425378d137482737a839e6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();



export { auth, db, storage };
