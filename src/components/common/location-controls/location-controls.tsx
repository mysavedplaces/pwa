'use client'

import { useEffect, useMemo, useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { LocationActions } from '@/components/dialogs/location-actions/location-actions'
import { useOverlay } from '@/components/providers/overlay-provider'
import { AppIcon } from '@/components/ui/app-icon'
import { Tooltip } from '@/components/ui/tooltip'
import { EXTERNAL_APPS } from '@/utils/configs/external-apps'
import { MAX_SELECTED_APPS } from '@/utils/constants'
import { ExternalAppId } from '@/utils/enums'
import { getAppStorageData } from '@/utils/storage/app-storage'
import type { Coordinates, IExternalApp, IPlace } from '@/utils/types'

import { LocationEditButton } from './components/location-edit-button'
import { LocationSaveButton } from './components/location-save-button'

type LocationControlsProps = {
    coordinates: Coordinates
    snappedPlace: IPlace | null
    onPlacesChange: () => void
}

export const LocationControls = ({ coordinates, snappedPlace, onPlacesChange }: LocationControlsProps) => {
    const overlay = useOverlay()
    const router = useRouter()
    const [selectedAppIds, setSelectedAppIds] = useState<ExternalAppId[]>([])
    const [isAppsLoaded, setIsAppsLoaded] = useState(false)

    useEffect(() => {
        setSelectedAppIds(getAppStorageData().selectedAppIds)
        setIsAppsLoaded(true)
    }, [])

    const selectedApps = useMemo(
        () =>
            selectedAppIds
                .map(appId => EXTERNAL_APPS.find(app => app.id === appId) ?? null)
                .filter((app): app is IExternalApp => app !== null),
        [selectedAppIds],
    )

    const handleAppClick = (appId: ExternalAppId) => {
        overlay.open(<LocationActions appId={appId} coordinates={coordinates} />)
    }

    const handleOpenApps = () => {
        router.push('/settings/apps')
    }

    return (
        <div className="space-y-4">
            <div className="grid w-full grid-cols-4 gap-2">
                {selectedApps.map(app => (
                    <button
                        type="button"
                        key={app.id}
                        aria-label={`Open ${app.name}`}
                        className="flex h-20 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border border-transparent bg-orange-50 transition hover:border-orange-200 hover:bg-orange-100"
                        onClick={() => handleAppClick(app.id)}
                    >
                        <AppIcon app={app} size={32} />
                        <div className="text-xs font-bold">{app.shortName}</div>
                    </button>
                ))}

                {Array.from({ length: Math.max(0, MAX_SELECTED_APPS - selectedApps.length) }, (_, index) => (
                    <div key={`placeholder-${index}`} className="relative">
                        {isAppsLoaded && index === 0 && selectedApps.length === 0 && (
                            <Tooltip text="Choose favorite apps to open the pinned place" />
                        )}
                        <button
                            type="button"
                            className="flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100"
                            onClick={handleOpenApps}
                        >
                            <PlusIcon size={18} />
                            <span className="text-xs font-bold">Add app</span>
                        </button>
                    </div>
                ))}
            </div>
            {snappedPlace ? (
                <LocationEditButton snappedPlace={snappedPlace} onPlacesChange={onPlacesChange} />
            ) : (
                <LocationSaveButton coordinates={coordinates} onPlacesChange={onPlacesChange} />
            )}
        </div>
    )
}
