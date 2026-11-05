import type { IPlace } from '@/utils/types'

export type PlacesGeoJSON = {
    type: 'FeatureCollection'
    features: {
        type: 'Feature'
        geometry: {
            type: 'Point'
            coordinates: [number, number]
        }
        properties: {
            id: number
            name: string
        }
    }[]
}

export type PlaceDistance = {
    place: IPlace
    distance: number
}

export const SNAP_MIN_ZOOM = 15
export const SNAP_DISTANCE_PX = 30

export const createPlaceFeatureCollection = (places: IPlace[]): PlacesGeoJSON => ({
    type: 'FeatureCollection',
    features: places.map(place => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [place.coordinates.lng, place.coordinates.lat],
        },
        properties: {
            id: place.id,
            name: place.name,
        },
    })),
})

export const getClosestPlaceDistance = (placeDistances: PlaceDistance[]): PlaceDistance | null => {
    return placeDistances.reduce<PlaceDistance | null>(
        (closest, current) => (!closest || current.distance < closest.distance ? current : closest),
        null,
    )
}
