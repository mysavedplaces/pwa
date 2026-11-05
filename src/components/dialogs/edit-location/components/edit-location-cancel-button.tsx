'use client'

import { Preview } from '@/components/dialogs/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import type { IPlace } from '@/utils/types'

type EditLocationCancelButtonProps = {
    place: IPlace
    onSuccess: () => void
}

export const EditLocationCancelButton = ({ place, onSuccess }: EditLocationCancelButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<Preview place={place} onSuccess={onSuccess} />)
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Cancel
        </Button>
    )
}
