'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GeolocateControl, MapRef, NavigationControl, Map as ReactMapGl, ViewState } from 'react-map-gl/maplibre'

import { setWorkerUrl } from 'maplibre-gl'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import type { MapLocation } from '@/utils/location-query'

import 'maplibre-gl/dist/maplibre-gl.css'

// MapLibre GL JS 6.x requires an explicit worker URL when bundled.
setWorkerUrl('/maplibre-gl-worker.mjs')

const transparentPixel = {
    width: 1,
    height: 1,
    data: new Uint8Array([0, 0, 0, 0]),
}

type LocationPickerMapProps = {
    location: MapLocation
}

export const LocationPickerMap = ({ location }: LocationPickerMapProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mapRef = useRef<MapRef>(null)

    const [isMapMoving, setIsMapMoving] = useState(false)

    const [initialViewState] = useState<ViewState>({
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        zoom: location.zoom,
        bearing: 0,
        pitch: 0,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    })

    useEffect(() => {
        const map = mapRef.current

        if (!map) return

        const center = map.getCenter()
        const zoom = map.getZoom()

        const roundedLat = parseFloat(center.lat.toFixed(6))
        const roundedLng = parseFloat(center.lng.toFixed(6))
        const roundedZoom = Math.round(zoom * 10) / 10

        const latChanged = Math.abs(roundedLat - location.coordinates.lat) > 1e-6
        const lngChanged = Math.abs(roundedLng - location.coordinates.lng) > 1e-6
        const zoomChanged = Math.abs(roundedZoom - location.zoom) > 1e-6

        if (latChanged || lngChanged || zoomChanged) {
            map.jumpTo({
                center: [location.coordinates.lng, location.coordinates.lat],
                zoom: location.zoom,
            })
        }
    }, [location])

    useEffect(() => {
        const map = mapRef.current?.getMap()

        if (!map) return

        const handleStyleImageMissing = (event: { id: string }) => {
            if (!map.hasImage(event.id)) {
                map.addImage(event.id, transparentPixel)
            }
        }

        map.on('styleimagemissing', handleStyleImageMissing)

        return () => {
            map.off('styleimagemissing', handleStyleImageMissing)
        }
    }, [initialViewState])

    const handleMoveStart = useCallback(() => {
        setIsMapMoving(true)
    }, [])

    const handleMoveEnd = useCallback(() => {
        setIsMapMoving(false)

        const map = mapRef.current

        if (!map) return

        const center = map.getCenter()
        const zoom = map.getZoom()

        if (isNaN(center.lat) || isNaN(center.lng) || isNaN(zoom)) {
            return
        }

        const roundedZoom = Math.round(zoom * 10) / 10
        const roundedLat = parseFloat(center.lat.toFixed(6))
        const roundedLng = parseFloat(center.lng.toFixed(6))

        const params = new URLSearchParams(searchParams.toString())

        params.set('lat', roundedLat.toString())
        params.set('lng', roundedLng.toString())
        params.set('zoom', roundedZoom.toFixed(1))

        router.replace(`?${params.toString()}`, {
            scroll: false,
        })
    }, [searchParams, router])

    return (
        <div className="over h-full overflow-hidden rounded-xl">
            <ReactMapGl
                ref={mapRef}
                id="locations-map"
                mapStyle="https://tiles.openfreemap.org/styles/bright"
                initialViewState={initialViewState}
                onMoveStart={handleMoveStart}
                onMoveEnd={handleMoveEnd}
            >
                <GeolocateControl
                    positionOptions={{
                        enableHighAccuracy: true,
                    }}
                    trackUserLocation={false}
                    fitBoundsOptions={{
                        duration: 0,
                    }}
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
                    style={{
                        marginTop: isMapMoving ? -8 : 0,
                    }}
                />
            </ReactMapGl>
        </div>
    )
}
