import { UserRegisteration } from '@entities/auth'
import userPool from '@shared/auth/cognito-userpool'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    try {
        const { email, nickname, password } = UserRegisteration.parse(body)
        const signupData: any = await new Promise((resolve, reject) => {
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

        const Username = signupData?.user.username
        new CognitoUser({
            Pool: userPool,
            Username: '14883dfc-30b1-7062-d5d3-8a1c0d099753'
        }).confirmRegistration
        


        return NextResponse.json(signupData)
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json(null, { status: 500 })
}
