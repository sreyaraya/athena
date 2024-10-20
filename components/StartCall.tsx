import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";
import soundthingy from "../components/nounsound.svg";
import { useSession } from "next-auth/react";


export default function StartCall() {
  const { status, connect } = useVoice();
  const { data: session } = useSession()
 
  return (
    <div>
      
      <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-purple-900 z-10"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <div className="text-5xl  flex gap-6 h-20 m-4 justify-center items-center ">
            <div className="text-white  p-12">Hi {session?.user.name?.split(" ")[0]}, Athena will now ask you 4 interview prep questions. <div className="mt-6"/> Click the button below when you are ready.</div>
            
    </div>
              <div className="flex justify-center">
              <Button
                className={"mt-20 z-50 flex items-center gap-1.5 border-2 rounded-sm hover:bg-purple-400 duration-200"}
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"white"}
                  />
                </span>
                <span className="text-white ">Start Call</span>
              </Button>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </div>
    
  );
}
