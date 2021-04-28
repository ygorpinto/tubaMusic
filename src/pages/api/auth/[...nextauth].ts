import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dotenv from 'dotenv'

dotenv.config();

export default NextAuth({
  providers: [
    // OAuth authentication providers
    Providers.Spotify({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  ]
})

