import { useExtraOptionsStore } from '../player-store'
export const useHlsControl = () => {
    const { extraOptions } = useExtraOptionsStore()
    const hls  = extraOptions.hlsRef?.current

    const changeQuality = (levelIndex: number): void => {
        if (hls && hls.levels && hls.levels.length > 0) {
            if (levelIndex >= 0 && levelIndex < hls.levels.length) {
                hls.currentLevel = levelIndex
                console.log(`Quality changed to level ${levelIndex}`)
            } else {
                console.log('Invalid quality level index')
            }
        } else {
            console.log('HLS levels not available')
        }
    }

    const getQualityList = (): { index: number; bitrate: number; resolution: string }[] => {
        if (hls && hls.levels && hls.levels.length > 0) {
            return hls.levels.map((level, index) => ({
                index: index,
                bitrate: level.bitrate,
                resolution: `${level.width}x${level.height}`,
            }))
        } else {
            console.log('No quality levels available')
            return []
        }
    }

    const getAudioTrackList = (): { index: number; name: string; language: string; groupId: string }[] => {
        if (hls && hls.audioTracks && hls.audioTracks.length > 0) {
            return hls.audioTracks.map((track, index) => ({
                index: index,
                name: track.name,
                language: track.lang || '',
                groupId: track.groupId,
            }))
        } else {
            console.log('No audio tracks available')
            return []
        }
    }

    const getTextTrackList = (): { index: number; name: string; language: string; groupId: string; kind: string }[] => {
        if (hls && hls.subtitleTracks && hls.subtitleTracks.length > 0) {
            return hls.subtitleTracks.map((track: any, index) => ({
                index: index,
                name: track.name,
                language: track.lang,
                groupId: track.groupId,
                kind: track.kind,
            }))
        } else {
            console.log('No text tracks available')
            return []
        }
    }

    const setAudioTrack = (criteria: { name?: string; language?: string; groupId?: string }): void => {
        if (hls && hls.audioTracks && hls.audioTracks.length > 0) {
            const trackIndex = hls.audioTracks.findIndex(
                (track) =>
                    (criteria.name ? track.name === criteria.name : true) &&
                    (criteria.language ? track.lang === criteria.language : true) &&
                    (criteria.groupId ? track.groupId === criteria.groupId : true),
            )

            if (trackIndex !== -1) {
                hls.audioTrack = trackIndex
                console.log(`Audio track set to ${trackIndex}`)
            } else {
                console.log('No matching audio track found')
            }
        } else {
            console.log('No audio tracks available')
        }
    }

    const setTextTrack = (criteria: { name?: string; language?: string; groupId?: string; kind?: string }): void => {
        if (hls && hls.subtitleTracks && hls.subtitleTracks.length > 0) {
            const trackIndex = hls.subtitleTracks.findIndex(
                (track: any) =>
                    (criteria.name ? track.name === criteria.name : true) &&
                    (criteria.language ? track.lang === criteria.language : true) &&
                    (criteria.groupId ? track.groupId === criteria.groupId : true) &&
                    (criteria.kind ? track.kind === criteria.kind : true),
            )

            if (trackIndex !== -1) {
                hls.subtitleTrack = trackIndex
                console.log(`Text track set to ${trackIndex}`)
            } else {
                console.log('No matching text track found')
            }
        } else {
            console.log('No text tracks available')
        }
    }

    const setQuality = (criteria: { bitrate?: number; resolution?: string }): void => {
        if (hls && hls.levels && hls.levels.length > 0) {
            const levelIndex = hls.levels.findIndex(
                (level) =>
                    (criteria.bitrate ? level.bitrate === criteria.bitrate : true) &&
                    (criteria.resolution ? `${level.width}x${level.height}` === criteria.resolution : true),
            )

            if (levelIndex !== -1) {
                hls.currentLevel = levelIndex
                console.log(`Quality changed to level ${levelIndex}`)
            } else {
                console.log('No matching quality level found')
            }
        } else {
            console.log('No quality levels available')
        }
    }

    return {
        changeQuality,
        getQualityList,
        getAudioTrackList,
        getTextTrackList,
        setAudioTrack,
        setTextTrack,
        setQuality,
    }
}
