import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { getRequestContext } from '@cloudflare/next-on-pages'

const { env } = getRequestContext()

declare const globalThis: {
    cognitoUserPoolGlobal: CognitoUserPool
} & typeof global

const userPool =
    globalThis.cognitoUserPoolGlobal ??
    new CognitoUserPool({
        // @ts-ignore
        UserPoolId: process.env.COGNITO_USER_POOL_ID || env.COGNITO_USER_POOL_ID!,
        ClientId: process.env.COGNITO_CLIENT_ID || process.env.COGNITO_CLIENT_ID!,
    })

export default userPool

if (process.env.NODE_ENV !== 'production') globalThis.cognitoUserPoolGlobal = userPool
