import type { Metadata } from 'next'

import { SettingsApps } from '@/components/features/settings/settings-apps'
import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'Navigation Apps',
    description: 'Choose the navigation, map, public transit, and taxi apps for opening saved places.',
    pathname: '/settings/apps',
    index: false,
})

export default function SettingsAppsPage() {
    return <SettingsApps />
}
