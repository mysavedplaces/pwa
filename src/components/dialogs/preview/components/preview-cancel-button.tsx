'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const PreviewCancelButton = () => {
    const overlay = useOverlay()

    const handleCancel = () => {
        overlay.close()
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleCancel}>
            Cancel
        </Button>
    )
}
