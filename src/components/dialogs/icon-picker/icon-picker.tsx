'use client'

import { IconPickerCancelButton } from './components/icon-picker-cancel-button'
import { IconPickerOptions } from './components/icon-picker-options'

import type { PlaceIconId } from '@/utils/types'

type IconPickerProps = {
    selectedIconId: PlaceIconId | null
    onCancel: () => void
    onSelect: (iconId: PlaceIconId | null) => void
}

export const IconPicker = ({ selectedIconId, onCancel, onSelect }: IconPickerProps) => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Choose icon</div>
                <div className="text-xs text-gray-500">Pick an optional icon for this location</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-1">
                <IconPickerOptions selectedIconId={selectedIconId} onSelect={onSelect} />
            </div>

            <IconPickerCancelButton onCancel={onCancel} />
        </div>
    )
}
