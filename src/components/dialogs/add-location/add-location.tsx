'use client'

import { AddList } from '@/components/dialogs/add-list/add-list'
import { IconPicker } from '@/components/dialogs/icon-picker/icon-picker'
import { ListPicker } from '@/components/dialogs/list-picker/list-picker'
import { useOverlay } from '@/components/providers/overlay-provider'
import type { Coordinates, PlaceIconId } from '@/utils/types'

import { AddLocationCancelButton } from './components/add-location-cancel-button'
import { AddLocationForm } from './components/add-location-form'

type AddLocationProps = {
    draftIconId?: PlaceIconId | null
    coordinates: Coordinates
    draftListId?: number | null
    draftName?: string
    onSuccess?: () => void
}

export const AddLocation = ({ coordinates, draftIconId = null, draftListId, draftName, onSuccess }: AddLocationProps) => {
    const overlay = useOverlay()

    const handleReopenAddLocation = (
        name: string,
        selectedIconId: PlaceIconId | null,
        selectedListId: number | null,
    ) => {
        overlay.open(
            <AddLocation
                coordinates={coordinates}
                draftIconId={selectedIconId}
                draftName={name}
                draftListId={selectedListId}
                onSuccess={onSuccess}
            />,
        )
    }

    const handleOpenAddList = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <AddList
                onCancel={() => handleOpenListPicker(name, selectedIconId, selectedListId)}
                onAdded={list => handleReopenAddLocation(name, selectedIconId, list.id)}
            />,
        )
    }

    const handleOpenListPicker = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <ListPicker
                selectedListId={selectedListId}
                onSelect={listId => handleReopenAddLocation(name, selectedIconId, listId)}
                onAddList={() => handleOpenAddList(name, selectedIconId, selectedListId)}
                onCancel={() => handleReopenAddLocation(name, selectedIconId, selectedListId)}
            />,
        )
    }

    const handleOpenIconPicker = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <IconPicker
                selectedIconId={selectedIconId}
                onSelect={iconId => handleReopenAddLocation(name, iconId, selectedListId)}
                onCancel={() => handleReopenAddLocation(name, selectedIconId, selectedListId)}
            />,
        )
    }

    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Save location</div>
                <div className="text-xs text-gray-500">Enter a name for this location</div>
            </div>

            <AddLocationForm
                coordinates={coordinates}
                draftIconId={draftIconId}
                draftListId={draftListId}
                draftName={draftName}
                onOpenIconPicker={handleOpenIconPicker}
                onOpenListPicker={handleOpenListPicker}
                onSuccess={onSuccess}
            />
            <AddLocationCancelButton />
        </div>
    )
}
