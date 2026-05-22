import { Coordinates } from './types'

export const DEFAULT_MAP_LOCATION = {
    coordinates: {
        lat: 51.47722,
        lng: 0,
    },
    zoom: 5,
}

export const DEFAULT_SHARED_LOCATION_ZOOM = 15

type SearchParamsLike = {
    get: (name: string) => string | null
}

export type MapLocation = {
    coordinates: Coordinates
    zoom: number
}

const parseNumberParam = (value: string | null) => {
    if (value === null || value.trim() === '') return null

    const parsed = Number(value)

    return Number.isFinite(parsed) ? parsed : null
}

const isInRange = (value: number, min: number, max: number) => value >= min && value <= max

export const isValidZoomParam = (value: string | null) => {
    const zoom = parseNumberParam(value)

    return zoom !== null && isInRange(zoom, 0, 22)
}

export const parseLocationQuery = (searchParams: SearchParamsLike): MapLocation | null => {
    const lat = parseNumberParam(searchParams.get('lat'))
    const lng = parseNumberParam(searchParams.get('lng'))

    if (lat === null || lng === null) return null
    if (!isInRange(lat, -90, 90) || !isInRange(lng, -180, 180)) return null

    const rawZoom = parseNumberParam(searchParams.get('zoom'))
    const zoom = rawZoom !== null && isInRange(rawZoom, 0, 22) ? rawZoom : DEFAULT_SHARED_LOCATION_ZOOM

    return {
        coordinates: {
            lat,
            lng,
        },
        zoom,
    }
}
