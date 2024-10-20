import {onCall} from "firebase-functions/v2/https";
import {getFirestore, collection} from "firebase/firestore";
import {query, where, getDocs } from "firebase/firestore";
import {initializeApp} from "firebase-admin/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);// Initialize Firestore

const helper = ((email, interaction, interview) => {
  return (db.collection("questions").whereEqualTo("email", email).whereEqualTo("interaction", interaction).whereEqualTo("interview", interview));

});


export const getQuestion = onCall((request) => {
  // Create a post
 
  console.log("Creating a new post...")
  // ...
})