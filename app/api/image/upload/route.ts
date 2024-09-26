import { PutObjectCommand } from '@aws-sdk/client-s3'
import { R2Client } from '@shared/lib/r2client'
import { NextRequest, NextResponse } from 'next/server'

const uploadImg = async (file: Buffer, fileName: string) => {
    const fileBuffer: Buffer = file
    const command = new PutObjectCommand({
        Bucket: 'blog',
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: 'image/jpg',
    })
    await R2Client.send(command)
    return fileName
}

export const POST = async (request: NextRequest) => {
    try {
        const form = await request.formData()
        const file = form.get('file') as File
        if (!file) return NextResponse.json({ error: 'File is required.' })
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadImg(buffer, file.name)

        return NextResponse.json(fileName)
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
