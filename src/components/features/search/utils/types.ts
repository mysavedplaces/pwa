import type { Coordinates, IList, IPlace, SearchItem } from '@/utils/types'

export type CoordinatesSearchItem = {
    title: string
    coordinates: Coordinates
}

export type PlaceSearchItem = IPlace & {
    listName?: string
}

export type SearchHistoryItem = {
    query: string
}

export type SearchSection =
    | {
          title: string
          type: 'coordinates'
          data: CoordinatesSearchItem[]
      }
    | {
          title: string
          type: 'history'
          data: SearchHistoryItem[]
      }
    | {
          title: string
          type: 'saved'
          data: PlaceSearchItem[]
      }
    | {
          title: string
          type: 'results'
          data: SearchItem[]
      }
