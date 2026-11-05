'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

type AddListCancelButtonProps = {
    onCancel?: () => void
}

export const AddListCancelButton = ({ onCancel }: AddListCancelButtonProps) => {
    const overlay = useOverlay()

    return (
        <Button variant="minor" className="w-full" onClick={onCancel ?? overlay.close}>
            Cancel
        </Button>
    )
}
