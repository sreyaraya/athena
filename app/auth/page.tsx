'use client'

import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button className="bg-black " onClick={() => signIn("google")}>Sigasdfklihasdofghasdkjfhadsj aafsdklasdjnfaskldjfnaskldjfbnasdkjfnn in</button>
    </>
  )
}


