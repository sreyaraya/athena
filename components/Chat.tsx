"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState } from "react";
import Image from "next/image";
import soundthingy from '../components/nounsound.svg';
import { BarChart } from "@mui/x-charts/BarChart";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
  gaugeClasses,
  Gauge,
} from '@mui/x-charts/Gauge';
import { round } from "remeda";


export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  
    if (valueAngle === null) {
      return null;
    }
  
    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#2e1065" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="#2e1065"
          strokeWidth={3}
        />
      </g>
    );
  }
  

  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  const [currEmotion, setCurrEmotion] = useState([]);
  const [currEmotionVals, setCurrEmotionVals] = useState([]);
  const [currFiller, setCurrFiller] = useState(0);
  const [conf, setConf] = useState(0);



  const fillerwords = new Set();
  const fw = ["um", "uhm", "uh", "uhh", "uhhh", "uhmm", "like", "yknow", "y'know", "basically", "hmm", "hm"]
  fw.forEach(element => {
    fillerwords.add(element)
  });

  

  function gotData(newMessageObject) {
    console.log(newMessageObject)
    if (newMessageObject != null && newMessageObject.message != null) {
      
      if (newMessageObject.type === "user_message") {
        
        const scoresobj = newMessageObject.models.prosody.scores
        console.log(scoresobj)
        console.log(scoresobj.excitement + scoresobj.triumph)
        setConf(() => scoresobj['triumph'] + scoresobj['excitement'] + scoresobj['determination'] - scoresobj['anxiety'] - scoresobj['fear'])
          const topThreeKeys = Object.keys(scoresobj)
    .sort((a, b) => scoresobj[b] - scoresobj[a]) // Sort keys based on their values in descending order
    .slice(0, 3); // Take the top 3 keys

      // Now you can set the current emotion to the top 3 keys
      setCurrEmotion(topThreeKeys);
      

      const topThreeValues = Object.entries(scoresobj) // Convert the object to an array of [key, value] pairs
    .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort by value in descending order
    .slice(0, 3) // Take the top 3 entries
    .map(([, value]) => value); // Extract the values from the top entries



    setCurrEmotionVals(topThreeValues)
  

        newMessageObject.message.content.split(/[\s,]+/).forEach(word => {

          if (fillerwords.has(word.toLowerCase())) {
            setCurrFiller((prev) => prev + 1)
          }
          
        });

      }


    }
     
  }

  
  
  return (
    <div>
<div className="text-6xl flex gap-6 h-20 m-4 justify-center items-center ">
            <div className="text-white underline">Athena</div>
            <div><Image className="scale-[0.7] mt-6 " src={soundthingy} alt={"just get better wifi dawg"} ></Image>
    </div> 
  </div>
  <div className="flex justify-center p-4 px-16">
  
      <div className="bg-white w-80 h-[40rem] px-8 pb-8 pt-4 -z-1 rounded-md sticky top-10 flex flex-col items-center">
      <div className=" text-center text-2xl text-purple-900  border-4 border-purple-900 rounded-sm p-2">
Top emotions that you are conveying
</div>
      <BarChart className="-mt-16"
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: {
            top: 20,
            right: 0,
            left: 0,
            bottom: -40
          },
        },
      }}
  xAxis={[
    { scaleType: 'band', data: ['Emotions'] } // Assuming three bars now
  ]}
  series={[
    {
      label: currEmotion[0],
      data: [currEmotionVals[0]], // Value for the first bar
      color: '#2e1065', // Color for the first bar
    },
    {
      label: currEmotion[1],
      data: [currEmotionVals[1]], // Value for the second bar
      color: '#5b21b6', // Color for the second bar
    },
    {
      label: currEmotion[2],
      data: [currEmotionVals[2]], // Value for the third bar
      color: '#8b5cf6', // Color for the third bar
    }
  ]}
  width={300}
  height={400}
  // Adjust label positioning (check if your library has such options)

/>

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
            
            <Messages ref={ref} givedata={gotData}/>
            <Controls />
            <StartCall />
          </VoiceProvider>
        </div>
        <div className="bg-white w-80 h-[42rem] sticky top-10 p-4 -z-1 rounded-md flex flex-col text-2xl text-center text-purple-900 pb-10 ">
            <div>
              <div className="text-center text-2xl text-purple-900  border-4 border-purple-900 rounded-sm p-2 mt-1">
              Your Confidence Meter
              </div>
              
              <div>
                <br/>
                <div className="flex justify-center">
                <Gauge
  value={Math.max(Math.min(round((conf/0.7) * 100, 0),100),0)}
  startAngle={0}
  endAngle={360}
  innerRadius="80%"
  outerRadius="100%"
  width={200}
  height={200}
  sx={(theme) => ({
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 40,
    },
    [`& .${gaugeClasses.valueArc}`]: {
      fill: '#581c87',
    },
    
  })}
/>
                </div>
                {Math.max(Math.min(round((conf/0.7) * 100, 0),100),0)} / 100
                </div>
            </div>
            <hr className="mt-6"></hr>
            <div className="bg-purple-950 rounded-md flex flex-col mt-8 h-[12rem] w-[10rem] self-center">
              <div className="py-4 text-6xl text-center text-white rounded-md">
                {currFiller}
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
