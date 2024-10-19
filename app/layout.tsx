'use client'

import NavBar from '@/components/Navbar'
import './globals.css'
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  //@ts-expect-error
  children
}) {




  return (

    <html lang="en" className='bg-purple-900'>


      
      <head>
      <link rel="icon" href="/images/favicon.svg" type="image/svg+xml"/>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet"/>
        </head>
       
        
      <body>

      <SessionProvider >
      <NavBar/>
      {children}
      </SessionProvider>
      
      
      
      </body>
    </html>
  )
}
