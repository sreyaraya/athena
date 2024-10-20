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
  
  return (
    <motion.div

  className="grow rounded-lg overflow-auto p-4 border-white border-2 bg-white min-w-80"
>
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
                "border border-border rounded",
                msg.type === "user_message" ? "ml-auto" : ""
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
            >
              <div className={cn("text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3")}>
                {msg.message.role}
              </div>
              <button className="w-16 h-16" onClick={() => givedata("asdfasdffasd")}>

      </button>
              <div className="pb-3 px-3">{msg.message.content}</div>
              <Expressions values={{ ...msg.models.prosody?.scores }} />
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
