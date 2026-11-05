'use client'

import { useEffect, useMemo, useState } from 'react'

import { SecondaryScreenViewHeader } from '@/components/common/secondary-screen-view/secondary-screen-view-header'
import { AppIcon } from '@/components/ui/app-icon'
import { EmptyMessage } from '@/components/ui/empty-message'
import { SelectableItem } from '@/components/ui/selectable-item'
import { SectionListHeader } from '@/components/ui/section-list-header'
import { EXTERNAL_APPS } from '@/utils/configs/external-apps'
import { MAX_SELECTED_APPS } from '@/utils/constants'
import { ExternalAppCategory } from '@/utils/enums'
import type { ExternalAppId } from '@/utils/enums'
import { getAppStorageData, setSelectedApps } from '@/utils/storage/app-storage'
import type { IExternalApp } from '@/utils/types'

type SettingsAppsSection = {
    title: string
    data: IExternalApp[]
}

const APP_SECTIONS = [
    {
        category: ExternalAppCategory.Navigator,
        title: 'Navigators',
    },
    {
        category: ExternalAppCategory.Map,
        title: 'Maps',
    },
    {
        category: ExternalAppCategory.PublicTransit,
        title: 'Public transit',
    },
    {
        category: ExternalAppCategory.Taxi,
        title: 'Taxi',
    },
] as const

export const SettingsApps = () => {
    const [selectedAppIds, setSelectedAppIds] = useState<ExternalAppId[]>([])

    useEffect(() => {
        setSelectedAppIds(getAppStorageData().selectedAppIds)
    }, [])

    const sections = useMemo<SettingsAppsSection[]>(
        () =>
            APP_SECTIONS.map(section => ({
                title: section.title,
                data: EXTERNAL_APPS.filter(app => app.category === section.category).sort((appA, appB) =>
                    appA.name.localeCompare(appB.name, undefined, { sensitivity: 'base' }),
                ),
            })).filter(section => section.data.length > 0),
        [],
    )

    const handleToggleSelectedApp = (appId: ExternalAppId) => {
        const isSelected = selectedAppIds.includes(appId)
        const nextSelectedAppIds = isSelected
            ? selectedAppIds.filter(id => id !== appId)
            : selectedAppIds.length >= MAX_SELECTED_APPS
              ? null
              : [...selectedAppIds, appId]

        if (!nextSelectedAppIds) {
            return
        }

        setSelectedApps(nextSelectedAppIds)
        setSelectedAppIds(nextSelectedAppIds)
    }

    return (
        <section className="min-h-full w-full space-y-8">
            <SecondaryScreenViewHeader
                title="Apps"
                rightSlot={
                    <span className="text-xs text-gray-500">
                        {selectedAppIds.length}/{MAX_SELECTED_APPS} selected
                    </span>
                }
            />

            <div className="space-y-8">
                {sections.map(section => (
                    <section key={section.title}>
                        <SectionListHeader title={section.title} />
                        <div className="space-y-2.5">
                            {section.data.map(app => {
                                const isSelected = selectedAppIds.includes(app.id)
                                const isDisabled = !isSelected && selectedAppIds.length >= MAX_SELECTED_APPS

                                return (
                                    <SelectableItem
                                        key={app.id}
                                        leading={<AppIcon app={app} size={32} />}
                                        title={app.name}
                                        isSelected={isSelected}
                                        isDisabled={isDisabled}
                                        onClick={() => handleToggleSelectedApp(app.id)}
                                    />
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>

            {sections.length === 0 && <EmptyMessage message="No apps available." />}

            <p className="pb-8 text-center text-xs text-gray-400">This list will expand over time.</p>
        </section>
    )
}
