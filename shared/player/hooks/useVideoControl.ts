import { RefObject } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import { useExtraOptionsStore, usePlayerStore } from '../player-store'

export const useVideoControl = ({ player }: { player: RefObject<ReactPlayer> }) => {
    const { setExtraOptions } = useExtraOptionsStore()
    const { playerOptions, setPlayerOptions } = usePlayerStore()

    const playToggle = () => {
        setPlayerOptions({ playing: !playerOptions.playing })
    }

    const playSeekTo = (fraction: number) => {
        const currentTime = player.current?.getCurrentTime()
        if (currentTime !== undefined) {
            player.current?.seekTo(fraction / 100, 'fraction')
        }
    }

    const muteToggle = () => {
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
        muteToggle,
        playRateChange,
        pipModeToggle,
        fullscreenToggle,
    }
}
