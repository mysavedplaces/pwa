'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

type LocationActionsCopyButtonProps = {
    link: string
}

export const LocationActionsCopyButton = ({ link }: LocationActionsCopyButtonProps) => {
    const overlay = useOverlay()

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && window.navigator.clipboard) {
            try {
                await window.navigator.clipboard.writeText(link)
                overlay.showSuccess({
                    title: 'Link copied',
                    message: 'The navigator link is ready to paste',
                })
            } catch {
                overlay.showError({
                    title: 'Unable to copy link',
                    message: 'Please try again',
                })
            }
        } else {
            overlay.showError({
                title: 'Clipboard unavailable',
                message: 'Your browser does not support copying links',
            })
        }
    }

    return (
        <Button variant="minor" onClick={handleCopy}>
            Copy link
        </Button>
    )
}
