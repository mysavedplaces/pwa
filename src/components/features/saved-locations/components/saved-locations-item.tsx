'use client'

import { PinIcon } from 'lucide-react'

import { Preview } from '@/components/dialogs/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const overlay = useOverlay()

    const handleTogglePin = async () => {
        const isPinned = !!place.pinned

        await updatePlace({
            ...place,
            pinned: !isPinned,
            pinnedAt: !isPinned ? Date.now() : undefined,
        })

        onLoadPlaces()
    }

    const handleClick = () => {
        overlay.open(<Preview place={place} onSuccess={onLoadPlaces} />)
    }

    return (
        <div className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 text-sm hover:bg-gray-100">
            <div className="flex-1 p-4 font-bold" onClick={handleClick}>
                {place.name}
            </div>
            <div className="cursor-pointer p-4" onClick={handleTogglePin}>
                <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
            </div>
        </div>
    )
}
