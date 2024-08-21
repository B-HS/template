'use client'

import { TooltipProvider } from '@shared/ui/tooltip'
import { cn } from '@shared/utils'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { useVideoControl, useVideoFullScreenHandler, useVideoKeyHandler } from './hooks'
import { Fullscreen, Pip, Play, Resolution, Time, VideoSlider, Volume } from './layout'
import { defaultExtraOptions, defaultPlayerOptions, useExtraOptionsStore, usePlayerStore } from './player-store'

const Player = ({ url, title }: { url: string; title?: string }) => {
    const player = useRef<ReactPlayer>(null)
    const [isInitialized, setIsInitialized] = useState(false)
    const { extraOptions, setExtraOptions } = useExtraOptionsStore()
    const { playerOptions, setPlayerOptions } = usePlayerStore()
    const { playSeekTo, playToggle } = useVideoControl()

    const videoOnprogressFn = (progress: OnProgressProps) => {
        setExtraOptions({
            playedRatio: progress.played,
            loadedRatio: progress.loaded,
            loadedSeconds: Math.ceil(progress.loadedSeconds),
            playedSeconds: Math.ceil(progress.playedSeconds),
        })
    }

    const seekBarChange = (value: number[]) => {
        playSeekTo(value[0])
    }

    useVideoFullScreenHandler()
    useVideoKeyHandler()

    useEffect(() => {
        setExtraOptions({ player })
        setPlayerOptions({ url })
        setIsInitialized(true)
        return () => {
            setPlayerOptions(defaultPlayerOptions)
            setExtraOptions(defaultExtraOptions)
        }
    }, [url, setPlayerOptions, setExtraOptions])

    return (
        isInitialized && (
            <TooltipProvider>
                <section className='relative video-player size-full group'>
                    <section
                        className={cn(
                            'absolute top-0 left-0 backdrop-opacity-90 size-full bg-background/50 z-50 group-hover:visible invisible flex flex-col justify-between items-center',
                            (!playerOptions.playing || (extraOptions.isFull && extraOptions.isCursorVisible)) && 'visible',
                            !extraOptions.isCursorVisible && 'invisible  group-hover:visible',
                        )}>
                        <section className='w-full h-16 flex items-center p-2.5'>
                            <span className='text-xl font-semibold'>{title || 'VIDEO'}</span>
                        </section>
                        <section className='flex items-center justify-center size-full' onClick={() => playToggle()}>
                            <Play className={'size-16 text-lg rounded-full hover:bg-opacity-30'} />
                        </section>
                        <section className='flex gap-2 w-full'>
                            <Play />
                            <Time />
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
                            <section className='flex'>
                                <Resolution />
                                <Volume />
                                <Pip />
                                <Fullscreen />
                            </section>
                        </section>
                    </section>
                    <ReactPlayer
                        config={{ file: { forceHLS: true, hlsOptions: {} } }}
                        ref={player}
                        onProgress={videoOnprogressFn}
                        {...playerOptions}
                    />
                </section>
            </TooltipProvider>
        )
    )
}

export default dynamic(() => Promise.resolve(Player), {
    ssr: false,
    loading: () => <div className='aspect-video blur-md bg-foreground/10 border' />,
})
