'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const LocationActionsCancelButton = () => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.close()
    }

    return (
        <Button variant="minor" onClick={handleClick}>
            Cancel
        </Button>
    )
}
