import type { Metadata } from 'next'

import { Saved } from '@/components/features/saved/saved'
import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'Saved Places',
    description: 'View and organize your saved places, favorite locations, lists, and trips.',
    pathname: '/saved',
    index: false,
})

export default function SavedLocationsPage() {
    return <Saved />
}
