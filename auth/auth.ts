import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Database from "@/prisma/adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { compareSync } from "bcrypt-ts-edge"
import type { NextAuthConfig } from "next-auth"

export const config = {
    pages: {
        signIn: 'sign-in',
        error: 'sign-in'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    adapter: PrismaAdapter(Database),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                if(!credentials) return null

                const user = await Database.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                })

                if(!user) 
                    throw new Error("UserNotFound")

                const isPasswordMatch = compareSync(credentials.password as string, user.password as string)
                if(!isPasswordMatch)
                    throw new Error("InvalidPassword")

                return { 
                         id: user.id,
                         name: user.name,
                         surname: user.surname,
                         email: user.email,
                         role: user.role
                       }
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {

            session.user.id = token.sub

            if(trigger === 'update'){
                session.user.name = user.name
            }

            return session
        }
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)