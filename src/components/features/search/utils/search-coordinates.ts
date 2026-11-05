import type { Coordinates } from '@/utils/types'

import type { CoordinatesSearchItem } from './types'

const DD_COORDINATES_REGEX =
    /^([-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?))\s*(?:,|\s)\s*([-+]?(?:(?:1[0-7]\d|[1-9]?\d)(?:\.\d+)?|180(?:\.0+)?))$/

const DMS_COORDINATES_REGEX =
    /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(?:\.\d+)?)["″]?\s*([NS])[\s,]+(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(?:\.\d+)?)["″]?\s*([EW])$/i

const normalizeCoordinatesInput = (value: string) => {
    return value
        .trim()
        .replace(/^\(+|\)+$/g, '')
        .replace(/\s+/g, ' ')
}

const isValidCoordinates = ({ lat, lng }: Coordinates) => {
    return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

const formatCoordinate = (value: number) => {
    return Number(value.toFixed(7)).toString()
}

const parseDDCoordinates = (query: string): Coordinates | null => {
    const match = normalizeCoordinatesInput(query).match(DD_COORDINATES_REGEX)

    if (!match) {
        return null
    }

    const coordinates = {
        lat: Number(match[1]),
        lng: Number(match[2]),
    }

    return isValidCoordinates(coordinates) ? coordinates : null
}

const convertDMSPartToDD = (degrees: string, minutes: string, seconds: string, direction: string) => {
    const degreesValue = Number(degrees)
    const minutesValue = Number(minutes)
    const secondsValue = Number(seconds)

    if (
        !Number.isFinite(degreesValue) ||
        !Number.isFinite(minutesValue) ||
        !Number.isFinite(secondsValue) ||
        minutesValue >= 60 ||
        secondsValue >= 60
    ) {
        return null
    }

    const directionMultiplier = direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W' ? -1 : 1

    return (degreesValue + minutesValue / 60 + secondsValue / 3600) * directionMultiplier
}

const parseDMSCoordinates = (query: string): Coordinates | null => {
    const match = normalizeCoordinatesInput(query).match(DMS_COORDINATES_REGEX)

    if (!match) {
        return null
    }

    const [, latDegrees, latMinutes, latSeconds, latDirection, lngDegrees, lngMinutes, lngSeconds, lngDirection] = match
    const lat = convertDMSPartToDD(latDegrees, latMinutes, latSeconds, latDirection)
    const lng = convertDMSPartToDD(lngDegrees, lngMinutes, lngSeconds, lngDirection)

    if (lat === null || lng === null) {
        return null
    }

    const coordinates = { lat, lng }

    return isValidCoordinates(coordinates) ? coordinates : null
}

export const getCoordinatesSearchItems = (query: string): CoordinatesSearchItem[] => {
    const coordinates = parseDDCoordinates(query) ?? parseDMSCoordinates(query)

    if (!coordinates) {
        return []
    }

    return [
        {
            title: [formatCoordinate(coordinates.lat), formatCoordinate(coordinates.lng)].join(', '),
            coordinates,
        },
    ]
}
