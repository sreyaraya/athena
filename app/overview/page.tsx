'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Component() {
    const { data: session, status } = useSession();
  
    if (status === "loading") {
      return <div>Loading...</div>; // Handle loading state
    }
  
    if (session) {
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
  
    return (
      <>
        Not signed in <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <button className="bg-black text-white py-2 px-4" onClick={() => signIn()}>Sign in</button>
      </>
    );
  }