'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { EmptyMessage } from '@/components/ui/empty-message'
import { getStorageData } from '@/utils/db'
import { addSearchHistory, getAppStorageData, removeSearchHistory } from '@/utils/storage/app-storage'
import type { Coordinates, IList, IPlace, SearchItem } from '@/utils/types'

import { getCoordinatesSearchItems } from '../utils/search-coordinates'
import { getRelevantSavedPlaces } from '../utils/search-saved-places'
import type { CoordinatesSearchItem, PlaceSearchItem, SearchHistoryItem as SearchHistorySectionItem, SearchSection } from '../utils/types'
import { SearchHistoryItem } from './search-history-item'
import { SearchInput } from './search-input'

const SEARCH_DEBOUNCE_MS = 400

type SearchItemsResult = {
    items: SearchItem[]
    isError: boolean
}

type SearchOverlayProps = {
    query: string
    value: string
    isVisible: boolean
    onClose: () => void
    onQueryChange: (value: string) => void
}

const getSectionItemKey = (item: SearchSection['data'][number], index: number) => {
    if ('query' in item) {
        return 'history-' + item.query
    }

    if ('id' in item) {
        return 'saved-' + item.id
    }

    return item.title + '-' + item.coordinates.lat + ',' + item.coordinates.lng + '-' + index
}

const getSearchItems = async (query: string, coordinates: Coordinates | null): Promise<SearchItemsResult> => {
    const params = new URLSearchParams({ q: query })

    if (coordinates) {
        params.set('lat', coordinates.lat.toString())
        params.set('lng', coordinates.lng.toString())
    }

    try {
        const response = await fetch('/api/search?' + params.toString())

        if (!response.ok) {
            return { items: [], isError: true }
        }

        const data = (await response.json()) as { items?: SearchItem[] }

        return { items: data.items ?? [], isError: false }
    } catch {
        return { items: [], isError: true }
    }
}

export const SearchOverlay = ({ query, value, isVisible, onClose, onQueryChange }: SearchOverlayProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const requestIdRef = useRef(0)

    const [places, setPlaces] = useState<IPlace[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [searchItems, setSearchItems] = useState<SearchItem[]>([])
    const [isSearchError, setIsSearchError] = useState(false)
    const [isSearchLoading, setIsSearchLoading] = useState(false)

    const coordinatesItems = useMemo(() => getCoordinatesSearchItems(query), [query])
    const savedPlaceItems = useMemo(() => getRelevantSavedPlaces(query, places, lists), [lists, places, query])

    useEffect(() => {
        if (!isVisible) {
            return
        }

        let isMounted = true

        const loadSearchData = async () => {
            const storageData = await getStorageData()

            if (!isMounted) {
                return
            }

            setPlaces(storageData.places)
            setLists(storageData.lists)
            setSearchHistory(getAppStorageData().searchHistory)
        }

        void loadSearchData()

        return () => {
            isMounted = false
        }
    }, [isVisible])

    useEffect(() => {
        if (!isVisible || query.length < 2 || coordinatesItems.length > 0) {
            requestIdRef.current += 1
            setSearchItems([])
            setIsSearchError(false)
            setIsSearchLoading(false)
            return
        }

        const requestId = requestIdRef.current + 1
        requestIdRef.current = requestId
        setSearchItems([])
        setIsSearchError(false)
        setIsSearchLoading(true)

        const contextCoordinates = {
            lat: Number(searchParams.get('lat')),
            lng: Number(searchParams.get('lng')),
        }
        const hasContextCoordinates = Number.isFinite(contextCoordinates.lat) && Number.isFinite(contextCoordinates.lng)
        const timeout = window.setTimeout(() => {
            getSearchItems(query, hasContextCoordinates ? contextCoordinates : null)
                .then(({ items, isError }) => {
                    if (requestIdRef.current === requestId) {
                        setSearchItems(items)
                        setIsSearchError(isError)
                    }
                })
                .finally(() => {
                    if (requestIdRef.current === requestId) {
                        setIsSearchLoading(false)
                    }
                })
        }, SEARCH_DEBOUNCE_MS)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [coordinatesItems.length, isVisible, query, searchParams])

    const sections = useMemo<SearchSection[]>(() => {
        if (coordinatesItems.length > 0) {
            return [
                {
                    title: 'Coordinates',
                    type: 'coordinates',
                    data: coordinatesItems,
                },
            ]
        }

        const nextSections: SearchSection[] = []

        if (query.length === 0 && searchHistory.length > 0) {
            nextSections.push({
                title: 'Recent searches',
                type: 'history',
                data: searchHistory.map(historyQuery => ({ query: historyQuery })),
            })
        }

        if (savedPlaceItems.length > 0) {
            nextSections.push({
                title: 'Saved places',
                type: 'saved',
                data: savedPlaceItems,
            })
        }

        if (searchItems.length > 0) {
            nextSections.push({
                title: 'Search results',
                type: 'results',
                data: searchItems,
            })
        }

        return nextSections
    }, [coordinatesItems, query.length, savedPlaceItems, searchHistory, searchItems])

    const handleShowOnMap = (coordinates: Coordinates) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('lat', coordinates.lat.toString())
        params.set('lng', coordinates.lng.toString())
        params.set('zoom', '15')

        router.replace('/?' + params.toString())
    }

    const handleSelectItem = (item: CoordinatesSearchItem | PlaceSearchItem | SearchItem) => {
        const nextSearchHistory = addSearchHistory(query)
        setSearchHistory(nextSearchHistory)
        handleShowOnMap(item.coordinates)
        onQueryChange('name' in item ? item.name : item.title)
        onClose()
    }

    const handleRemoveHistory = (historyQuery: string) => {
        setSearchHistory(removeSearchHistory(historyQuery))
    }

    if (!isVisible) {
        return null
    }

    return (
        <div className="fixed top-16 right-0 bottom-0 left-0 z-30 overflow-y-auto bg-white px-4 pt-4 pb-24 md:px-8">
            <div className="mx-auto max-w-250">
                <div className="pb-4">
                    <SearchInput
                        value={value}
                        isLoading={isSearchLoading}
                        onChange={onQueryChange}
                        onClear={() => onQueryChange('')}
                        onBack={onClose}
                    />
                </div>

                <div className="px-3">
                    {sections.length === 0 ? (
                        <EmptyMessage
                            message={
                                query.length === 0
                                    ? 'Start typing to search by coordinates, address, or saved place name.'
                                    : isSearchError
                                      ? 'Search is temporarily unavailable. Please try again.'
                                    : 'No locations found.'
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            {sections.map(section => (
                                <section key={section.type}>
                                    <div className="mt-3 mb-1.5 text-xs font-semibold text-gray-500">{section.title}</div>
                                    <div>
                                        {section.data.map((item, index) => {
                                            const key = getSectionItemKey(item, index)

                                            if (section.type === 'history') {
                                                const historyItem = item as SearchHistorySectionItem

                                                return (
                                                    <SearchHistoryItem
                                                        key={key}
                                                        query={historyItem.query}
                                                        onClick={() => onQueryChange(historyItem.query)}
                                                        onRemove={() => handleRemoveHistory(historyItem.query)}
                                                    />
                                                )
                                            }

                                            if (section.type === 'coordinates') {
                                                const coordinatesItem = item as CoordinatesSearchItem

                                                return (
                                                    <SearchResultItem
                                                        key={key}
                                                        title={coordinatesItem.title}
                                                        onClick={() => handleSelectItem(coordinatesItem)}
                                                    />
                                                )
                                            }

                                            if (section.type === 'saved') {
                                                const place = item as PlaceSearchItem

                                                return (
                                                    <SearchResultItem
                                                        key={key}
                                                        title={place.name}
                                                        description={place.listName}
                                                        onClick={() => handleSelectItem(place)}
                                                    />
                                                )
                                            }

                                            const searchItem = item as SearchItem

                                            return (
                                                <SearchResultItem
                                                    key={key}
                                                    title={searchItem.title}
                                                    description={searchItem.description}
                                                    onClick={() => handleSelectItem(searchItem)}
                                                />
                                            )
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

type SearchResultItemProps = {
    title: string
    description?: string
    onClick: () => void
}

const SearchResultItem = ({ title, description, onClick }: SearchResultItemProps) => {
    return (
        <button type="button" className="w-full cursor-pointer rounded-xl px-3 py-2 text-left hover:bg-gray-50" onClick={onClick}>
            <span className="block text-sm font-semibold">{title}</span>
            {description && <span className="block text-xs text-gray-500">{description}</span>}
        </button>
    )
}
