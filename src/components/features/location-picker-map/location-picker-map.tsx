'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { GeolocateControl, Layer, Map as ReactMapGl, NavigationControl, Source } from 'react-map-gl/maplibre'
import type { MapRef, ViewState } from 'react-map-gl/maplibre'

import { setWorkerUrl } from 'maplibre-gl'

import { useRouter, useSearchParams } from 'next/navigation'

import { OPEN_FREE_MAP_STYLE_URLS } from '@/utils/configs/map-styles'
import { DEFAULT_MAP_STYLE_ID } from '@/utils/constants'
import type { MapLocation } from '@/utils/location-query'
import { getAppStorageData } from '@/utils/storage/app-storage'
import type { Coordinates, IPlace, MapStyleId } from '@/utils/types'

import { LocationPickerMapPin } from './components/location-picker-map-pin'
import {
    createPlaceFeatureCollection,
    getClosestPlaceDistance as getClosestPlace,
    SNAP_DISTANCE_PX,
    SNAP_MIN_ZOOM,
} from './utils/location-picker-map-places'
import type { PlaceDistance } from './utils/location-picker-map-places'
import { resolveLocationPickerMapSurface } from './utils/location-picker-map-surface'
import type { LocationPickerMapSurfaceTheme, RenderedMapFeature } from './utils/location-picker-map-surface'

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
    places: IPlace[]
    onSnappedPlaceChange: (place: IPlace | null) => void
}

const areCoordinatesEqual = (first: Coordinates, second: Coordinates) =>
    Math.abs(first.lat - second.lat) <= 1e-6 && Math.abs(first.lng - second.lng) <= 1e-6

export const LocationPickerMap = ({ location, places, onSnappedPlaceChange }: LocationPickerMapProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mapRef = useRef<MapRef>(null)

    const [isMapMoving, setIsMapMoving] = useState(false)
    const [isMapReady, setIsMapReady] = useState(false)
    const [mapStyleId, setMapStyleId] = useState<MapStyleId>(DEFAULT_MAP_STYLE_ID)
    const [snappedPlace, setSnappedPlace] = useState<IPlace | null>(null)
    const [surfaceTheme, setSurfaceTheme] = useState<LocationPickerMapSurfaceTheme>('land')

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

    const placesGeoJSON = useMemo(() => createPlaceFeatureCollection(places), [places])

    useEffect(() => {
        setMapStyleId(getAppStorageData().mapStyleId)
    }, [])

    useEffect(() => {
        const map = mapRef.current

        if (!map) {
            return
        }

        const center = map.getCenter()
        const zoom = map.getZoom()
        const currentLocation = {
            coordinates: {
                lat: center.lat,
                lng: center.lng,
            },
            zoom,
        }

        if (!areCoordinatesEqual(currentLocation.coordinates, location.coordinates) || Math.abs(currentLocation.zoom - location.zoom) > 1e-6) {
            map.jumpTo({
                center: [location.coordinates.lng, location.coordinates.lat],
                zoom: location.zoom,
            })
        }
    }, [location])

    useEffect(() => {
        if (!isMapReady) {
            return
        }

        const map = mapRef.current?.getMap()

        if (!map) {
            return
        }

        map.setMissingStyleImageResolver(imageId => {
            if (!map.hasImage(imageId)) {
                map.addImage(imageId, transparentPixel)
            }
        })

        return () => {
            map.setMissingStyleImageResolver(null)
        }
    }, [isMapReady, mapStyleId])

    useEffect(() => {
        onSnappedPlaceChange(snappedPlace)
    }, [onSnappedPlaceChange, snappedPlace])

    const getClosestPlaceDistance = useCallback((): PlaceDistance | null => {
        const map = mapRef.current?.getMap()

        if (!map || places.length === 0) {
            return null
        }

        const center = map.project(map.getCenter())
        const placeDistances = places.map(place => {
            const point = map.project([place.coordinates.lng, place.coordinates.lat])

            return {
                place,
                distance: Math.hypot(point.x - center.x, point.y - center.y),
            }
        })

        return getClosestPlace(placeDistances)
    }, [places])

    const updateSurfaceTheme = useCallback((coordinates: Coordinates) => {
        const map = mapRef.current?.getMap()

        if (!map) {
            return
        }

        const canvas = map.getCanvas()
        let renderedFeatures: RenderedMapFeature[] = []

        try {
            renderedFeatures = map.queryRenderedFeatures([
                canvas.clientWidth / 2,
                canvas.clientHeight / 2,
            ]) as RenderedMapFeature[]
        } catch {
            renderedFeatures = []
        }

        const nextTheme = resolveLocationPickerMapSurface({
            coordinates,
            renderedFeatures,
        })

        setSurfaceTheme(currentTheme => (currentTheme === nextTheme ? currentTheme : nextTheme))
    }, [])

    const updateLocationQuery = useCallback(
        (coordinates: Coordinates, zoom: number) => {
            const params = new URLSearchParams(searchParams.toString())

            params.set('lat', parseFloat(coordinates.lat.toFixed(6)).toString())
            params.set('lng', parseFloat(coordinates.lng.toFixed(6)).toString())
            params.set('zoom', (Math.round(zoom * 10) / 10).toFixed(1))

            params.delete('name')

            if (params.toString() === searchParams.toString()) {
                return
            }

            router.replace(`?${params.toString()}`, { scroll: false })
        },
        [router, searchParams],
    )

    const syncMapState = useCallback(() => {
        const map = mapRef.current

        if (!map) {
            return
        }

        const zoom = map.getZoom()
        const center = map.getCenter()
        const currentCoordinates = {
            lat: center.lat,
            lng: center.lng,
        }
        const closestPlaceDistance = zoom >= SNAP_MIN_ZOOM ? getClosestPlaceDistance() : null
        const nextSnappedPlace =
            closestPlaceDistance && closestPlaceDistance.distance <= SNAP_DISTANCE_PX ? closestPlaceDistance.place : null
        const nextCoordinates = nextSnappedPlace?.coordinates ?? currentCoordinates

        if (nextSnappedPlace && !areCoordinatesEqual(currentCoordinates, nextSnappedPlace.coordinates)) {
            map.jumpTo({
                center: [nextSnappedPlace.coordinates.lng, nextSnappedPlace.coordinates.lat],
                zoom,
            })
        }

        setSnappedPlace(currentPlace => (currentPlace?.id === nextSnappedPlace?.id ? currentPlace : nextSnappedPlace))
        updateSurfaceTheme(nextCoordinates)
        updateLocationQuery(nextCoordinates, zoom)
    }, [getClosestPlaceDistance, updateLocationQuery, updateSurfaceTheme])

    useEffect(() => {
        if (isMapReady) {
            syncMapState()
        }
    }, [isMapReady, places, syncMapState])

    const handleMoveStart = useCallback(() => {
        setIsMapMoving(true)
        setSnappedPlace(null)
    }, [])

    const handleMoveEnd = useCallback(() => {
        setIsMapMoving(false)
        syncMapState()
    }, [syncMapState])

    const handleLoad = useCallback(() => {
        setIsMapReady(true)
    }, [])

    return (
        <div className="relative h-full overflow-hidden rounded-xl">
            <ReactMapGl
                ref={mapRef}
                id="locations-map"
                mapStyle={OPEN_FREE_MAP_STYLE_URLS[mapStyleId]}
                initialViewState={initialViewState}
                onLoad={handleLoad}
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

                <Source id="places-source" type="geojson" data={placesGeoJSON}>
                    <Layer
                        id="places-layer"
                        type="circle"
                        paint={{
                            'circle-radius': 6,
                            'circle-color': '#F97316',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF',
                        }}
                    />
                </Source>

                {snappedPlace && (
                    <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-45 -translate-x-1/2 translate-y-4 text-center">
                        <span className="inline-block max-w-full truncate rounded-full bg-white/88 px-2.5 py-1 text-xs leading-4 font-medium text-gray-800 shadow-sm">
                            {snappedPlace.name}
                        </span>
                    </div>
                )}

                <LocationPickerMapPin iconId={snappedPlace?.iconId} isMoving={isMapMoving} theme={surfaceTheme} />
            </ReactMapGl>
        </div>
    )
}
