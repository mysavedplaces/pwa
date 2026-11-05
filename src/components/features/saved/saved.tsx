'use client'

import { useDeferredValue, useEffect, useState } from 'react'

import { EmptyMessage } from '@/components/ui/empty-message'
import { SearchInput } from '@/components/ui/search-input'
import { getStorageData } from '@/utils/db'
import type { IList, IPlace } from '@/utils/types'

import { SavedFeed } from './saved-feed'
import { SavedSearch } from './saved-search'

export const Saved = () => {
    const [places, setPlaces] = useState<IPlace[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    const deferredSearchTerm = useDeferredValue(normalizedSearchTerm)

    const loadPlaces = async () => {
        setIsLoading(true)

        try {
            const data = await getStorageData()
            setPlaces(data.places)
            setLists(data.lists)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        void loadPlaces()
    }, [])

    if (places.length === 0 && lists.length === 0) {
        return <EmptyMessage message="You have no saved locations yet. Move the map pin to a place, then tap Save location." />
    }

    return (
        <section className="min-h-full w-full space-y-4">
            <SearchInput
                value={searchTerm}
                placeholder="Search places and lists..."
                variant="white"
                isLoading={isLoading}
                onChange={setSearchTerm}
                onClick={() => {}}
                onClear={() => setSearchTerm('')}
            />

            {normalizedSearchTerm ? (
                <SavedSearch
                    searchTerm={deferredSearchTerm}
                    lists={lists}
                    places={places}
                    onLoadPlaces={loadPlaces}
                />
            ) : (
                <SavedFeed lists={lists} places={places} onLoadPlaces={loadPlaces} />
            )}
        </section>
    )
}
