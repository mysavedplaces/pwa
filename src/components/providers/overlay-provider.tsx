'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import { ActionFeedback } from '@/components/dialogs/action-feedback/action-feedback'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Dialog } from '@/components/ui/dialog'
import { useIsMobile } from '@/utils/hooks/use-is-mobile'

type OverlaySuccessOptions = {
    title: string
    message: string
    durationMs?: number
    onFinish?: () => void
}

type OverlayErrorOptions = Omit<OverlaySuccessOptions, 'onFinish'>

interface OverlayContextInterface {
    open(content: ReactNode): void
    close(): void
    showSuccess(options: OverlaySuccessOptions): void
    showError(options: OverlayErrorOptions): void
}

const OverlayContext = createContext<OverlayContextInterface | undefined>(undefined)

export const useOverlay = () => {
    const ctx = useContext(OverlayContext)
    if (!ctx) throw new Error('useOverlay must be used inside OverlayProvider')
    return ctx
}

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>(null)
    const [isClosing, setIsClosing] = useState(false)
    const isMobile = useIsMobile()

    const open = useCallback((node: ReactNode) => {
        setIsClosing(false)
        setContent(node)
    }, [])

    const close = useCallback(() => {
        setIsClosing(true)
    }, [])

    const showFeedback = useCallback(
        (variant: 'success' | 'error', { title, message, durationMs, onFinish }: OverlaySuccessOptions) => {
            setIsClosing(false)
            setContent(
                <ActionFeedback
                    variant={variant}
                    title={title}
                    message={message}
                    durationMs={durationMs}
                    onComplete={() => {
                        onFinish?.()
                        close()
                    }}
                />,
            )
        },
        [close],
    )

    const showSuccess = useCallback(
        (options: OverlaySuccessOptions) => {
            showFeedback('success', options)
        },
        [showFeedback],
    )

    const showError = useCallback(
        (options: OverlayErrorOptions) => {
            showFeedback('error', options)
        },
        [showFeedback],
    )

    const handleClosed = useCallback(() => {
        setContent(null)
        setIsClosing(false)
    }, [])

    return (
        <OverlayContext.Provider value={{ open, close, showSuccess, showError }}>
            {children}

            {content &&
                (isMobile ? (
                    <BottomSheet
                        content={content}
                        isClosing={isClosing}
                        onClose={handleClosed}
                        onRequestClose={close}
                    />
                ) : (
                    <Dialog content={content} isClosing={isClosing} onClose={handleClosed} onRequestClose={close} />
                ))}
        </OverlayContext.Provider>
    )
}
