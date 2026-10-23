export type SharedPlace = {
    name: string
    coordinates: { lat: number; lng: number }
    iconId?: string
}

type PlaceShareParams = Record<string, string | string[] | undefined>

export const parsePlaceShareParams = ({ v, lat, lng, name, icon }: PlaceShareParams): SharedPlace | null => {
    if (
        v !== '1' ||
        typeof lat !== 'string' ||
        typeof lng !== 'string' ||
        !lat.trim() ||
        !lng.trim() ||
        (name !== undefined && typeof name !== 'string') ||
        (icon !== undefined && typeof icon !== 'string')
    ) {
        return null
    }

    const latitude = Number(lat)
    const longitude = Number(lng)

    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
    ) {
        return null
    }

    return {
        name: name?.trim() ?? '',
        coordinates: { lat: latitude, lng: longitude },
        iconId: icon && /^[a-z][a-z-]{0,63}$/.test(icon) ? icon : undefined,
    }
}

export const buildPlaceDeepLink = (place: SharedPlace) => {
    const params = new URLSearchParams({
        v: '1',
        lat: String(place.coordinates.lat),
        lng: String(place.coordinates.lng),
        name: place.name,
    })

    if (place.iconId) {
        params.set('icon', place.iconId)
    }

    return `mysavedplaces://place?${params.toString()}`
}
