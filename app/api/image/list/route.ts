import { ListObjectsCommand } from '@aws-sdk/client-s3'
import { R2Client } from '@shared/lib/r2client'
import { NextResponse } from 'next/server'

const imgList = async () => {
    const command = new ListObjectsCommand({
        Bucket: 'blog',
    })
    const list = await R2Client.send(command)
    return list
}

export const POST = async () => {
    try {
        const filelist = await imgList()
        const contents = filelist.Contents
        return NextResponse.json(contents?.filter((file) => !file.Key?.includes('HIDE_')))
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
