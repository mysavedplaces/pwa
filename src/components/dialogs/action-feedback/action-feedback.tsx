'use client'

import { useEffect } from 'react'

import { CheckIcon, XIcon } from 'lucide-react'

const DEFAULT_DURATION_MS = 1400

type ActionFeedbackProps = {
    variant?: 'success' | 'error'
    title: string
    message: string
    durationMs?: number
    onComplete: () => void
}

export const ActionFeedback = ({
    variant = 'success',
    title,
    message,
    durationMs = DEFAULT_DURATION_MS,
    onComplete,
}: ActionFeedbackProps) => {
    useEffect(() => {
        const timeout = window.setTimeout(onComplete, durationMs)

        return () => window.clearTimeout(timeout)
    }, [durationMs, onComplete])

    return (
        <div className="flex w-full flex-col items-center pt-6 pb-3 text-center">
            <div className="relative flex size-18 items-center justify-center">
                <div
                    className={`absolute size-13 rounded-full motion-safe:animate-[feedback-pulse_560ms_ease-out_forwards] ${
                        variant === 'success' ? 'bg-green-600/20' : 'bg-red-600/20'
                    }`}
                />
                <div className="relative flex size-16 items-center justify-center motion-safe:animate-[feedback-icon_380ms_ease-out_forwards]">
                    {variant === 'success' ? (
                        <CheckIcon size={38} strokeWidth={2.75} className="text-green-600" />
                    ) : (
                        <XIcon size={38} strokeWidth={2.75} className="text-red-600" />
                    )}
                </div>
            </div>

            <div className="mt-2.5 space-y-1.5 motion-safe:animate-[feedback-content_220ms_ease-out_120ms_both]">
                <div className="text-lg font-bold">{title}</div>
                <div className="text-sm leading-5 text-gray-500">{message}</div>
            </div>
        </div>
    )
}
