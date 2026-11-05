import { useEffect } from 'react'
import type { ReactNode } from 'react'

import classNames from 'classnames'
import { XIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type DialogProps = {
    content: ReactNode
    isClosing: boolean
    onClose: () => void
    onRequestClose: () => void
}

export const Dialog = ({ content, isClosing, onClose, onRequestClose }: DialogProps) => {
    useScrollLock({ autoLock: !isClosing })
    useKeypress(Keys.ESCAPE, onRequestClose)

    useEffect(() => {
        if (!isClosing) return

        const timeout = window.setTimeout(onClose, 250)

        return () => window.clearTimeout(timeout)
    }, [isClosing, onClose])

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8">
            <button
                type="button"
                aria-label="Close dialog"
                onClick={onRequestClose}
                className={classNames(
                    'fixed inset-0 z-40 bg-gray-950 transition-opacity duration-300',
                    isClosing ? 'opacity-0' : 'opacity-50',
                )}
            />

            <div className="flex min-h-full items-center justify-center">
                <div
                    className={classNames(
                        'relative z-50 w-full rounded-2xl bg-white p-8 shadow-lg transition duration-300 sm:w-auto sm:p-12',
                        isClosing ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100',
                    )}
                >
                    <button
                        type="button"
                        aria-label="Close dialog"
                        className="absolute top-4 right-3 z-50 cursor-pointer text-gray-300 hover:text-gray-950 sm:right-4"
                        onClick={onRequestClose}
                    >
                        <XIcon />
                    </button>

                    <div className="md:w-100">{content}</div>
                </div>
            </div>
        </div>
    )
}
