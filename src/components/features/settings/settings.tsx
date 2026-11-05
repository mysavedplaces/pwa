'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { DevTools } from '@/components/dialogs/dev-tools/dev-tools'
import { UserGuide } from '@/components/dialogs/user-guide/user-guide'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { ChevronItem } from '@/components/ui/chevron-item'
import { MAP_STYLE_OPTIONS } from '@/utils/configs/map-styles'
import { DEFAULT_MAP_STYLE_ID } from '@/utils/constants'
import { getAppStorageData } from '@/utils/storage/app-storage'
import type { MapStyleId } from '@/utils/types'

const isDevelopment = process.env.NODE_ENV === 'development'

export const Settings = () => {
    const overlay = useOverlay()
    const router = useRouter()
    const [mapStyleId, setMapStyleId] = useState<MapStyleId>(DEFAULT_MAP_STYLE_ID)

    useEffect(() => {
        setMapStyleId(getAppStorageData().mapStyleId)
    }, [])

    const activeMapStyle = MAP_STYLE_OPTIONS.find(option => option.id === mapStyleId)

    const handleOpenDevTools = () => {
        overlay.open(<DevTools />)
    }

    const handleOpenUserGuide = () => {
        overlay.open(<UserGuide />)
    }

    const handleOpenApps = () => {
        router.push('/settings/apps')
    }

    const handleOpenMapStyle = () => {
        router.push('/settings/map-style')
    }

    return (
        <section className="min-h-full w-full space-y-6">
            <div className="flex flex-col gap-3 sm:items-start">
                {isDevelopment && (
                    <Button variant="minor" className="w-full" onClick={handleOpenDevTools}>
                        Dev tools
                    </Button>
                )}

                <Button variant="minor" className="w-full" onClick={handleOpenUserGuide}>
                    Quick guide
                </Button>

                <ChevronItem
                    title="Apps"
                    subtitle="Choose apps to open saved locations"
                    variant="muted"
                    onClick={handleOpenApps}
                />

                <ChevronItem
                    title="Map style"
                    subtitle={`Current style: ${activeMapStyle?.title ?? 'Positron'}`}
                    variant="muted"
                    onClick={handleOpenMapStyle}
                />
            </div>
        </section>
    )
}
