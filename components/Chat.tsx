"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState } from "react";
import Image from "next/image";
import soundthingy from '../components/nounsound.svg';

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  const [currEmotion, setCurrEmotion] = useState("None");

  function setData(type, data) {
    
  }

  
  
  return (
    <div>
<div className="text-6xl flex gap-6 h-20 m-4 justify-center items-center ">
            <div className="text-white underline">Athena</div>
            <div><Image className="scale-[0.7] mt-6 " src={soundthingy} alt={"just get better wifi dawg"} ></Image>
    </div> 
  </div>
  <div className="flex justify-center p-4 px-16">
  
      <div className="bg-white w-80 h-96 -z-1 rounded-lg sticky top-10">
        
      </div>
      <div
          className={
            "relative grow flex flex-col items-center "
          }
        >
          
          <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
            onMessage={() => {
              if (timeout.current) {
                window.clearTimeout(timeout.current);
              }

              timeout.current = window.setTimeout(() => {
                if (ref.current) {
                  const scrollHeight = ref.current.scrollHeight;

                  ref.current.scrollTo({
                    top: scrollHeight,
                    behavior: "smooth",
                  });
                }
              }, 200);
            }}
          >
            
            <Messages ref={ref} givedata={setCurrEmotion}/>
            <Controls />
            <StartCall />
          </VoiceProvider>
        </div>
        <div className="bg-white w-80 h-[30rem] sticky top-10 p-4 -z-1 rounded-lg flex flex-col text-2xl text-center text-purple-900 pb-10">
            <div>
              You are currently conveying:
              <div>
                <br/>
                <div className="border-2">
                {currEmotion}
                </div>
             
                </div>
            </div>
            <hr className="mt-6"></hr>
            <div className="bg-purple-950 rounded-lg flex flex-col mt-8 h-[12rem] w-[10rem] self-center">
              <div className="py-4 text-6xl text-center text-white rounded-lg">
                6
              </div>
              <div className="self-center  h-16 w-16 text-center text-gray-50 text-xl">
                # of filler words
              </div>

            </div>
      </div>
    </div>
        
    </div>
    
  );
}
