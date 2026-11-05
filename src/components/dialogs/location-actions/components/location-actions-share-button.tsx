'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

type LocationActionsShareButtonProps = {
    link: string
}

export const LocationActionsShareButton = ({ link }: LocationActionsShareButtonProps) => {
    const overlay = useOverlay()

    const handleShare = async () => {
        try {
            await window.navigator.share({ url: link })
        } catch (err: unknown) {
            if (
                err instanceof DOMException &&
                (err.name === 'AbortError' ||
                    err.name === 'DOMException' ||
                    err.message.toLowerCase().includes('cancel'))
            ) {
                return
            }

            overlay.showError({
                title: 'Unable to share link',
                message: 'Please try again',
            })
        }
    }

    return (
        <Button variant="minor" onClick={handleShare} className="block md:hidden">
            Share
        </Button>
    )
}
