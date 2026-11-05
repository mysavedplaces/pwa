'use client'

import { AddList } from '@/components/dialogs/add-list/add-list'
import { IconPicker } from '@/components/dialogs/icon-picker/icon-picker'
import { ListPicker } from '@/components/dialogs/list-picker/list-picker'
import { useOverlay } from '@/components/providers/overlay-provider'
import type { IPlace, PlaceIconId } from '@/utils/types'

import { EditLocationCancelButton } from './components/edit-location-cancel-button'
import { EditLocationDeleteButton } from './components/edit-location-delete-button'
import { EditLocationForm } from './components/edit-location-form'

type EditLocationProps = {
    draftIconId?: PlaceIconId | null
    draftListId?: number | null
    draftName?: string
    place: IPlace
    onSuccess: () => void
}

export const EditLocation = ({ draftIconId, draftListId, draftName, place, onSuccess }: EditLocationProps) => {
    const overlay = useOverlay()

    const handleReopenEditLocation = (
        name: string,
        selectedIconId: PlaceIconId | null,
        selectedListId: number | null,
    ) => {
        overlay.open(
            <EditLocation
                draftIconId={selectedIconId}
                draftListId={selectedListId}
                draftName={name}
                place={place}
                onSuccess={onSuccess}
            />,
        )
    }

    const handleOpenAddList = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <AddList
                onCancel={() => handleOpenListPicker(name, selectedIconId, selectedListId)}
                onAdded={list => handleReopenEditLocation(name, selectedIconId, list.id)}
            />,
        )
    }

    const handleOpenListPicker = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <ListPicker
                selectedListId={selectedListId}
                onSelect={listId => handleReopenEditLocation(name, selectedIconId, listId)}
                onAddList={() => handleOpenAddList(name, selectedIconId, selectedListId)}
                onCancel={() => handleReopenEditLocation(name, selectedIconId, selectedListId)}
            />,
        )
    }

    const handleOpenIconPicker = (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => {
        overlay.open(
            <IconPicker
                selectedIconId={selectedIconId}
                onSelect={iconId => handleReopenEditLocation(name, iconId, selectedListId)}
                onCancel={() => handleReopenEditLocation(name, selectedIconId, selectedListId)}
            />,
        )
    }

    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Edit location</div>
                <div className="text-xs text-gray-500">Update the name or delete this location</div>
            </div>

            <EditLocationForm
                draftListId={draftListId}
                draftName={draftName}
                draftIconId={draftIconId}
                place={place}
                onSuccess={onSuccess}
                onOpenIconPicker={handleOpenIconPicker}
                onOpenListPicker={handleOpenListPicker}
            />
            <EditLocationDeleteButton place={place} onSuccess={onSuccess} />
            <EditLocationCancelButton place={place} onSuccess={onSuccess} />
        </div>
    )
}
