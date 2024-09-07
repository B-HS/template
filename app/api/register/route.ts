import { UserRegisteration } from '@entities/auth'
import userPool from '@shared/auth/cognito-userpool'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    try {
        const { email, nickname, password } = UserRegisteration.parse(body)
        await new Promise((resolve, reject) => {
            userPool.signUp(
                randomUUID(),
                password,
                [new CognitoUserAttribute({ Name: 'email', Value: email }), new CognitoUserAttribute({ Name: 'nickname', Value: nickname })],
                [],
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                },
            )
        })
        return NextResponse.json(null, { status: 200 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}
