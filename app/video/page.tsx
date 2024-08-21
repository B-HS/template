import Player from '@shared/player/player'

const Page = () => {
    return (
        <section className='h-96 w-full'>
            <Player url='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' />
        </section>
    )
}

export default Page
