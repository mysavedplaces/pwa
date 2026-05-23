import { NextResponse } from 'next/server'

import { fetchPreferredAutocompleteItems, parseOptionalCoordinates } from '../locationiq'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const q = searchParams.get('q')?.trim()
        const locale = searchParams.get('locale') || searchParams.get('lang')
        const coordinates = parseOptionalCoordinates(searchParams.get('lat'), searchParams.get('lng'))

        if (!q) {
            return NextResponse.json({ items: [], error: 'Missing query parameter "q"' }, { status: 400 })
        }

        if (q.length < 3) {
            return NextResponse.json({ items: [], error: null }, { status: 200 })
        }

        const items = await fetchPreferredAutocompleteItems(q, { coordinates, locale })

        return NextResponse.json(
            {
                items,
                error: null,
            },
            { status: 200 },
        )
    } catch (err) {
        console.error('Autocomplete error:', err)
        return NextResponse.json({ error: 'Unexpected error in autocomplete' }, { status: 500 })
    }
}
