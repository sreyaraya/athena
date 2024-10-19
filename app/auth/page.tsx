'use client'

import google from '../../components/google.png'

const projects = [
    { id: 1, title: "Create New"},
    { id: 2, title: "Project 1" },
    { id: 3, title: "Project 2" },
    { id: 4, title: "Project 3" },
    { id: 5, title: "Project 4" },
    { id: 7, title: "Project 6" },
    { id: 6, title: "Project 5" },
    { id: 9, title: "Project 8" },
    { id: 8, title: "Project 7" },
];
  

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
export default function Component() {
  const { data: session, status } = useSession()

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
             {session.user?.name.split(' ')[0]}'s History
             </div>
        </div>
       <div className="grid grid-cols-3 gap-4 mt-12 m-8 text-2xl">
        
      {projects.map((project, index) =>
        index==0 ? (
          <button
            key={project.id}
            className="rounded-sm  border hover:scale-105 duration-200 border-purple-900 bg-white text-purple-900  p-4 h-48 flex justify-center items-center"
          >
            {project.title}
          </button>
        ) : (
          <button
            key={project.id}
            className="rounded-sm border hover:scale-105 duration-200 border-white bg-purple-900 p-4 h-48 flex justify-center items-center text-white"
          >
            {project.title}
          </button>
        )
      )}
    </div>
      <br />
        Signed in as {session.user.id} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div className='text-white'>
        <div className="flex flex-col items-center h-full w-full">
            <div className=" m-24 text-6xl  underline rounded-sm p-4">
            Sign in/up!
            </div>
           
            <button className="hover:scale-110 duration-200 flex items-center h-36 w-96 p-8 text-3xl border-2 border-white" onClick={() => signIn("google")}>
                <text>Sign in with Google</text>
                <Image className='scale-[0.5] ' src={google}></Image>
            </button>
            
        
            
        </div>
      
    </div>
  )
}


