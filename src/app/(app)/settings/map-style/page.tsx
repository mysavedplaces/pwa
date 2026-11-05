import type { Metadata } from 'next'

import { SettingsMapStyle } from '@/components/features/settings/settings-map-style'
import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'Map Style',
    description: 'Choose the map style used in My Saved Places.',
    pathname: '/settings/map-style',
    index: false,
})

export default function SettingsMapStylePage() {
    return <SettingsMapStyle />
}
