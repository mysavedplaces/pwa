import { ExternalAppCategory, ExternalAppId } from './enums'

export type Coordinates = {
    lat: number
    lng: number
}

export type MapStyleId = 'positron' | 'bright' | 'liberty' | 'dark' | 'fiord'

export type PlaceIconId =
    | 'art'
    | 'baby'
    | 'balloon'
    | 'beer'
    | 'bike'
    | 'building'
    | 'bus'
    | 'cable-car'
    | 'cake'
    | 'camping'
    | 'car'
    | 'carrot'
    | 'cat'
    | 'cherry'
    | 'church'
    | 'coffee'
    | 'cocktails'
    | 'clothes'
    | 'disco'
    | 'discount'
    | 'dog'
    | 'diy'
    | 'fast-food'
    | 'finance'
    | 'fish'
    | 'fire-pit'
    | 'flight'
    | 'flowers'
    | 'food'
    | 'friends'
    | 'fun'
    | 'furniture'
    | 'fuel'
    | 'garage'
    | 'ghost'
    | 'grape'
    | 'groceries'
    | 'guitar'
    | 'gym'
    | 'heart'
    | 'home'
    | 'hotel'
    | 'ice-cream'
    | 'jewelry'
    | 'key'
    | 'landmark'
    | 'library'
    | 'medical'
    | 'mountains'
    | 'music'
    | 'palm'
    | 'parcel'
    | 'party'
    | 'park'
    | 'parking'
    | 'pet'
    | 'pharmacy'
    | 'photo'
    | 'pool'
    | 'school'
    | 'science'
    | 'ship'
    | 'smile'
    | 'sport'
    | 'star'
    | 'stationery'
    | 'store'
    | 'theater'
    | 'ticket'
    | 'train'
    | 'walking'
    | 'work'

export type SearchItem = {
    title: string
    description: string
    coordinates: Coordinates
}

export const PLACE_TYPES = {
    DEFAULT: 'default',
} as const

export type IPlace = {
    id: number
    name: string
    coordinates: Coordinates
    categories: null
    type: (typeof PLACE_TYPES)[keyof typeof PLACE_TYPES]
    iconId?: PlaceIconId
    listId?: number
    pinned?: boolean
    archived?: boolean
    createdAt: number
    pinnedAt?: number
}

export type IList = {
    id: number
    name: string
    createdAt: number
    isTrip?: boolean
}

export type IExternalApp = {
    id: ExternalAppId
    name: string
    shortName: string
    icon: string
    category: ExternalAppCategory
    buildWebLink: (lat: number, lng: number) => string
}

export type AppStorageSchema = {
    mapStyleId: MapStyleId
    selectedAppIds: ExternalAppId[]
    searchHistory: string[]
}

export type PlacesStorageSchema = {
    places: IPlace[]
    lists: IList[]
}
