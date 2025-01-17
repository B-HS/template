import { Toaster } from '@shared/ui/toaster'
import { cn } from '@shared/utils'
import { SiteHeader } from '@widgets/header'
import { SessionProvider, ThemeProvider } from '@widgets/provider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import { FC, ReactNode } from 'react'
import './globals.css'

const GoToTop = dynamic(() => import('@features/common').then((comp) => comp.GoToTop))

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const fontRound = M_PLUS_Rounded_1c({
    subsets: ['latin'],
    variable: '--font-mplus',
    weight: ['100', '300', '500', '700', '800', '900'],
})

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('flex flex-col min-h-dvh font-mplus antialiased size-full items-center', fontRound.variable)}>
                <section className='max-w-screen-lg w-full'>
                    <SessionProvider>
                        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                            <SiteHeader />
                            <section className='flex-1 overflow-auto size-full'>
                                {children}
                                <GoToTop />
                            </section>
                            <Toaster />
                        </ThemeProvider>
                    </SessionProvider>
                </section>
            </body>
        </html>
    )
}

export default RootLayout
