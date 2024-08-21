'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@shared/utils'
import * as React from 'react'

export const VideoSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
        loadedRatio: number
    }
>(({ className, loadedRatio, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center cursor-pointer', className)} {...props}>
        <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-foreground/20'>
            <div
                className={`absolute h-1.5 bg-foreground/10`}
                style={{
                    width: `${loadedRatio}%`,
                }}
            />
            <SliderPrimitive.Range className='absolute h-full bg-primary' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='rounded-full border border-primary bg-background ring-offset-foreground transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
    </SliderPrimitive.Root>
))
VideoSlider.displayName = SliderPrimitive.Root.displayName
