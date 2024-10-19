'use client'
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="text-white font-f ">
      <div className="flex flex-col items-center gap-10 text-center">
          <div className="mt-16 text-8xl ">
            Athena
          </div>

          <div className="mt-4 text-4xl ">
          <span className=" pl-2 pr-2 ">Real-time</span>Voice Analysis with Industry-Specific Feedback 
          </div>

          <div>
            <button onClick={() => signIn()} className="p-2 text-white duration-200  rounded-sm hover:scale-110 active:scale-90">
              <Link href={'/auth'}>
              Get Started
              </Link>
              
            </button>
          </div>

          <div className="flex self-start w-full mt-96 bg-white h-64">
            <div className="flex flex-col justify-center w-1/6 h-full text-white bg-clear">
              <p className="m-6 text-5xl ">
                How does it work?
              </p>
            </div>
            <div className="flex flex-col justify-center w-5/6 h-full p-20 text-3xl text-white bg-white">
              Siteify allows users to create beautiful ai-enhanced portfolio websites, automatically integrated with their projects, all with a few simple clicks! 
            </div>

          </div>
      </div>
    </div>
  )
}
