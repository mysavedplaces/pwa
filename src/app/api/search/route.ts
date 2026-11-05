import { NextResponse } from 'next/server'

import { SearchType } from '@/utils/enums'
import { convertDMStoDD, detectSearchType, parseDDCoordinates } from '@/utils/helpers'

import { parseOptionalCoordinates } from '../locationiq'
import { handleAutocomplete, handleCoordinates } from './helpers'

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')?.trim()
    const locale = searchParams.get('locale') || searchParams.get('lang')
    const contextCoordinates = parseOptionalCoordinates(searchParams.get('lat'), searchParams.get('lng'))

    if (!q) {
        return NextResponse.json({ items: [], error: 'Missing query parameter "q"' }, { status: 400 })
    }

    const searchType = detectSearchType(q)

    switch (searchType) {
        case SearchType.DD: {
            const coordinates = parseDDCoordinates(q)
            if (coordinates) return handleCoordinates(coordinates, locale)
            break
        }
        case SearchType.DMS: {
            const coordinates = convertDMStoDD(q)
            if (coordinates) return handleCoordinates(coordinates, locale)
            break
        }

        default:
            if (q.length >= 2) {
                return handleAutocomplete(q, { coordinates: contextCoordinates, locale })
            }
            break
    }

    return NextResponse.json({ items: [] })
}
