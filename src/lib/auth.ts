import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "@/lib/db";

const geGithubCredentials = () => {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('No Client ID for github provider')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('No Client Secret for github provider')
  }

  return {
    clientId,
    clientSecret
  }
}

export const authOptions: NextAuthOptions = {
  providers: [GithubProvider({
    clientId: geGithubCredentials().clientId,
    clientSecret: geGithubCredentials().clientSecret
  })],
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session: ({token, session}) => {
      if (token) {
        session.user.id = token.id
        session.user.name = token.id
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    jwt: async ({token, user}) => {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      }
    },
    redirect: () => '/dashboard'
  }
}