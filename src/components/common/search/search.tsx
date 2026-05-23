'use client'

import { RefObject, useEffect, useMemo, useRef, useState } from 'react'

import { MapPinIcon } from 'lucide-react'
import useSWR from 'swr'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'

import { useRouter, useSearchParams } from 'next/navigation'

import { SearchInput } from '@/components/ui/search-input'
import { SearchItem } from '@/utils/types'

type SearchResponse = {
    items: SearchItem[]
    error?: string | null
}

const fetcher = async (url: string): Promise<SearchResponse> => {
    const res = await fetch(url)
    if (!res.ok) {
        const error = new Error('Failed to fetch')
        error.cause = res.status
        throw error
    }
    return res.json()
}

export const Search = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState('')
    const [selectedQuery, setSelectedQuery] = useState<string | null>(null)
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false)
    const [debouncedValue] = useDebounceValue(value, 500)
    const searchQuery = debouncedValue.trim()
    const searchApiUrl = useMemo(() => {
        if (selectedQuery === searchQuery) return null
        if (searchQuery.length < 2) return null

        const params = new URLSearchParams({ q: searchQuery })
        const lat = searchParams.get('lat')
        const lng = searchParams.get('lng')

        if (lat && lng) {
            params.set('lat', lat)
            params.set('lng', lng)
        }

        return `/api/search?${params.toString()}`
    }, [searchParams, searchQuery, selectedQuery])

    const ref = useRef<HTMLDivElement>(null)

    const { data, isLoading } = useSWR<SearchResponse>(
        searchApiUrl,
        fetcher,
        {
            dedupingInterval: 30_000,
            errorRetryCount: 1,
            errorRetryInterval: 700,
            keepPreviousData: true,
            onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
                if (error.cause === 429 || retryCount >= 1) return

                setTimeout(() => revalidate({ retryCount }), 700)
            },
        },
    )

    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsAutocompleteVisible(false)
    })

    useEffect(() => {
        if (data?.items?.length && selectedQuery !== searchQuery) {
            setIsAutocompleteVisible(true)
        } else {
            setIsAutocompleteVisible(false)
        }
    }, [data, searchQuery, selectedQuery])

    const handleSelectItem = (item: SearchItem) => {
        if (item.coordinates) {
            setSelectedQuery(searchQuery)
            setIsAutocompleteVisible(false)

            const { lat, lng } = item.coordinates
            const zoom = 15

            const currentParams = new URLSearchParams(searchParams.toString())
            currentParams.set('lat', lat.toString())
            currentParams.set('lng', lng.toString())
            currentParams.set('zoom', zoom.toString())

            router.replace(`/?${currentParams.toString()}`)
        }
    }

    const handleInputClear = () => {
        setValue('')
        setSelectedQuery(null)
        setIsAutocompleteVisible(false)
    }

    const handleInputChange = (nextValue: string) => {
        setValue(nextValue)
        setSelectedQuery(null)
    }

    const handleInputClick = () => {
        if (data?.items?.length && selectedQuery !== searchQuery) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div ref={ref} className="relative w-full">
            <SearchInput
                value={value}
                placeholder="Enter location or coordinates"
                isLoading={isLoading}
                onChange={handleInputChange}
                onClear={handleInputClear}
                onClick={handleInputClick}
            />

            {isAutocompleteVisible && (
                <div className="absolute top-full right-0 left-0 z-10 rounded-xl bg-white p-1 shadow-lg">
                    {data?.items.map((item, index) => (
                        <div
                            key={`search-item-${index}`}
                            className="flex cursor-pointer gap-x-2.5 rounded-md px-2 py-1 hover:bg-gray-50"
                            onClick={() => handleSelectItem(item)}
                        >
                            <MapPinIcon size={16} className="mt-0.5 w-4 shrink-0 text-gray-400" />

                            <div>
                                <div className="line-clamp-1 text-sm wrap-break-word">{item.title}</div>
                                <div className="line-clamp-2 text-xs wrap-break-word text-gray-400">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
