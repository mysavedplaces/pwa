import { SearchType } from './enums'
import type { IList, IPlace } from './types'

export const detectSearchType = (value: string): SearchType => {
    const cleaned = normalizeCoordinatesInput(value)

    if (isValidDDCoordinates(cleaned)) return SearchType.DD
    if (isValidDMSCoordinates(cleaned)) return SearchType.DMS
    return SearchType.TEXT
}

export const isValidDDCoordinates = (value: string): boolean => {
    const reg = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s*,\s*|\s+)([-+]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?)$/
    return reg.test(value.trim())
}

export const isValidDMSCoordinates = (value: string): boolean => {
    const reg =
        /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[NS]\s*[,\s]\s*(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[EW]$/i
    return reg.test(value.trim())
}

export const convertDMStoDD = (dms: string): { lat: number; lng: number } | null => {
    const reg =
        /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*([NS])[\s,]+(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*([EW])$/i
    const match = dms.trim().match(reg)

    if (!match) return null

    const [, dLat, mLat, sLat, , dirLat, dLng, mLng, sLng, , dirLng] = match

    const convert = (deg: string, min: string, sec: string, dir: string): number => {
        let val = parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600
        if (dir === 'S' || dir === 'W') val *= -1
        return val
    }

    return {
        lat: convert(dLat, mLat, sLat, dirLat.toUpperCase()),
        lng: convert(dLng, mLng, sLng, dirLng.toUpperCase()),
    }
}

export const parseDDCoordinates = (value: string): { lat: number; lng: number } | null => {
    const cleaned = normalizeCoordinatesInput(value)

    if (!isValidDDCoordinates(cleaned)) return null

    const [latRaw, lngRaw] = cleaned.split(/[\s,]+/)
    const lat = parseFloat(latRaw)
    const lng = parseFloat(lngRaw)

    return { lat, lng }
}

export const normalizeCoordinatesInput = (value: string): string => {
    return value
        .trim()
        .replace(/^\(+|\)+$/g, '')
        .replace(/\s+/g, ' ')
}

export function generateDefaultName() {
    const now = new Date()

    const date = now.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const time = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    })

    return `${date} • ${time}`
}

export const getPlacesCountByListId = (places: IPlace[]) => {
    const counts: Record<number, number> = {}

    for (const { listId } of places) {
        if (listId === undefined) continue
        counts[listId] = (counts[listId] ?? 0) + 1
    }

    return counts
}

export const getListNamesById = (lists: IList[]) => {
    const names: Record<number, string> = {}

    for (const { id, name } of lists) {
        names[id] = name
    }

    return names
}

type ValidateListNameOptions = {
    currentListId?: number
}

export const validateListName = (name: string, lists: IList[], options?: ValidateListNameOptions) => {
    const trimmed = name.trim()

    if (!trimmed) {
        return 'List name cannot be empty'
    }

    const hasDuplicate = lists
        .filter(list => list.id !== options?.currentListId)
        .some(list => list.name.trim().toLowerCase() === trimmed.toLowerCase())

    return hasDuplicate ? 'A list with this name already exists' : null
}
