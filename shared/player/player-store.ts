import { create } from 'zustand'

export type PlayerOptions = {
    url: string
    playing: boolean
    loop: boolean
    controls: boolean
    light: boolean
    volume: number
    muted: boolean
    width: string
    height: string
    progressInterval: number
    playbackRate: number
    playsinline: boolean
    pip: boolean
}

export type ExtraOptions = {
    isFull: boolean
    playedRatio: number
    isCursorVisible: boolean
}

export const defaultPlayerOptions: PlayerOptions = {
    url: '',
    playing: false,
    loop: false,
    controls: false,
    light: false,
    volume: 100,
    muted: false,
    width: '100%',
    height: '100%',
    progressInterval: 100,
    playbackRate: 1.0,
    playsinline: false,
    pip: false,
}

export const defaultExtraOptions: ExtraOptions = {
    isFull: false,
    playedRatio: 0,
    isCursorVisible: true,
}

export const usePlayerStore = create<{ playerOptions: PlayerOptions; setPlayerOptions: (options: Partial<PlayerOptions>) => void }>((set) => ({
    playerOptions: defaultPlayerOptions,
    setPlayerOptions: (options) =>
        set((state) => ({
            playerOptions: { ...state.playerOptions, ...options },
        })),
}))

export const useExtraOptionsStore = create<{ extraOptions: ExtraOptions; setExtraOptions: (options: Partial<ExtraOptions>) => void }>((set) => ({
    extraOptions: defaultExtraOptions,
    setExtraOptions: (options) =>
        set((state) => ({
            ...state,
            ...options,
        })),
}))
