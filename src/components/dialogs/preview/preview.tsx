'use client'

import type { IPlace } from '@/utils/types'

import { PreviewArchiveButton } from './components/preview-archive-button'
import { PreviewCancelButton } from './components/preview-cancel-button'
import { PreviewEditButton } from './components/preview-edit-button'
import { PreviewQrButton } from './components/preview-qr-button'
import { PreviewShowOnMapButton } from './components/preview-show-on-map-button'

type PreviewProps = {
    place: IPlace
    onSuccess: () => void
}

export const Preview = ({ place, onSuccess }: PreviewProps) => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">{place.name}</div>
                <div className="text-xs text-gray-500">Choose an action</div>
            </div>

            <PreviewShowOnMapButton place={place} />
            <PreviewQrButton place={place} />
            <PreviewEditButton place={place} onSuccess={onSuccess} />
            <PreviewArchiveButton place={place} onSuccess={onSuccess} />
            <PreviewCancelButton />
        </div>
    )
}
