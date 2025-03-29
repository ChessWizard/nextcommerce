import NextAuth, { SessionUserDTO } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Database from "@/prisma/adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "sign-in",
    error: "sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(Database),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await Database.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) throw new Error("UserNotFound");

        const isPasswordMatch = compareSync(
          credentials.password as string,
          user.password as string
        );
        if (!isPasswordMatch) throw new Error("InvalidPassword");

        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.surname = user.surname;
        token.role = user.role;
      }

      if (trigger === "update") {
        token.email = session.email;
      }

      return token;
    },
    async session({ session, token }: any) {

        const sessionUser: SessionUserDTO = {
            id: token.id || token.sub,
            name: token.name,
            surname: token.surname,
            email: token.email,
            role: token.role
        }

        session.user = sessionUser
        return session;
    },
  },
  
} satisfies NextAuthConfig;

declare module "next-auth" {
    interface SessionUserDTO {
      id: string;
      name: string;
      surname: string;
      email: string;
      role: string;
    }
  
    interface Session {
      user: SessionUserDTO;
    }
  }

export const { handlers, auth, signIn, signOut } = NextAuth(config);
