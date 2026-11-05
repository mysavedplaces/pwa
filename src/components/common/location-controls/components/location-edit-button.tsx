'use client'

import { EditLocation } from '@/components/dialogs/edit-location/edit-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import type { IPlace } from '@/utils/types'

type LocationEditButtonProps = {
    snappedPlace: IPlace
    onPlacesChange: () => void
}

export const LocationEditButton = ({ snappedPlace, onPlacesChange }: LocationEditButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<EditLocation place={snappedPlace} onSuccess={onPlacesChange} />)
    }

    return (
        <Button variant="major" className="w-full" onClick={handleClick}>
            Edit location
        </Button>
    )
}
