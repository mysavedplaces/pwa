'use client'

import { AppIcon } from '@/components/ui/app-icon'
import { EXTERNAL_APPS } from '@/utils/configs/external-apps'
import { ExternalAppId } from '@/utils/enums'
import type { Coordinates } from '@/utils/types'

import { LocationActionsCancelButton } from './components/location-actions-cancel-button'
import { LocationActionsCopyButton } from './components/location-actions-copy-button'
import { LocationActionsOpenButton } from './components/location-actions-open-button'
import { LocationActionsQrButton } from './components/location-actions-qr-button'
import { LocationActionsShareButton } from './components/location-actions-share-button'

type LocationActionsProps = {
    appId: ExternalAppId
    coordinates: Coordinates
}

export const LocationActions = ({ appId, coordinates }: LocationActionsProps) => {
    const activeApp = EXTERNAL_APPS.find(app => app.id === appId)!
    const link = activeApp.buildWebLink(coordinates.lat, coordinates.lng)

    return (
        <div>
            <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4">
                <AppIcon app={activeApp} size={24} backgroundColor="#FFEDD5" />
                <div className="text-sm">
                    <div className="font-semibold">{activeApp.name}</div>
                    <div className="text-gray-500">Choose an action</div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <LocationActionsOpenButton link={link} />
                <LocationActionsQrButton appId={appId} link={link} />
                <LocationActionsCopyButton link={link} />
                <LocationActionsShareButton link={link} />
                <LocationActionsCancelButton />
            </div>
        </div>
    )
}
