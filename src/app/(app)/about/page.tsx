import type { Metadata } from 'next'

import { About } from '@/components/features/about/about'
import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'About My Saved Places – Locations and Places Organizer',
    description:
        'Learn how My Saved Places helps you organize places and locations, keep favorite destinations in lists, and open them in your preferred navigation or map app.',
    pathname: '/about',
    keywords: [
        'places organizer',
        'locations organizer',
        'saved places app',
        'favorite places app',
        'organize locations',
        'organize favorite places',
        'location management app',
    ],
})

export default function AboutPage() {
    return <About />
}
