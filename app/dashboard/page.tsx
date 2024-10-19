//@ts-nocheck
'use client'
import Image from "next/image";
import githubLogo from "../../components/github-mark-white.png";
import { useEffect, useState } from "react";
import { getProviders, signIn} from "next-auth/react"
import supabase from "../../lib/supabase"
import {BiTrash} from 'react-icons/bi'
import Link from "next/link";


export default function Dashboard() {
    const [fetchError, setFetchError] = useState(null)
    const [projects, setProjects] = useState([])

    async function deleteFunc(id) {

        const newProjects = projects.filter((project) => {
            return project.id !== id
        })
        
        setProjects(newProjects)

        const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', id)
    }


    useEffect(() => {
        
        fetch('/api/get-token')
        .then((response) => response.json())
        .then((data) => fetchProjects(data))

        const fetchProjects = async (token) => {
            
            const id= token.sub
            const { data, error } = await supabase
            .from("sites")
            .select()
            
            //console.log(data)
            const filtered = data?.filter((project) => {
                return project.github_id === id
            })


            console.log(filtered)
            
            if (error) {
                setFetchError("Could not fetch the projects")
                setProjects(null)
                console.log(error)
            }
            
            if (filtered) {
                setProjects(filtered)
                setFetchError(null)
            }
        }
     
    }, [])

    return (
        <div className="flex flex-col items-center justify-start  font-f ">
            <div className="flex justify-between w-3/5 mt-40">
                    <div className="flex flex-col gap-4 ">
                        <div className="text-5xl text-purple-900 underline ">
                            Projects
                        </div>
                        <div className="text-xl italic ">
                            Create and manage your projects
                        </div>
                    </div>
                    <div>
                        <Link href='/create'>
                        <button className="text-center self-center  text-white text-lg hover:scale-105 active:scale-90 duration-200 bg-green-900 rounded-sm p-3">
                          + New Project
                        </button>
                        </Link>
                        
                    </div>
            </div>
            <div className="py-6 flex w-3/5 justify-start ">
                <div className="flex flex-col w-full">

                
                {projects.length == 0 && <div className="italic">
                    
                    No projects yet. Create one!
                    
                    </div>}
                

                {projects.map( (proj, index) => {
                    return (
                        <div key={index} className="flex p-2 mt-6 rounded-sm border-2 border-green-900 bg-gray-200 justify-between">
                            <Link href={proj.link}>
                                <div className="hover:underline">
                                    {proj.title}
                                </div>
                            </Link>
                                
                            
                            
                            
                            <div className="w-6 h-6 border-red-900 border-2 rounded-sm flex justify-center items-center hover:bg-red-400 hover:duration-200 duration-200">
                            <button  onClick={() => deleteFunc(proj.id)}>
                                <BiTrash/>
                            </button>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
      
    )
}