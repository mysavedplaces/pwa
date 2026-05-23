import { SearchItem } from '@/utils/types'

type LocationIQAutocompleteItem = {
    display_place?: string
    display_name?: string
    lat?: string
    lon?: string
}

type LocationIQReverseGeocodeResponse = {
    display_name?: string
    address?: {
        country_code?: string
    }
}

type AutocompleteOptions = {
    countryCode?: string
    limit?: number
    locale?: string | null
}

type ReverseGeocodeOptions = {
    includeAddressDetails?: boolean
    locale?: string | null
}

type ReverseGeocodeLocation = {
    address: string | null
    countryCode: string | null
}

const DEFAULT_LOCALE = 'en'
const DEFAULT_LIMIT = 5
const AUTOCOMPLETE_CACHE_TTL_MS = 5 * 60 * 1000
const REVERSE_GEOCODE_CACHE_TTL_MS = 60 * 60 * 1000

type CacheEntry<T> = {
    expiresAt: number
    value: T
}

const autocompleteCache = new Map<string, CacheEntry<SearchItem[]>>()
const reverseGeocodeCache = new Map<string, CacheEntry<ReverseGeocodeLocation>>()
const pendingAutocompleteRequests = new Map<string, Promise<SearchItem[]>>()
const pendingReverseGeocodeRequests = new Map<string, Promise<ReverseGeocodeLocation>>()

const getLocationIQConfig = () => {
    const apiKey = process.env.LOCATIONIQ_API_KEY
    const apiUrl = process.env.LOCATIONIQ_API_URL

    if (!apiKey || !apiUrl) {
        throw new Error('Missing LocationIQ configuration')
    }

    return { apiKey, apiUrl }
}

const getCachedValue = <T>(cache: Map<string, CacheEntry<T>>, key: string): T | null => {
    const entry = cache.get(key)

    if (!entry) return null

    if (entry.expiresAt <= Date.now()) {
        cache.delete(key)
        return null
    }

    return entry.value
}

const setCachedValue = <T>(cache: Map<string, CacheEntry<T>>, key: string, value: T, ttlMs: number): T => {
    cache.set(key, {
        expiresAt: Date.now() + ttlMs,
        value,
    })

    return value
}

export const normalizeLocale = (locale?: string | null): string => {
    const normalizedLocale = locale?.trim().split(/[,_-]/)[0]?.toLowerCase()

    return normalizedLocale || DEFAULT_LOCALE
}

export const parseOptionalCoordinates = (
    lat?: string | null,
    lng?: string | null,
): { lat: number; lng: number } | null => {
    if (!lat || !lng) return null

    const coordinates = {
        lat: Number(lat),
        lng: Number(lng),
    }

    if (Number.isNaN(coordinates.lat) || Number.isNaN(coordinates.lng)) return null

    return coordinates
}

const fetchWithRetry = async (url: string, init?: RequestInit, attempts = 2): Promise<Response> => {
    let lastResponse: Response | null = null

    for (let attempt = 0; attempt < attempts; attempt += 1) {
        const res = await fetch(url, { ...init, cache: 'no-store', signal: init?.signal ?? AbortSignal.timeout(5000) })

        if (res.ok || res.status < 500 || attempt === attempts - 1) {
            return res
        }

        lastResponse = res
    }

    return lastResponse as Response
}

const getSearchItemKey = (item: SearchItem): string => {
    return `${item.coordinates.lat.toFixed(6)},${item.coordinates.lng.toFixed(6)}`
}

const mergeSearchItems = (primaryItems: SearchItem[], fallbackItems: SearchItem[], limit: number): SearchItem[] => {
    const itemsByKey = new Map<string, SearchItem>()

    for (const item of [...primaryItems, ...fallbackItems]) {
        const key = getSearchItemKey(item)
        if (!itemsByKey.has(key)) {
            itemsByKey.set(key, item)
        }
    }

    return Array.from(itemsByKey.values()).slice(0, limit)
}

const getAutocompleteCacheKey = (q: string, options: AutocompleteOptions, limit: number): string => {
    const countryCode = options.countryCode?.toLowerCase() || 'global'
    return [q.trim().toLowerCase(), countryCode, normalizeLocale(options.locale), limit].join('|')
}

const getReverseGeocodeCacheKey = (
    lat: number | string,
    lon: number | string,
    options: ReverseGeocodeOptions,
): string => {
    const coordinatePrecision = options.includeAddressDetails ? 2 : 6
    const roundedLat = Number(lat).toFixed(coordinatePrecision)
    const roundedLon = Number(lon).toFixed(coordinatePrecision)
    const addressDetails = options.includeAddressDetails ? 'details' : 'address'

    return [roundedLat, roundedLon, normalizeLocale(options.locale), addressDetails].join('|')
}

export const fetchAutocompleteItems = async (q: string, options: AutocompleteOptions = {}): Promise<SearchItem[]> => {
    const limit = options.limit || DEFAULT_LIMIT
    const cacheKey = getAutocompleteCacheKey(q, options, limit)
    const cachedItems = getCachedValue(autocompleteCache, cacheKey)

    if (cachedItems) return cachedItems

    const pendingRequest = pendingAutocompleteRequests.get(cacheKey)

    if (pendingRequest) return pendingRequest

    const request = fetchAutocompleteItemsFromLocationIQ(q, options, limit)
        .then(items => setCachedValue(autocompleteCache, cacheKey, items, AUTOCOMPLETE_CACHE_TTL_MS))
        .finally(() => {
            pendingAutocompleteRequests.delete(cacheKey)
        })

    pendingAutocompleteRequests.set(cacheKey, request)

    return request
}

const fetchAutocompleteItemsFromLocationIQ = async (
    q: string,
    options: AutocompleteOptions,
    limit: number,
): Promise<SearchItem[]> => {
    const { apiKey, apiUrl } = getLocationIQConfig()

    const params = new URLSearchParams({
        key: apiKey,
        q,
        limit: limit.toString(),
        format: 'json',
        'accept-language': normalizeLocale(options.locale),
    })

    if (options.countryCode) {
        params.set('countrycodes', options.countryCode.toLowerCase())
    }

    const res = await fetchWithRetry(`${apiUrl}/autocomplete.php?${params.toString()}`)

    if (!res.ok) {
        throw new Error(`LocationIQ autocomplete failed: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as LocationIQAutocompleteItem[]

    return data
        .map(item => {
            const lat = Number(item.lat)
            const lng = Number(item.lon)

            if (!item.display_name || Number.isNaN(lat) || Number.isNaN(lng)) {
                return null
            }

            return {
                title: item.display_place || item.display_name,
                description: item.display_name,
                coordinates: {
                    lat,
                    lng,
                },
            } satisfies SearchItem
        })
        .filter((item): item is SearchItem => item !== null)
}

export const fetchPreferredAutocompleteItems = async (
    q: string,
    options: AutocompleteOptions & { coordinates?: { lat: number; lng: number } | null } = {},
): Promise<SearchItem[]> => {
    const limit = options.limit || DEFAULT_LIMIT

    if (!options.coordinates) {
        return fetchAutocompleteItems(q, { limit, locale: options.locale })
    }

    try {
        const location = await fetchReverseGeocodeLocation(options.coordinates.lat, options.coordinates.lng, {
            includeAddressDetails: true,
            locale: options.locale,
        })

        if (!location.countryCode) {
            return fetchAutocompleteItems(q, { limit, locale: options.locale })
        }

        const localItems = await fetchAutocompleteItems(q, {
            countryCode: location.countryCode,
            limit,
            locale: options.locale,
        })

        if (localItems.length > 0) {
            return localItems.slice(0, limit)
        }

        const globalItems = await fetchAutocompleteItems(q, { limit, locale: options.locale })

        return mergeSearchItems(localItems, globalItems, limit)
    } catch (error) {
        console.error('Preferred autocomplete failed, falling back to global search:', error)
        return fetchAutocompleteItems(q, { limit, locale: options.locale })
    }
}

export const fetchReverseGeocodeLocation = async (
    lat: number | string,
    lon: number | string,
    options: ReverseGeocodeOptions = {},
): Promise<ReverseGeocodeLocation> => {
    const cacheKey = getReverseGeocodeCacheKey(lat, lon, options)
    const cachedLocation = getCachedValue(reverseGeocodeCache, cacheKey)

    if (cachedLocation) return cachedLocation

    const pendingRequest = pendingReverseGeocodeRequests.get(cacheKey)

    if (pendingRequest) return pendingRequest

    const request = fetchReverseGeocodeLocationFromLocationIQ(lat, lon, options)
        .then(location => setCachedValue(reverseGeocodeCache, cacheKey, location, REVERSE_GEOCODE_CACHE_TTL_MS))
        .finally(() => {
            pendingReverseGeocodeRequests.delete(cacheKey)
        })

    pendingReverseGeocodeRequests.set(cacheKey, request)

    return request
}

const fetchReverseGeocodeLocationFromLocationIQ = async (
    lat: number | string,
    lon: number | string,
    options: ReverseGeocodeOptions = {},
): Promise<ReverseGeocodeLocation> => {
    const { apiKey, apiUrl } = getLocationIQConfig()

    const params = new URLSearchParams({
        key: apiKey,
        lat: lat.toString(),
        lon: lon.toString(),
        normalizeaddress: '1',
        oceans: '1',
        format: 'json',
        'accept-language': normalizeLocale(options.locale),
    })

    if (options.includeAddressDetails) {
        params.set('addressdetails', '1')
    }

    const res = await fetchWithRetry(`${apiUrl}/reverse.php?${params.toString()}`)

    if (!res.ok) {
        throw new Error(`LocationIQ reverse geocode failed: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as LocationIQReverseGeocodeResponse

    return {
        address: data.display_name || null,
        countryCode: data.address?.country_code?.toLowerCase() || null,
    }
}

export const fetchReverseGeocodeAddress = async (
    lat: number | string,
    lon: number | string,
    options: ReverseGeocodeOptions = {},
): Promise<string | null> => {
    const location = await fetchReverseGeocodeLocation(lat, lon, options)

    return location.address
}
