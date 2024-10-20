"use client";

import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useRef, useState } from "react";

const Messages = forwardRef(function Messages(
  { givedata }, // Destructure props
  ref
) {
  const { messages } = useVoice();
  const [sentimentVectors, setSentimentVectors] = useState([]);
  const processedIndices = useRef(new Set());
  const counterRef = useRef(0);




  useEffect(() => {
    const newVectors = [];

    messages.forEach((msg, index) => {
      if ((msg.type === "user_message" || msg.type === "assistant_message") && !processedIndices.current.has(index)) {
        processedIndices.current.add(index);
        newVectors.push({
          isAthena: msg.type == "assistant_message",
          text: msg.message.content,
          index: counterRef.current,
          values: msg.models.prosody?.scores,
        });
        counterRef.current += 1;
      } else {
        console.log("session completed")
      }
    });

    if (newVectors.length > 0) {
      setSentimentVectors(prev => [...prev, ...newVectors]);
    }

    console.log(sentimentVectors);
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
