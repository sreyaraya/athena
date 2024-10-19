'use client'
import Image from "next/image";
import githubLogo from "../../components/github-mark-white.png";

import { getProviders, signIn} from "next-auth/react"

export default function Auth() {

    

    return (
        <div className="flex justify-center align-middle font-f ">
            <div onClick={() => signIn('github',{callbackUrl: '/dashboard'})} className="flex items-center justify-around w-56 h-20 text-white duration-200 bg-green-900 rounded-sm hover:cursor-pointer hover:scale-110 active:scale-90 mt-72">
                   <p className="text-lg">
                   Sign in with GitHub
                   </p>
                   <Image src={githubLogo} alt="github logo" width={20} height={20}>

                   </Image>
                </div>
        </div>
      
    )
}