'use client'

import { useEffect, useMemo, useState } from 'react'

import { PencilIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PlaceItem } from '@/components/common/place-item/place-item'
import { SecondaryScreenViewHeader } from '@/components/common/secondary-screen-view/secondary-screen-view-header'
import { EditList } from '@/components/dialogs/edit-list/edit-list'
import { useOverlay } from '@/components/providers/overlay-provider'
import { EmptyMessage } from '@/components/ui/empty-message'
import { SectionListHeader } from '@/components/ui/section-list-header'
import { getStorageData } from '@/utils/db'
import type { IList, IPlace } from '@/utils/types'

type SavedListProps = {
    listId: number
}

export const SavedList = ({ listId }: SavedListProps) => {
    const overlay = useOverlay()
    const router = useRouter()

    const [places, setPlaces] = useState<IPlace[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadPlaces = async () => {
        setIsLoading(true)

        try {
            const data = await getStorageData()
            setPlaces(data.places)
            setLists(data.lists)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        void loadPlaces()
    }, [])

    const currentList = useMemo(() => lists.find(list => list.id === listId), [listId, lists])
    const scopedPlaces = useMemo(() => places.filter(place => place.listId === listId), [listId, places])
    const pinnedPlaces = useMemo(
        () =>
            scopedPlaces
                .filter(place => place.pinned && !place.archived)
                .sort((placeA, placeB) => (placeB.pinnedAt ?? 0) - (placeA.pinnedAt ?? 0)),
        [scopedPlaces],
    )
    const regularPlaces = useMemo(
        () =>
            scopedPlaces
                .filter(place => !place.pinned && !place.archived)
                .sort((placeA, placeB) => placeB.createdAt - placeA.createdAt),
        [scopedPlaces],
    )
    const archivedPlaces = useMemo(
        () => scopedPlaces.filter(place => place.archived).sort((placeA, placeB) => placeB.createdAt - placeA.createdAt),
        [scopedPlaces],
    )

    const handleEdit = () => {
        if (!currentList) {
            return
        }

        overlay.open(<EditList list={currentList} onSuccess={loadPlaces} onDeleted={() => router.replace('/saved')} />)
    }

    if (isLoading) {
        return <div className="text-sm text-gray-500">Loading list...</div>
    }

    if (!currentList) {
        return <EmptyMessage message="This list could not be found." />
    }

    return (
        <section className="min-h-full w-full space-y-6">
            <SecondaryScreenViewHeader
                title={currentList.name}
                titleAction={
                    <button
                        type="button"
                        aria-label={`Edit ${currentList.name}`}
                        className="flex size-7 shrink-0 cursor-pointer items-center justify-center text-gray-500 hover:text-gray-950 active:opacity-65"
                        onClick={handleEdit}
                    >
                        <PencilIcon size={18} />
                    </button>
                }
            />

            {scopedPlaces.length === 0 ? (
                <EmptyMessage message="This list has no saved locations yet." />
            ) : (
                <div className="flex flex-col gap-y-6">
                    {pinnedPlaces.length > 0 && (
                        <SavedListPlacesSection title="Pinned" places={pinnedPlaces} onLoadPlaces={loadPlaces} />
                    )}
                    {regularPlaces.length > 0 && (
                        <SavedListPlacesSection title="Places" places={regularPlaces} onLoadPlaces={loadPlaces} />
                    )}
                    {archivedPlaces.length > 0 && (
                        <SavedListPlacesSection title="Archived" places={archivedPlaces} onLoadPlaces={loadPlaces} />
                    )}
                </div>
            )}
        </section>
    )
}

type SavedListPlacesSectionProps = {
    title: string
    places: IPlace[]
    onLoadPlaces: () => void
}

const SavedListPlacesSection = ({ title, places, onLoadPlaces }: SavedListPlacesSectionProps) => {
    return (
        <section>
            <SectionListHeader title={title} count={places.length} />
            <div className="space-y-2">
                {places.map(place => (
                    <PlaceItem key={`place-${place.id}`} place={place} onLoadPlaces={onLoadPlaces} />
                ))}
            </div>
        </section>
    )
}
