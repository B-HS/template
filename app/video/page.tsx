import Player from '@shared/player/player'

const Page = () => {
    return (
        <section className='h-96 w-fit'>
            <Player url='https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8' />
        </section>
    )
}

export default Page
