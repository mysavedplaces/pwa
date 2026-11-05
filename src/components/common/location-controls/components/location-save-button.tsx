'use client'

import { AddLocation } from '@/components/dialogs/add-location/add-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import type { Coordinates } from '@/utils/types'

type LocationSaveButtonProps = {
    coordinates: Coordinates
    onPlacesChange: () => void
}

export const LocationSaveButton = ({ coordinates, onPlacesChange }: LocationSaveButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<AddLocation coordinates={coordinates} onSuccess={onPlacesChange} />)
    }

    return (
        <Button variant="major" className="w-full" onClick={handleClick}>
            Save location
        </Button>
    )
}
