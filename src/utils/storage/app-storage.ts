import { SUPPORTED_EXTERNAL_APP_IDS } from '@/utils/configs/external-apps'
import { OPEN_FREE_MAP_STYLE_URLS } from '@/utils/configs/map-styles'
import { DEFAULT_MAP_STYLE_ID, MAX_SEARCH_HISTORY_ITEMS, MAX_SELECTED_APPS } from '@/utils/constants'
import type { ExternalAppId } from '@/utils/enums'
import type { AppStorageSchema, MapStyleId } from '@/utils/types'

const STORAGE_KEY = '@app-preferences'

const createEmptyAppStorage = (): AppStorageSchema => {
    return {
        mapStyleId: DEFAULT_MAP_STYLE_ID,
        selectedAppIds: [],
        searchHistory: [],
    }
}

const normalizeMapStyleId = (mapStyleId: unknown): MapStyleId => {
    if (typeof mapStyleId === 'string' && Object.hasOwn(OPEN_FREE_MAP_STYLE_URLS, mapStyleId)) {
        return mapStyleId as MapStyleId
    }

    return DEFAULT_MAP_STYLE_ID
}

const normalizeSelectedAppIds = (selectedAppIds: unknown): ExternalAppId[] => {
    if (!Array.isArray(selectedAppIds)) {
        return []
    }

    return selectedAppIds
        .filter(
            (appId): appId is ExternalAppId =>
                typeof appId === 'string' && SUPPORTED_EXTERNAL_APP_IDS.has(appId as ExternalAppId),
        )
        .slice(0, MAX_SELECTED_APPS)
}

const normalizeSearchQuery = (query: string): string => {
    return query.trim().replace(/\s+/g, ' ')
}

const normalizeSearchHistory = (searchHistory: unknown): string[] => {
    if (!Array.isArray(searchHistory)) {
        return []
    }

    const normalizedItems: string[] = []

    searchHistory.forEach(query => {
        if (typeof query !== 'string') {
            return
        }

        const normalizedQuery = normalizeSearchQuery(query)
        const isDuplicate = normalizedItems.some(item => item.toLowerCase() === normalizedQuery.toLowerCase())

        if (normalizedQuery.length >= 2 && !isDuplicate) {
            normalizedItems.push(normalizedQuery)
        }
    })

    return normalizedItems.slice(0, MAX_SEARCH_HISTORY_ITEMS)
}

export const getAppStorageData = (): AppStorageSchema => {
    if (typeof window === 'undefined') {
        return createEmptyAppStorage()
    }

    try {
        const data = window.localStorage.getItem(STORAGE_KEY)
        const storage = data ? { ...createEmptyAppStorage(), ...(JSON.parse(data) as AppStorageSchema) } : createEmptyAppStorage()

        return {
            ...storage,
            mapStyleId: normalizeMapStyleId(storage.mapStyleId),
            selectedAppIds: normalizeSelectedAppIds(storage.selectedAppIds),
            searchHistory: normalizeSearchHistory(storage.searchHistory),
        }
    } catch (error) {
        console.error('Failed to read app storage', error)
        return createEmptyAppStorage()
    }
}

export const setSelectedApps = (selectedAppIds: ExternalAppId[]): void => {
    if (typeof window === 'undefined') {
        return
    }

    const storage = getAppStorageData()

    try {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                ...storage,
                selectedAppIds: normalizeSelectedAppIds(selectedAppIds),
            }),
        )
    } catch (error) {
        console.error('Failed to save selected apps', error)
    }
}

export const setMapStyleId = (mapStyleId: MapStyleId): void => {
    if (typeof window === 'undefined') {
        return
    }

    const storage = getAppStorageData()

    try {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                ...storage,
                mapStyleId: normalizeMapStyleId(mapStyleId),
            }),
        )
    } catch (error) {
        console.error('Failed to save map style', error)
    }
}

export const addSearchHistory = (query: string): string[] => {
    const normalizedQuery = normalizeSearchQuery(query)
    const storage = getAppStorageData()

    if (normalizedQuery.length < 2) {
        return storage.searchHistory
    }

    const searchHistory = normalizeSearchHistory([
        normalizedQuery,
        ...storage.searchHistory.filter(item => item.toLowerCase() !== normalizedQuery.toLowerCase()),
    ])

    saveSearchHistory(searchHistory)

    return searchHistory
}

export const removeSearchHistory = (query: string): string[] => {
    const normalizedQuery = normalizeSearchQuery(query)
    const storage = getAppStorageData()
    const searchHistory = storage.searchHistory.filter(item => item.toLowerCase() !== normalizedQuery.toLowerCase())

    saveSearchHistory(searchHistory)

    return searchHistory
}

const saveSearchHistory = (searchHistory: string[]): void => {
    if (typeof window === 'undefined') {
        return
    }

    const storage = getAppStorageData()

    try {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                ...storage,
                searchHistory: normalizeSearchHistory(searchHistory),
            }),
        )
    } catch (error) {
        console.error('Failed to save search history', error)
    }
}
