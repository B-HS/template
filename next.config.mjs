import { env } from '@cloudflare/next-on-pages'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

/** @type {import('next').NextConfig} */
const nextConfig = {
    env,
    transpilePackages: ['shiki', 'next-mdx-remote', 'next-mdx-remote/serialize'],
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net',
            },
        ],
    },
}
process.env.NODE_ENV === 'development' && (await setupDevPlatform())
console.log(ebv)

export default nextConfig
