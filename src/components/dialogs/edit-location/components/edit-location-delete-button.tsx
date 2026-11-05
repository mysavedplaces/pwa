'use client'

import { Confirmation } from '@/components/dialogs/confirmation/confirmation'
import { EditLocation } from '@/components/dialogs/edit-location/edit-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { deletePlace } from '@/utils/db'
import type { IPlace } from '@/utils/types'

type EditLocationDeleteButtonProps = {
    place: IPlace
    onSuccess: () => void
}

export const EditLocationDeleteButton = ({ place, onSuccess }: EditLocationDeleteButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(
            <Confirmation
                title="Delete location"
                message="Are you sure you want to delete this location?"
                onConfirm={async () => {
                    try {
                        await deletePlace(place.id)
                        onSuccess()
                        overlay.showSuccess({
                            title: 'Location deleted',
                            message: 'The location has been removed',
                        })
                    } catch (err) {
                        console.error(err)
                        overlay.showError({
                            title: 'Unable to delete location',
                            message: 'Please try again',
                        })
                    }
                }}
                onCancel={() => {
                    overlay.open(<EditLocation place={place} onSuccess={onSuccess} />)
                }}
            />,
        )
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Delete
        </Button>
    )
}
