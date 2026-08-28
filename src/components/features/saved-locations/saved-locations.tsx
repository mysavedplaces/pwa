'use client'

import { useEffect, useMemo, useState } from 'react'

import { Divider } from '@/components/ui/divider'
import { SearchInput } from '@/components/ui/search-input'
import { getPlaces } from '@/utils/db'
import { Place } from '@/utils/types'

import { SavedLocationsItem } from './components/saved-locations-item'

export const SavedLocations = () => {
    const [places, setPlaces] = useState<Place[]>([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        setIsLoading(true)
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
        setIsLoading(false)
    }

    const { pinnedPlaces, regularPlaces } = useMemo(() => {
        let result = [...places]

        if (search.trim()) {
            result = result.filter(place => place.name.toLowerCase().includes(search.toLowerCase()))
        }

        const pinned = result.filter(place => place.pinned).sort((a, b) => (b.pinnedAt ?? 0) - (a.pinnedAt ?? 0))
        const regular = result.filter(place => !place.pinned).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

        return {
            pinnedPlaces: pinned,
            regularPlaces: regular,
        }
    }, [places, search])

    const handleClear = () => setSearch('')

    return (
        <section className="relative w-full space-y-6">
            {places.length > 0 ? (
                <>
                    <SearchInput
                        value={search}
                        placeholder="Search by name..."
                        variant="white"
                        isLoading={isLoading}
                        onChange={setSearch}
                        onClick={() => {}}
                        onClear={handleClear}
                    />

                    <div className="flex flex-col gap-y-6">
                        {pinnedPlaces.length > 0 && (
                            <div className="space-y-4">
                                <Divider label="Pinned places" />
                                <div className="space-y-2">
                                    {pinnedPlaces.map(place => (
                                        <SavedLocationsItem
                                            key={`place-${place.id}`}
                                            place={place}
                                            onLoadPlaces={loadPlaces}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {regularPlaces.length > 0 && (
                            <div className="space-y-4">
                                <Divider label="Other places" />
                                <div className="space-y-2">
                                    {regularPlaces.map(place => (
                                        <SavedLocationsItem
                                            key={`place-${place.id}`}
                                            place={place}
                                            onLoadPlaces={loadPlaces}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-sm text-gray-500">You have no saved locations yet.</div>
            )}

            {places.length > 0 && pinnedPlaces.length === 0 && regularPlaces.length === 0 && (
                <div className="text-sm text-gray-500">No locations match your search.</div>
            )}
        </section>
    )
}
