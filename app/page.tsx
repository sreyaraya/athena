'use client'
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import soundthingy from "../components/nounsound.svg"
import waves from "../components/waveswhite.png"
import speak from "../components/speak.svg"


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

          <div className="flex gap-8 justify-center w-full mt-10 bg-darkpurple h-64">
           
            <div className="bg-black flex-col flex">
              <div className="">
              <Image width={"200"} src={speak}>

                </Image>
                </div>
                <div>
                  Tell Athena about your upcoming interview
                </div>
            </div>

            <div className="bg-red flex flex-col">
              <div>
                  Athena will give you questions and listen critically to analyze your answers
                </div>
              </div>

              <div className="bg-red flex flex-col">
              <div>
                  Get a post interview debrief with our original PrepFeedback Score
                </div>
              </div>



          </div>
          

          <div className="flex self-start w-full mt-96 bg-darkpurple h-64">
            <div className="flex flex-col justify-center w-1/6 h-full text-white bg-darkpurple">
              <p className="m-6 text-5xl ">
                How does it work?
              </p>
            </div>
            <div className="flex flex-col justify-center w-5/6 h-full p-20 text-3xl text-white bg-darkpurple">
              Siteify allows users to create beautiful ai-enhanced portfolio websites, automatically integrated with their projects, all with a few simple clicks! 
            </div>

          </div>
      </div>
    </div>
  )
}
