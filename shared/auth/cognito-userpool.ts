import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { getRequestContext } from '@cloudflare/next-on-pages'

declare const globalThis: {
    cognitoUserPoolGlobal: CognitoUserPool
} & typeof global

export const userPool = () =>
    globalThis.cognitoUserPoolGlobal ??
    new CognitoUserPool({
        // @ts-ignore
        UserPoolId: process.env.COGNITO_USER_POOL_ID || getRequestContext().env.COGNITO_USER_POOL_ID!,
        // @ts-ignore
        ClientId: process.env.COGNITO_CLIENT_ID || getRequestContext().env.COGNITO_CLIENT_ID!,
    })


if (process.env.NODE_ENV !== 'production') globalThis.cognitoUserPoolGlobal = userPool()
