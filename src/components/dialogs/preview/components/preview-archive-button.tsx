'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { updatePlace } from '@/utils/db'
import type { IPlace } from '@/utils/types'

type PreviewArchiveButtonProps = {
    place: IPlace
    onSuccess: () => void
}

export const PreviewArchiveButton = ({ place, onSuccess }: PreviewArchiveButtonProps) => {
    const overlay = useOverlay()

    const handleClick = async () => {
        const updatedPlace = place.archived
            ? { ...place, archived: false }
            : { ...place, archived: true, pinned: false, pinnedAt: undefined }

        try {
            await updatePlace(updatedPlace)
            onSuccess()
            overlay.showSuccess({
                title: place.archived ? 'Location unarchived' : 'Location archived',
                message: place.archived ? 'The location is visible again' : 'The location was moved to archive',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to update location',
                message: 'Please try again',
            })
        }
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            {place.archived ? 'Unarchive' : 'Archive'}
        </Button>
    )
}
