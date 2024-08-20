'use client'

import dynamic from 'next/dynamic'
import { Fragment, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { useVideoControl, useVideoFullScreenHandler } from './hooks'
import { Play, VideoSlider } from './layout'
import { defaultExtraOptions, defaultPlayerOptions, useExtraOptionsStore, usePlayerStore } from './player-store'

const Player = ({ url }: { url: string }) => {
    const player = useRef<ReactPlayer>(null)
    const [isInitialized, setIsInitialized] = useState(false)
    const { extraOptions, setExtraOptions } = useExtraOptionsStore()
    const { playerOptions, setPlayerOptions } = usePlayerStore()
    const { playSeekTo } = useVideoControl({ player })

    const videoOnprogressFn = (progress: OnProgressProps) => {
        setExtraOptions({ playedRatio: progress.played })
        setExtraOptions({ loadedRatio: progress.loaded })
    }
    const seekBarChange = (value: number[]) => {
        console.log(value[0])
        playSeekTo(value[0])
    }

    useVideoFullScreenHandler()

    useEffect(() => {
        setPlayerOptions({ url })
        setIsInitialized(true)
        return () => {
            setPlayerOptions(defaultPlayerOptions)
            setExtraOptions(defaultExtraOptions)
        }
    }, [url, setPlayerOptions, setExtraOptions])

    return (
        isInitialized && (
            <section className='relative'>
                <ReactPlayer ref={player} onProgress={videoOnprogressFn} {...playerOptions} />
                <section className='flex gap-2 flex-1 absolute bottom-0 bg-background/10 w-full hover:bg-background/90 transition-all'>
                    <Play />
                    <VideoSlider
                        value={[extraOptions.playedRatio * 100]}
                        loadedRatio={extraOptions.loadedRatio * 100}
                        max={100}
                        min={0}
                        step={0.000001}
                        onPointerDown={() => setPlayerOptions({ playing: false })}
                        onValueChange={seekBarChange}
                        onPointerUp={() => setPlayerOptions({ playing: true })}
                    />
                </section>
            </section>
        )
    )
}

export default dynamic(() => Promise.resolve(Player), {
    ssr: false,
})
