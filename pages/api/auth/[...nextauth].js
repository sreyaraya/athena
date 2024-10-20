import NextAuth from "next-auth"
import GithubProvider from "../../../lib/customProvider"
import GoogleProvider from "next-auth/providers/google";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";  // Firestore functions

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Correctly initialize Firebase Auth
const db = getFirestore(app);  // Initialize Firestore

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,

          
        }),
      
      
    ],
    pages: {
      signIn: "/auth"
    },
    session: {
      strategy: "jwt", // Using JWT for session management
    },
    callbacks: {
    async session({ session, token }) {
      // Optionally, you can attach additional user information to the session object
      session.user.id = token.id; // or any other data you want to include
      session.user.name = token.name; // or any other data you want to include
      session.user.email = token.email; // or any other data you want to include
      
      console.log(token.email) //debug
      return session;
    },

    async jwt({ token, user }) {
      // If a user is logged in, add their info to the token
      if (user) {
        token.id = user.id; // or any other data you want to include
        token.email = user.email;
        token.name = user.name;
        
        const existingUser = auth.currentUser;

        if (!existingUser) {
          try{
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.id);

            // Add additional user info to Firestore
            const userRef = doc(db, "users", userCredential.user.email);
            await setDoc(userRef, {
                name: user.name,
                resume: "",
            });
          } catch (err) {
            console.error('Error creating/updating user in Firebase:', err);
          }
        }
        
      }
      
      return token;
    }},
      
    secret: process.env.JWT_SECRET
})
