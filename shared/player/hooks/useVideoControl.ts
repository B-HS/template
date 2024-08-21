import screenfull from 'screenfull'
import { TrackOpt, useExtraOptionsStore, usePlayerStore } from '../player-store'

export const useVideoControl = () => {
    const { extraOptions, setExtraOptions } = useExtraOptionsStore()
    const { playerOptions, setPlayerOptions } = usePlayerStore()

    const playToggle = (value?: boolean) => {
        if (value !== undefined) {
            setPlayerOptions({ playing: value })
            return
        }
        setPlayerOptions({ playing: !playerOptions.playing })
    }

    const playSeekTo = (fraction: number) => {
        const currentTime = extraOptions.player?.current?.getCurrentTime()
        if (currentTime !== undefined) {
            extraOptions.player?.current?.seekTo(fraction / 100, 'fraction')
        }
    }

    const playSeekToBySeconds = (seconds: number) => {
        const currentTime = extraOptions.player?.current?.getCurrentTime() || 0
        extraOptions.player?.current?.seekTo(currentTime + seconds)
    }

    const muteToggle = () => {
        console.log('muteToggle')
        setPlayerOptions({ muted: !playerOptions.muted })
    }

    const playRateChange = (rate: number) => {
        setPlayerOptions({ playbackRate: rate })
    }

    const pipModeToggle = () => {
        setPlayerOptions({ pip: !playerOptions.pip })
    }

    const fullscreenToggle = () => {
        if (screenfull.isFullscreen) {
            setExtraOptions({ isFull: false })
            screenfull.exit()
        } else {
            setExtraOptions({ isFull: false })
            screenfull.request(document.querySelector('.video-player')!)
        }
    }

    return {
        playToggle,
        playSeekTo,
        playSeekToBySeconds,
        muteToggle,
        playRateChange,
        pipModeToggle,
        fullscreenToggle,
    }
}
