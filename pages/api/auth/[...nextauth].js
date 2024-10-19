import NextAuth from "next-auth"
import GithubProvider from "../../../lib/customProvider"

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth'
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log(token.id)
          // Persist the OAuth access_token and or the user id to the token right after signin
          if (account) {
            token.accessToken = account.access_token
            token.id = profile.id
          }
          
          return token
        }
      },
      
    secret: process.env.JWT_SECRET
})
