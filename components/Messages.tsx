"use client";

import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"




import { initializeApp } from 'firebase/app';
import { collection, addDoc, query, where, doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";  // Firestore functions
import { randomBigInt } from "remeda";


const firebaseConfig = {
 apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
 authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
 projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
 storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
 appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
let data;
const interviewNum = Math.random()

const addDocToFirestore = async (vec, count, interviewNum) => {
  try {
    const data = {
      name: vec.name,
      email: vec.email,
      isAthena: vec.isAthena,
      text: vec.text,
      interview: interviewNum,
      interaction: vec.index,
      analysis: vec.values,
    };
 
 
    const randomId = randomBigInt(BigInt(100), BigInt(400)); // Generate a random ID
    const docRef = await addDoc(collection(db, "questions"), data);
    const doc2 = collection(db, "users")
    //const q = query(doc2, where('email', '==', data.email))
    //console.log("Document written with ID: ", randomId);
    //const userDocRef = doc(db, "users", vec.email);
    //await updateDoc(userDocRef, {interviews: increment(1)});
  } catch (error) {
    console.error("Error adding document: ", error);
  }
 };
 


const Messages = forwardRef(function Messages(
  { givedata }, // Destructure props
  ref
) {

  const { data: session, status } = useSession()


  const { messages } = useVoice();
  const [sentimentVectors, setSentimentVectors] = useState([]);
  const processedIndices = useRef(new Set());
  const counterRef = useRef(0);




  useEffect(() => {
    const newVectors = [];
    

    messages.forEach((msg, index) => {
      if ((msg.type === "user_message" || msg.type === "assistant_message") && !processedIndices.current.has(index)) {
        processedIndices.current.add(index);
        let k = {
          isAthena: msg.type == "assistant_message",
          email: session?.user.email,
          name: session?.user?.name,
          text: msg.message.content,
          index: counterRef.current,
          values: msg.models.prosody?.scores,
        };
        console.log(k)
        addDocToFirestore(k, counterRef.current, interviewNum)
        newVectors.push(k);
        counterRef.current += 1;
      } else {
        //console.log("session completed")
      }
    });

    if (newVectors.length > 0) {
      setSentimentVectors(prev => [...prev, ...newVectors]);
    }

    //console.log(sentimentVectors);
  }, [messages]);
  
  useEffect(() => {
    givedata(messages.at(-1))

  }, [messages]);
  

  return (
    <motion.div

  className="grow rounded-md overflow-auto p-4 border-white border-2 bg-white min-w-80"
>
  <div className=" p-2 mb-8  text-center text-2xl text-purple-900  border-4 border-purple-900 rounded-sm">
    Live Chat 
  </div>
  <motion.div className="max-w-2xl justify-items-center mx-auto w-full flex flex-col gap-4 pb-24">
    <AnimatePresence>
      
      

      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
        
         
          
          return (
            <motion.div
              
              key={msg.type + index}
              className={cn(
                "w-[80%]",
                "bg-card",
                "self-center",
                "border-none",
                "drop-shadow-sm",
                "border-4",
                "rounded-md",
                "border-puruple-400",
                "text-darkpurple",
                msg.type === "user_message" ? "ml-12 bg-purple-50" : "-ml-12 bg-purple-100"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
            >
              <div className={cn("text-xs capitalize font-bold leading-none opacity-50 pt-4 px-3 text-purple-950")}>
                {msg.type === "user_message" ? "You" : "Athena"}
              </div>
              
              <div className="pb-3 px-3">{msg.message.content}</div>
             
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </motion.div>
</motion.div>
  );
});

export default Messages;
