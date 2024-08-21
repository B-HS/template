import { Button } from '@shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { cn } from '@shared/utils'
import { SlidersVertical } from 'lucide-react'
import { useMemo } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'
import { resolutionMapper, useExtraOptionsStore } from '../player-store'

export const Resolution = ({ className }: { className?: ClassNameValue }) => {
    const { extraOptions } = useExtraOptionsStore()
    const { currentQuality, setQuality } = useVideoControl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const quality = useMemo(() => resolutionMapper(extraOptions.qualities[currentQuality()]).height, [extraOptions.playedSeconds])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)}>
                    <SlidersVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top'>
                <DropdownMenuLabel>{quality}p</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {extraOptions.qualities.map((quality, idx) => (
                    <DropdownMenuItem key={idx} onClick={() => setQuality(idx)}>
                        {resolutionMapper(quality).height}p
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
