'use client'
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import soundthingy from "../components/nounsound.svg"
import waves from "../components/waveswhite.png"
import speak from "../components/speak.svg"
import arrow from "../components/arrow.svg"
import bubble from "../components/bubble.svg"
import analytics from "../components/analytics.svg"


export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="text-white font-f ">
      <div className="flex flex-col items-center gap-10 text-center">
          <div className="mt-12 text-8xl flex gap-6">
            <div>Athena</div>
            <div><Image src={soundthingy} alt={"just get better wifi dawg"} >

</Image></div>
          </div>
          
          <div className="scale-[1.3] opacity-80 -mt-14">
      <Image
        src={waves}
        alt="Waves"
        
      />
    </div>

          <div className="-mt-2 text-4xl">
            <div className="flex gap-4 flex-col min-w-max">

              <div className=" min-h-[50px] flex justify-start">
                    <span className=" animate-first text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-100 text-5xl">Real-Time</span>
                    <span className="animate-second text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-100 text-5xl"> Career-Tailored</span>
                    <span className="animate-third text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-100 text-5xl">Uniquely-Detailed</span>

              </div>

              <div className="self-end -mt-4">
                AI Interview Assistant with Computed Prep Feedback
                </div>


            </div>
         
          

          <div className="mt-12 flex justify-start gap-10 text-lg ">
            <button onClick={() => signIn()} className="p-2 hover:bg-purple-400 text-white  rounded-sm duration-200 border border-white hover:scale-110 active:scale-90">
              <Link href={'/auth'}>
              Sign Up
              </Link>
              
            </button>

            <button onClick={() => signIn()} className="p-2 hover:bg-purple-400 text-white  rounded-sm duration-200 border border-white  hover:scale-110 active:scale-90">
              <Link href={'/auth'}>
              Log In
              </Link>
              
            </button>
          </div>
          
          </div>

          <div className="mb-52 text-2xl justify-items-stretch  flex gap-8 justify-center w-full pl-20 pr-20 mt-10  h-64">
          
            <div className="flex-1 flex-col flex items-center">
              <div className="">
              <Image width={"200"} src={speak} style={{ transform: 'scaleX(-1)' }}>

                </Image>
                </div>
                <div>
                  Tell Athena about your upcoming interview
                </div>
            </div>

            <Image className=" flex-1 -ml-8 -mr-8" width={"200"} src={arrow} style={{ transform: 'scale(0.5)' }}>

            </Image>

            <div className="flex-1 flex-col flex items-center">
              <div className="">
              <Image width={"200"} src={bubble} style={{ transform: 'scaleX(-1) scale(0.7)' }}>

                </Image>
                </div>
                <div>
                Athena will give you questions and listen critically to analyze your answers

                </div>
            </div>

            <Image className=" flex-1 -ml-8 -mr-8" width={"200"} src={arrow} style={{ transform: 'scale(0.5)' }}>

            </Image>
            <div className="flex-1 flex-col flex items-center">
              <div className="">
              <Image width={"200"} src={analytics} style={{ transform: 'scaleX(-1) scale(0.75)' }}>

                </Image>
                </div>
                <div>
                Get post-interview analysis with our unique FeedbackScore dashboard

                </div>
            </div>




          </div>
          

          
      </div>
    </div>
  )
}
