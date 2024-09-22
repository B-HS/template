import { getRequestContext } from '@cloudflare/next-on-pages'
import NextAuth from 'next-auth'
import { CognitoAuthentication } from './cognito'

export const auth = () =>
    NextAuth({
        // @ts-ignore
        secret: process.env.NEXTAUTH_SECRET || getRequestContext().env.NEXTAUTH_SECRET || 'nextauthsecretforstatic',
        providers: [CognitoAuthentication],
        callbacks: {
            async jwt({ token, user }) {
                return { ...token, ...user }
            },
            async session({ session, token }) {
                // @ts-ignore
                session.user = token
                return session
            },
        },
    })
