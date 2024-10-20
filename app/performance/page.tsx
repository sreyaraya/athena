'use client'

import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

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

export async function getSessionInfo(email: string, interview: number) {
  try {
    const q = query(
      collection(db, 'questions'),
      where('email', '==', email),
      where('interview', '==', interview),
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
      const determinationData = responses.map(resp => resp.analysis?.determination || 0);
      const awkwardnessData = responses.map(resp => resp.analysis?.awkwardness || 0);
      const excitementData = responses.map(resp => resp.analysis?.excitement || 0);

      setChartData({
        interactions,
        determination: determinationData,
        awkwardness: awkwardnessData,
        excitement: excitementData
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
        <div className="col-span-1 bg-white rounded-md shadow-md p-4 h-64">
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

   
        <div className="col-span-1 bg-white rounded-md shadow-md p-4 h-64 flex justify-center items-center">
            <div>
              Overall FeedbackScore:
              
            </div>
        </div>


        <div className="col-span-2 bg-white rounded-md shadow-md p-4 h-64 flex justify-center items-center">
            <div>
              <div className="flex flex-col items-center justify-center">
              Things that were well done and things that needed improvement

              </div>
              
            </div>
        </div>

        {/* Large Center Chart */}
        <div className="col-span-4 bg-white rounded-md shadow-lg p-6 h-96 mt-4">
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
        <div className="col-span-2 bg-white rounded-md shadow-md p-4 h-64 mt-4">
          Buzzwords matched according to job description
        </div>

        {/* Bottom Right Small Chart */}
        <div className="col-span-2 bg-white rounded-md shadow-md p-4 h-64 mt-4">
          Overall here are some tips for next time
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