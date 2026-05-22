'use client'

import { useEffect, useMemo } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationControls } from '@/components/common/location-controls/location-controls'
import { Search } from '@/components/common/search/search'
import { DEFAULT_MAP_LOCATION, parseLocationQuery, isValidZoomParam } from '@/utils/location-query'

import { LocationPickerMap } from './components/location-picker-map'

export const LocationPicker = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const location = useMemo(() => parseLocationQuery(searchParams) ?? DEFAULT_MAP_LOCATION, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const parsedLocation = parseLocationQuery(searchParams)

        if (!parsedLocation) {
            params.set('lat', DEFAULT_MAP_LOCATION.coordinates.lat.toString())
            params.set('lng', DEFAULT_MAP_LOCATION.coordinates.lng.toFixed(5))
            params.set('zoom', DEFAULT_MAP_LOCATION.zoom.toString())

            router.replace(`?${params.toString()}`, { scroll: false })

            return
        }

        if (!isValidZoomParam(searchParams.get('zoom'))) {
            params.set('zoom', parsedLocation.zoom.toString())

            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [searchParams, router])

    return (
        <section className="flex w-full flex-col gap-y-4">
            <div className="flex-0">
                <Search />
            </div>
            <div className="flex-1">
                <LocationPickerMap location={location} />
            </div>
            <div className="flex-0">
                <LocationControls coordinates={location.coordinates} />
            </div>
        </section>
    )
}
