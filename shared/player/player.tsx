'use client'

import dynamic from 'next/dynamic'
import { Fragment, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { useVideoControl, useVideoFullScreenHandler } from './hooks'
import { Play } from './layout'
import { defaultExtraOptions, defaultPlayerOptions, useExtraOptionsStore, usePlayerStore } from './player-store'

const Player = ({ url }: { url: string }) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const player = useRef<ReactPlayer>(null)
    const { extraOptions, setExtraOptions } = useExtraOptionsStore()
    const { playerOptions, setPlayerOptions } = usePlayerStore()
    const {  } = useVideoControl({ player })

    const videoOnprogressFn = (progress: OnProgressProps) => {
        setExtraOptions({ ...extraOptions, playedRatio: progress.played * 100 })
    }

    useVideoFullScreenHandler()
    useEffect(() => {
        setPlayerOptions({ url })
        setIsInitialized(true)
        return () => {
            setPlayerOptions(defaultPlayerOptions)
            setExtraOptions(defaultExtraOptions)
        }
    }, [url, setPlayerOptions])

    return (
        isInitialized && (
            <Fragment>
                {extraOptions.playedRatio}
                <ReactPlayer ref={player} onProgress={videoOnprogressFn} {...playerOptions} />
                <section className='flex gap-2'>
                    <Play />
                </section>
            </Fragment>
        )
    )
}

export default dynamic(() => Promise.resolve(Player), {
    ssr: false,
})
