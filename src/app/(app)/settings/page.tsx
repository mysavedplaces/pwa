import type { Metadata } from 'next'

import { Settings } from '@/components/features/settings/settings'
import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'Settings',
    description: 'Manage My Saved Places preferences, navigation apps, and map style.',
    pathname: '/settings',
    index: false,
})

export default function SettingsPage() {
    return <Settings />
}
