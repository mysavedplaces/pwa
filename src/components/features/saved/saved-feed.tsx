import { useMemo } from 'react'

import { ListItem } from '@/components/common/list-item/list-item'
import { PlaceItem } from '@/components/common/place-item/place-item'
import { SectionListHeader } from '@/components/ui/section-list-header'
import { getPlacesCountByListId } from '@/utils/helpers'
import type { IList, IPlace } from '@/utils/types'

import { SavedHeader } from './components/saved-header'

type SavedFeedProps = {
    lists: IList[]
    places: IPlace[]
    onLoadPlaces: () => void
}

export const SavedFeed = ({ lists, places, onLoadPlaces }: SavedFeedProps) => {
    const placesCountByListId = useMemo(() => getPlacesCountByListId(places), [places])
    const scopedPlaces = useMemo(
        () => places.filter(place => !lists.some(list => list.id === place.listId)),
        [lists, places],
    )

    const trips = useMemo(
        () =>
            lists
                .filter(list => list.isTrip)
                .sort((listA, listB) => listA.name.localeCompare(listB.name, undefined, { sensitivity: 'base' })),
        [lists],
    )
    const savedLists = useMemo(
        () =>
            lists
                .filter(list => !list.isTrip)
                .sort((listA, listB) => listA.name.localeCompare(listB.name, undefined, { sensitivity: 'base' })),
        [lists],
    )
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

    return (
        <div className="flex flex-col gap-y-6">
            <SavedHeader onLoadPlaces={onLoadPlaces} />

            {trips.length > 0 && (
                <SavedListSection
                    title="Trips"
                    lists={trips}
                    placesCountByListId={placesCountByListId}
                />
            )}

            {savedLists.length > 0 && (
                <SavedListSection
                    title="Lists"
                    lists={savedLists}
                    placesCountByListId={placesCountByListId}
                />
            )}

            {pinnedPlaces.length > 0 && <SavedPlacesSection title="Pinned" places={pinnedPlaces} onLoadPlaces={onLoadPlaces} />}
            {regularPlaces.length > 0 && <SavedPlacesSection title="Places" places={regularPlaces} onLoadPlaces={onLoadPlaces} />}
            {archivedPlaces.length > 0 && <SavedPlacesSection title="Archived" places={archivedPlaces} onLoadPlaces={onLoadPlaces} />}
        </div>
    )
}

type SavedListSectionProps = {
    title: string
    lists: IList[]
    placesCountByListId: Record<number, number>
}

const SavedListSection = ({ title, lists, placesCountByListId }: SavedListSectionProps) => {
    return (
        <section>
            <SectionListHeader title={title} />
            <div className="space-y-2">
                {lists.map(list => (
                    <ListItem
                        key={`list-${list.id}`}
                        list={list}
                        placesCount={placesCountByListId[list.id] ?? 0}
                    />
                ))}
            </div>
        </section>
    )
}

type SavedPlacesSectionProps = {
    title: string
    places: IPlace[]
    onLoadPlaces: () => void
}

const SavedPlacesSection = ({ title, places, onLoadPlaces }: SavedPlacesSectionProps) => {
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
