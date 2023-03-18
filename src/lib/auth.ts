import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

const getDiscordCredentials = () => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("No Client ID for github provider");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No Client Secret for github provider");
  }

  return {
    clientId,
    clientSecret,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: getDiscordCredentials().clientId,
      clientSecret: getDiscordCredentials().clientSecret,
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ token, session }) => {
      console.log("================")
      console.log("Inside session callback.")
      console.log("Token: ", token)
      console.log("Session: ", session)
      console.log("================")
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    redirect: () => "/dashboard",
  },
};
