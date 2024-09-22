import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import { getRequestContext } from "@cloudflare/next-on-pages"

/** @type {import('next').NextConfig} */
const { env } = getRequestContext()
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

export default nextConfig
