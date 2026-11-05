'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationControls } from '@/components/common/location-controls/location-controls'
import { AddLocation } from '@/components/dialogs/add-location/add-location'
import { LocationPickerMap } from '@/components/features/location-picker-map/location-picker-map'
import { Search } from '@/components/features/search/search'
import { UserGuide } from '@/components/dialogs/user-guide/user-guide'
import { useOverlay } from '@/components/providers/overlay-provider'
import { PLACE_ICONS } from '@/utils/configs/place-icons'
import { getPlaces } from '@/utils/db'
import { DEFAULT_MAP_LOCATION, isValidZoomParam, parseLocationQuery } from '@/utils/location-query'
import { parsePlaceShareParams } from '@/utils/place-share'
import type { IPlace } from '@/utils/types'
import type { PlaceIconId } from '@/utils/types'
import { getHasSeenUserGuide, markUserGuideSeen } from '@/utils/user-guide'

export const LocationPicker = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const overlay = useOverlay()
    const hasRequestedGuide = useRef(false)
    const [places, setPlaces] = useState<IPlace[]>([])
    const [snappedPlace, setSnappedPlace] = useState<IPlace | null>(null)

    const location = useMemo(() => parseLocationQuery(searchParams) ?? DEFAULT_MAP_LOCATION, [searchParams])
    const loadPlaces = useCallback(async () => {
        setPlaces(await getPlaces())
    }, [])

    useEffect(() => {
        const sharedPlace = parsePlaceShareParams({
            v: searchParams.get('v') ?? undefined,
            lat: searchParams.get('lat') ?? undefined,
            lng: searchParams.get('lng') ?? undefined,
            name: searchParams.get('name') ?? undefined,
            icon: searchParams.get('icon') ?? undefined,
        })

        if (!sharedPlace) {
            return
        }

        const iconId = PLACE_ICONS.some(icon => icon.id === sharedPlace.iconId)
            ? (sharedPlace.iconId as PlaceIconId)
            : null

        hasRequestedGuide.current = true

        const params = new URLSearchParams(searchParams.toString())
        params.set('lat', String(sharedPlace.coordinates.lat))
        params.set('lng', String(sharedPlace.coordinates.lng))
        params.set('zoom', '15')
        params.delete('v')
        params.delete('name')
        params.delete('icon')

        overlay.open(
            <AddLocation
                coordinates={sharedPlace.coordinates}
                draftName={sharedPlace.name || undefined}
                draftIconId={iconId}
                onSuccess={loadPlaces}
            />,
        )
        router.replace(`/?${params.toString()}`, { scroll: false })
    }, [loadPlaces, overlay, router, searchParams])

    useEffect(() => {
        void loadPlaces()
    }, [loadPlaces])

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

    useEffect(() => {
        if (hasRequestedGuide.current || getHasSeenUserGuide()) {
            return
        }

        hasRequestedGuide.current = true
        markUserGuideSeen()
        overlay.open(<UserGuide />)
    }, [overlay, searchParams])

    return (
        <section className="flex h-full w-full flex-col gap-y-4">
            <div className="flex-0">
                <Search />
            </div>
            <div className="flex-1">
                <LocationPickerMap location={location} places={places} onSnappedPlaceChange={setSnappedPlace} />
            </div>
            <div className="flex-0">
                <LocationControls coordinates={location.coordinates} snappedPlace={snappedPlace} onPlacesChange={loadPlaces} />
            </div>
        </section>
    )
}
