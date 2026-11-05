import type { IList, IPlace } from '@/utils/types'

import { SEARCH_SECTION_ITEMS_LIMIT } from './constants'
import { PlaceSearchItem } from './types'

const getSavedPlaceSearchScore = (placeName: string, query: string) => {
    const name = placeName.toLowerCase()
    const hasWordStart = name.split(/\s+/).some(word => word.startsWith(query))

    if (name === query) return 0
    if (name.startsWith(query)) return 1
    if (hasWordStart) return 2
    if (name.includes(query)) return 3

    return 4
}

export const getRelevantSavedPlaces = (query: string, places: IPlace[], lists: IList[]): PlaceSearchItem[] => {
    const normalizedQuery = query.toLowerCase()

    if (!normalizedQuery) {
        return []
    }

    const listNamesById = new Map(lists.map(list => [list.id, list.name]))

    return places
        .filter(place => place.name.toLowerCase().includes(normalizedQuery))
        .sort((firstPlace, secondPlace) => {
            const firstScore = getSavedPlaceSearchScore(firstPlace.name, normalizedQuery)
            const secondScore = getSavedPlaceSearchScore(secondPlace.name, normalizedQuery)

            if (firstScore !== secondScore) {
                return firstScore - secondScore
            }

            return firstPlace.name.localeCompare(secondPlace.name)
        })
        .slice(0, SEARCH_SECTION_ITEMS_LIMIT)
        .map(place => ({
            ...place,
            listName: place.listId === undefined ? undefined : listNamesById.get(place.listId),
        }))
}
