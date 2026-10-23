import type { Metadata } from 'next'

import { PlaceShare } from '@/components/features/place-share/place-share'
import { parsePlaceShareParams } from '@/utils/place-share'

type SharePageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
    title: 'Shared place | My Saved Places',
    description: 'Open a shared place in My Saved Places.',
    robots: { index: false, follow: false },
    referrer: 'no-referrer',
}

export default async function SharePage({ searchParams }: SharePageProps) {
    const place = parsePlaceShareParams(await searchParams)

    return <PlaceShare place={place} />
}
