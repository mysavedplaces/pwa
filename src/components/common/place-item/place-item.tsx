'use client'

import { PinIcon } from 'lucide-react'

import { Preview } from '@/components/dialogs/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { PlaceIcon } from '@/components/ui/place-icon'
import { updatePlace } from '@/utils/db'
import type { IPlace } from '@/utils/types'

type PlaceItemProps = {
    place: IPlace
    onLoadPlaces: () => void
    subtitle?: string
    isPinVisible?: boolean
}

export const PlaceItem = ({ place, onLoadPlaces, subtitle, isPinVisible = true }: PlaceItemProps) => {
    const overlay = useOverlay()

    const handleTogglePin = async () => {
        const isPinned = !!place.pinned

        try {
            await updatePlace({
                ...place,
                pinned: !isPinned,
                pinnedAt: !isPinned ? Date.now() : undefined,
            })

            onLoadPlaces()
        } catch (error) {
            console.error(error)
            overlay.showError({
                title: 'Unable to update location',
                message: 'Please try again',
            })
        }
    }

    const handleClick = () => {
        overlay.open(<Preview place={place} onSuccess={onLoadPlaces} />)
    }

    return (
        <div
            className={`flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 text-sm hover:bg-gray-100 ${
                place.archived ? 'opacity-45' : ''
            }`}
        >
            <button type="button" className="flex-1 cursor-pointer p-4 text-left" onClick={handleClick}>
                <div className="flex items-center gap-x-3">
                    {place.iconId && <PlaceIcon iconId={place.iconId} size={16} backgroundColor="#FFEDD5" />}
                    <div className="font-bold">{place.name}</div>
                </div>
                {subtitle && <div className="mt-1 text-xs font-normal text-gray-500">{subtitle}</div>}
            </button>
            {isPinVisible && !place.archived && (
                <button
                    type="button"
                    aria-label={place.pinned ? `Unpin ${place.name}` : `Pin ${place.name}`}
                    className="cursor-pointer p-4"
                    onClick={handleTogglePin}
                >
                    <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
                </button>
            )}
        </div>
    )
}
