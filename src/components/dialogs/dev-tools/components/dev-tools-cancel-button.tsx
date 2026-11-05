'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const DevToolsCancelButton = () => {
    const overlay = useOverlay()

    return (
        <Button variant="minor" className="w-full" onClick={overlay.close}>
            Cancel
        </Button>
    )
}
