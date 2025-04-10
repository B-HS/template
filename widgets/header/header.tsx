import { SignInOut, TooltipIcon } from '@features/common'
import { DotsHorizontalIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '@shared/ui/button'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ScrollStatus = dynamic(() => import('@features/common').then((comp) => comp.ScrollStatus))
const ThemeChanger = dynamic(() => import('@features/common').then((comp) => comp.ThemeChanger), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
})

export const SiteHeader = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur-sm'>
            <section className='flex h-10 justify-between items-center px-3'>
                <section className='flex items-center gap-1'>
                    <Link href={'/'} className='font-semibold'>
                        {process.env.SITE_NAME}
                    </Link>
                </section>
                <section className='flex gap-2 items-center'>
                    <TooltipIcon icon={GitHubLogoIcon} linkUrl='https://github.com/B-HS' tooltipContent='Go to Github' />
                    <ThemeChanger />
                    <SignInOut />
                </section>
            </section>
            <ScrollStatus />
        </header>
    )
}
