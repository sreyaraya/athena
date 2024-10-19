import NextAuth from "next-auth"
import GithubProvider from "../../../lib/customProvider"
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,

          
        }),
      
      
    ],
    pages: {
      signIn: "/auth"
    },
    session: {
      strategy: "jwt", // Using JWT for session management
    },
    callbacks: {
    async session({ session, token }) {
      // Optionally, you can attach additional user information to the session object
      session.user.id = token.id; // or any other data you want to include
      return session;
    },
    async jwt({ token, user }) {
      // If a user is logged in, add their info to the token
      if (user) {
        token.id = user.id; // or any other data you want to include
      }
      
      return token;
    }},
      
    secret: process.env.JWT_SECRET
})
