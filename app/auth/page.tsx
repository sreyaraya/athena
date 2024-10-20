'use client'

import { useRouter } from 'next/navigation'
import google from '../../components/google.png'

const projects = [
    { id: 1, title: "Create New"},
    { id: 2, title: "Apple SWE Intern Interview" },
    { id: 3, title: "Bloomberg Interview" },
    { id: 4, title: "Berkeley Skydeck Startup Web Dev Role" },
    { id: 5, title: "Blockchain dev interview" },
    { id: 7, title: "Scholarship interview" },
    { id: 6, title: "Google Interview for System Architect Role" },
    { id: 9, title: "Microsoft Silicon Role" },
    { id: 8, title: "Web Dev role at Zynga" },
];
  

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";



export default function Component() {
  const { data: session, status } = useSession()
  const router = useRouter()
  if(status=="loading") return (
    <div className=''>
        <div className='text-white text-8xl  flex justify-center items-center'>
             <div className='mt-64 underline p-10'>
            LOADING...
             </div>
    </div>
    </div>
  )
  else if (session) {
    return (
      <div className=''>
        <div className='text-white text-5xl flex justify-center items-center'>
             <div className='mt-12 underline '>
             {session.user?.name.split(' ')[0]}'s Interviews
             </div>
        </div>
       <div className="grid grid-cols-3 gap-4 mt-12 m-8 text-2xl">
        
      {projects.map((project, index) =>
        index!=0 ? (
          <button
          onClick={() => router.push('/performance')}
            key={project.id}
            className="rounded-md border-4 hover:scale-105 duration-200 border-purple-400 bg-gradient-to-tr from-purple-50 to-purple-200 text-purple-900  p-4 h-48 flex justify-center items-center"
          >
            {project.title}
          </button>
        ) : (
          <button
            onClick={() => router.push('/interview')}
            key={project.id}
            className=" border-4 rounded-md hover:scale-105 duration-200 border-white bg-purple-900 p-4 h-48 flex justify-center items-center text-white"
          >
            {project.title}
          </button>
        )
      )}
    </div>

      </div>
    )
  }

  return (
    <div className='text-white'>
        <div className="flex flex-col items-center h-full w-full">
            <div className=" m-24 text-6xl  underline rounded-sm p-4">
            Sign in/up!
            </div>
           
            <button  className="hover:scale-110 duration-200 flex items-center h-36 w-96 p-8 text-3xl border-4 border-white" onClick={() => signIn("google")}>
                <text>Sign in with Google</text>
                <Image className='scale-[0.5] ' src={google}></Image>
            </button>
            
        
            
        </div>
      
    </div>
  )
}


