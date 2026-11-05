import { NextResponse } from 'next/server'

import type { Coordinates, SearchItem } from '@/utils/types'

import { fetchPreferredAutocompleteItems, fetchReverseGeocodeAddress } from '../locationiq'

export async function handleCoordinates(coordinates: Coordinates, locale?: string | null): Promise<NextResponse> {
    try {
        const address = await fetchReverseGeocodeAddress(coordinates.lat, coordinates.lng, { locale })

        const item: SearchItem = {
            title: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
            description: address || 'No address found',
            coordinates,
        }

        return NextResponse.json({ items: [item] })
    } catch (error) {
        console.error('handleCoordinates error:', error)
        return NextResponse.json({ items: [], error: 'Unexpected error occurred' }, { status: 500 })
    }
}

export const handleAutocomplete = async (
    q: string,
    options: { coordinates?: Coordinates | null; locale?: string | null } = {},
): Promise<NextResponse> => {
    try {
        const items = await fetchPreferredAutocompleteItems(q, {
            coordinates: options.coordinates,
            locale: options.locale,
        })
        return NextResponse.json({ items, error: null })
    } catch (error) {
        console.error('handleAutocomplete error:', error)
        return NextResponse.json({ items: [], error: 'Unexpected error occurred' }, { status: 500 })
    }
}
