'use client'

import type { ReactNode } from 'react'

import { ArrowLeftIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

type SecondaryScreenViewHeaderProps = {
    title: string
    titleAction?: ReactNode
    rightSlot?: ReactNode
}

export const SecondaryScreenViewHeader = ({ title, titleAction, rightSlot }: SecondaryScreenViewHeaderProps) => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <header className="flex min-w-0 items-center gap-x-2">
            <button
                type="button"
                aria-label="Back"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center active:opacity-65"
                onClick={handleBack}
            >
                <ArrowLeftIcon size={24} />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-x-2">
                <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
                {titleAction}
            </div>

            {rightSlot && <div className="flex shrink-0 items-center">{rightSlot}</div>}
        </header>
    )
}
