'use client'

import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from "@mui/x-charts";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const pieK = 6;

export async function getSessionInfo(email: string, interview:number) {
  try {
    const q = query(
      collection(db, 'questions'),
      where('email', '==', "saarnav@berkeley.edu"),
      where('interview', '==', 1),
      orderBy('interaction', 'asc')
    );

    const querySnapshot = await getDocs(q);

    const responses = querySnapshot.docs.map(doc => ({
      interaction: doc.data().interaction,
      text: doc.data().text,
      analysis: doc.data().analysis,
    }));
    
    return responses;
  } catch (error) {
    console.error("Error fetching responses:", error);
    return [];
  }
}

// Test function to fetch data for a specific user and interview
export default function ChartComponent(email: string, interview: number) {
  const [chartData, setChartData] = useState({
    interactions: [],
    determination: [],
    awkwardness: [],
    excitement: []
  });

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      

      const responses = await getSessionInfo(email, interview);
      
 

      const interactions = responses.map(resp => resp.interaction);
      const determinationData = responses.map(resp => resp.analysis?.determination || 1);
      const awkwardnessData = responses.map(resp => resp.analysis?.awkwardness || 3);
      const excitementData = responses.map(resp => resp.analysis?.excitement || 2);

      setChartData({
        interactions: [1, 3, 5, 7, 9, 11],
        determination: [0, .006, 1.2, .32, .12],
        awkwardness: [1.96,0.35,0.1, .20, .19],
        excitement: [0.55,0.66,0.2, .58, 1.82]
      });

      let sentimentSums = {};
      
      responses.forEach(resp => {
        const analysis = resp.analysis || {};
        Object.keys(analysis).forEach(sentiment => {
          sentimentSums[sentiment] = (sentimentSums[sentiment] || 0) + analysis[sentiment];
        });
      });

      const sortedSentiments = Object.entries(sentimentSums)
        .sort(([, a], [, b]) => b - a)
        .slice(0, pieK) // top k
        .map(([sentiment, value], id) => ({ id, value, label: sentiment }));

      setPieData(sortedSentiments);
    };

    fetchResponses();
  }, []);

  return (
    <div className="flex bg-red-700 ">
       <div className="min-h-screen bg-purple-200 p-6">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-left text-gray-800 my-6">
          Apple SWE Intern Interview
        </h1>
      </div>
      

      <div className="grid grid-cols-4 gap-6">
        {/* Top Left Small Chart */}
        <div className="col-span-2 bg-white rounded-md shadow-md p-4 h-72">
        <div className="text-2xl text-center mb-4">
          Most Used Emotions:
      </div>
        <PieChart
        series={[
          {
            data: pieData
          }
        ]}
        width={400}
        height={200}
      />
      
        </div>

   
       


        <div className="col-span-1 bg-white rounded-md shadow-md p-4 h-72 flex justify-center items-center">
            <div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl mb-4">Overall Feedback:</div>
              You expressed your interest and enthusiasm well during the interview, and your passion was evident. The way you discussed your interests was engaging, but providing more specific examples would strengthen your responses. Going forward, incorporating concrete examples will enhance the impact of your answers.
              </div>
              
            </div>
        </div>

        <div className="col-span-1 bg-white rounded-md shadow-lg p-6 h-72 flex flex-col justify-center align-middle">
        
        <div className="text-2xl text-center">
              Average Confidence Score:
            </div>
        <Gauge
              className="ml-12"
              value={67}
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

        {/* Large Center Chart */}
        <div className="col-span-4 bg-white rounded-md shadow-lg p-6 h-96 mt-4">
        <div className="text-2xl text-center mb-4">
          Key Sentiment Dynamics:
      </div>
        <LineChart
      xAxis={[{ data: chartData.interactions }]}
      series={[
        {
          data: chartData.determination,
          label: 'Determination',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(3)),
        },
        {
          data: chartData.awkwardness,
          label: 'Awkwardness',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(2)),
        },
        {
          data: chartData.excitement,
          label: 'Excitement',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(2)),
        },
      ]}
      height={150}
      margin={{ top: 25, bottom: 25 }}
    />
        </div>

        {/* Bottom Left Small Chart */}
        <div className="col-span-1 bg-white rounded-md shadow-lg p-6 h-96 mt-4 flex flex-col justify-center align-middle">
        <Gauge
              value={67}
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
            <div className="text-2xl">
              Confidence Score
            </div>
        </div>
        

        {/* Bottom Right Small Chart */}
        <div className="align-middle text-center text-3xl col-span-2 bg-white rounded-md shadow-md p-4 h-64 mt-4">
          Key points for next time not loaded...
        </div>
      </div>
    </div>
     

      
    </div>
  );
}




{/* <PieChart
        series={[
          {
            data: pieData
          }
        ]}
        width={400}
        height={200}
      /> */}



    //   <LineChart
    //   xAxis={[{ data: chartData.interactions }]}
    //   series={[
    //     {
    //       data: chartData.determination,
    //       label: 'Determination',
    //       valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(3)),
    //     },
    //     {
    //       data: chartData.awkwardness,
    //       label: 'Awkwardness',
    //       valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(2)),
    //     },
    //     {
    //       data: chartData.excitement,
    //       label: 'Excitement',
    //       valueFormatter: (value) => (value == null ? 'NaN' : value.toFixed(2)),
    //     },
    //   ]}
    //   height={150}
    //   margin={{ top: 25, bottom: 25 }}
    // />