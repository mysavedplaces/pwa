import { useMemo } from 'react'

import { ListItem } from '@/components/common/list-item/list-item'
import { PlaceItem } from '@/components/common/place-item/place-item'
import { EmptyMessage } from '@/components/ui/empty-message'
import { SectionListHeader } from '@/components/ui/section-list-header'
import { getListNamesById, getPlacesCountByListId } from '@/utils/helpers'
import type { IList, IPlace } from '@/utils/types'

type SavedSearchProps = {
    searchTerm: string
    lists: IList[]
    places: IPlace[]
    onLoadPlaces: () => void
}

export const SavedSearch = ({ searchTerm, lists, places, onLoadPlaces }: SavedSearchProps) => {
    const listNamesById = useMemo(() => getListNamesById(lists), [lists])
    const placesCountByListId = useMemo(() => getPlacesCountByListId(places), [places])
    const trips = useMemo(
        () =>
            lists
                .filter(list => list.isTrip && list.name.toLowerCase().includes(searchTerm))
                .sort((listA, listB) => listA.name.localeCompare(listB.name, undefined, { sensitivity: 'base' })),
        [lists, searchTerm],
    )
    const savedLists = useMemo(
        () =>
            lists
                .filter(list => !list.isTrip && list.name.toLowerCase().includes(searchTerm))
                .sort((listA, listB) => listA.name.localeCompare(listB.name, undefined, { sensitivity: 'base' })),
        [lists, searchTerm],
    )
    const scopedPlaces = useMemo(
        () =>
            places
                .filter(place => place.name.toLowerCase().includes(searchTerm))
                .sort((placeA, placeB) => placeA.name.localeCompare(placeB.name, undefined, { sensitivity: 'base' })),
        [places, searchTerm],
    )

    if (trips.length === 0 && savedLists.length === 0 && scopedPlaces.length === 0) {
        return <EmptyMessage message="No locations found." />
    }

    return (
        <div className="flex flex-col gap-y-6">
            {trips.length > 0 && (
                <SavedSearchListSection
                    title="Trips"
                    lists={trips}
                    placesCountByListId={placesCountByListId}
                />
            )}

            {savedLists.length > 0 && (
                <SavedSearchListSection
                    title="Lists"
                    lists={savedLists}
                    placesCountByListId={placesCountByListId}
                />
            )}

            {scopedPlaces.length > 0 && (
                <section>
                    <SectionListHeader title="Places" count={scopedPlaces.length} />
                    <div className="space-y-2">
                        {scopedPlaces.map(place => (
                            <PlaceItem
                                key={`place-${place.id}`}
                                place={place}
                                subtitle={place.listId === undefined ? undefined : listNamesById[place.listId]}
                                isPinVisible={false}
                                onLoadPlaces={onLoadPlaces}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

type SavedSearchListSectionProps = {
    title: string
    lists: IList[]
    placesCountByListId: Record<number, number>
}

const SavedSearchListSection = ({ title, lists, placesCountByListId }: SavedSearchListSectionProps) => {
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
