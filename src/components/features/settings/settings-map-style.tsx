'use client'

import { useEffect, useState } from 'react'

import { SecondaryScreenViewHeader } from '@/components/common/secondary-screen-view/secondary-screen-view-header'
import { ExternalLink } from '@/components/ui/external-link'
import { SelectableItem } from '@/components/ui/selectable-item'
import { MAP_STYLE_OPTIONS } from '@/utils/configs/map-styles'
import { DEFAULT_MAP_STYLE_ID } from '@/utils/constants'
import { getAppStorageData, setMapStyleId } from '@/utils/storage/app-storage'
import type { MapStyleId } from '@/utils/types'

export const SettingsMapStyle = () => {
    const [mapStyleId, setCurrentMapStyleId] = useState<MapStyleId>(DEFAULT_MAP_STYLE_ID)

    useEffect(() => {
        setCurrentMapStyleId(getAppStorageData().mapStyleId)
    }, [])

    const handleSelectMapStyle = (nextMapStyleId: MapStyleId) => {
        setMapStyleId(nextMapStyleId)
        setCurrentMapStyleId(nextMapStyleId)
    }

    return (
        <section className="min-h-full w-full space-y-6">
            <SecondaryScreenViewHeader title="Map style" />

            <div className="space-y-2.5">
                {MAP_STYLE_OPTIONS.map(option => {
                    const isSelected = mapStyleId === option.id

                    return (
                        <SelectableItem
                            key={option.id}
                            title={option.title}
                            subtitle={option.subtitle}
                            isSelected={isSelected}
                            onClick={() => handleSelectMapStyle(option.id)}
                        />
                    )
                })}
            </div>

            <div className="pb-8 text-center text-xs text-gray-400">
                <div>Map styles provided by</div>
                <ExternalLink href="https://openfreemap.org" className="text-blue-600 hover:underline">
                    OpenFreeMap
                </ExternalLink>
            </div>
        </section>
    )
}
