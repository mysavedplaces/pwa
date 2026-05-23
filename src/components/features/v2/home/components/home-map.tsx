'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GeolocateControl, MapRef, NavigationControl, Map as ReactMapGl, ViewState } from 'react-map-gl/maplibre'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { DEFAULT_MAP_LOCATION, isValidZoomParam, parseLocationQuery } from '@/utils/location-query'

export const HomeMap = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mapRef = useRef<MapRef>(null)

    const location = useMemo(() => parseLocationQuery(searchParams) ?? DEFAULT_MAP_LOCATION, [searchParams])

    const [isMapMoving, setIsMapMoving] = useState(false)

    const [initialViewState] = useState<ViewState>({
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        zoom: location.zoom,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    useEffect(() => {
        const parsedLocation = parseLocationQuery(searchParams)
        const hasValidLocation = Boolean(parsedLocation)
        const hasValidZoom = isValidZoomParam(searchParams.get('zoom'))

        if (hasValidLocation && hasValidZoom) return

        const params = new URLSearchParams(searchParams.toString())

        if (!parsedLocation) {
            params.set('lat', DEFAULT_MAP_LOCATION.coordinates.lat.toString())
            params.set('lng', DEFAULT_MAP_LOCATION.coordinates.lng.toFixed(5))
            params.set('zoom', DEFAULT_MAP_LOCATION.zoom.toString())
        } else {
            params.set('zoom', parsedLocation.zoom.toString())
        }

        router.replace(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const handleMoveStart = useCallback(() => {
        setIsMapMoving(true)
    }, [])

    const handleMoveEnd = useCallback(() => {
        setIsMapMoving(false)

        const map = mapRef.current
        if (!map) return

        const center = map.getCenter()
        const zoom = map.getZoom()

        if (isNaN(center.lat) || isNaN(center.lng) || isNaN(zoom)) return

        const roundedZoom = Math.round(zoom * 10) / 10
        const roundedLat = parseFloat(center.lat.toFixed(6))
        const roundedLng = parseFloat(center.lng.toFixed(6))

        const params = new URLSearchParams(searchParams.toString())
        params.set('lat', roundedLat.toString())
        params.set('lng', roundedLng.toString())
        params.set('zoom', roundedZoom.toFixed(1))

        router.replace(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    return (
        <div className="h-full w-full overflow-hidden">
            <ReactMapGl
                ref={mapRef}
                id="locations-map"
                mapStyle="https://tiles.openfreemap.org/styles/bright"
                initialViewState={initialViewState}
                onMoveStart={handleMoveStart}
                onMoveEnd={handleMoveEnd}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={false}
                    fitBoundsOptions={{ duration: 0 }}
                />

                <NavigationControl />

                <Image
                    src="/images/pin-shadow.svg"
                    width={27}
                    height={41}
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-1/2 translate-x-[-13.5px] -translate-y-9"
                />

                <Image
                    src="/images/pin.svg"
                    width={27}
                    height={41}
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-1/2 translate-x-[-13.5px] -translate-y-9"
                    style={{ marginTop: isMapMoving ? -8 : 0 }}
                />
            </ReactMapGl>
        </div>
    )
}
