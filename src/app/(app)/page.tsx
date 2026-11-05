import type { Metadata } from 'next'

import { Home } from '@/components/features/home/home'
import { APP_DESCRIPTION, createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'My Saved Places – Locations and Places Organizer',
    description: APP_DESCRIPTION,
    pathname: '/',
    keywords: [
        'my saved places',
        'places organizer',
        'locations organizer',
        'locations organizer',
        'saved places organizer',
        'favorite places organizer',
        'location manager',
        'map bookmarks',
        'save favorite places',
        'organize saved locations',
        'save locations app',
        'My Saved Places',
        'open saved places in Google Maps',
        'open saved places in Apple Maps',
        'open saved places in Waze',
        'open saved places in Yandex Maps',
        'coordinates organizer',
    ],
})

export default function HomePage() {
    return <Home />
}
