'use client'

import { useEffect, useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlaceIcon } from '@/components/ui/place-icon'
import { Select } from '@/components/ui/select'
import { getLists, updatePlace } from '@/utils/db'
import { getPlaceIconName } from '@/utils/configs/place-icons'
import type { IList, IPlace, PlaceIconId } from '@/utils/types'

type EditLocationFormProps = {
    draftIconId?: PlaceIconId | null
    draftListId?: number | null
    draftName?: string
    place: IPlace
    onSuccess: () => void
    onOpenIconPicker: (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => void
    onOpenListPicker: (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => void
}

export const EditLocationForm = ({
    draftIconId,
    draftListId,
    draftName,
    place,
    onSuccess,
    onOpenIconPicker,
    onOpenListPicker,
}: EditLocationFormProps) => {
    const overlay = useOverlay()

    const [name, setName] = useState(draftName ?? place.name)
    const [lists, setLists] = useState<IList[]>([])
    const [selectedIconId] = useState<PlaceIconId | null>(
        draftIconId === undefined ? (place.iconId ?? null) : draftIconId,
    )
    const [selectedListId] = useState<number | null>(draftListId === undefined ? (place.listId ?? null) : draftListId)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadLists()
    }, [])

    const loadLists = async () => {
        const savedLists = await getLists()
        setLists(savedLists)
    }

    const selectedListName = lists.find(list => list.id === selectedListId)?.name ?? 'No list'
    const selectedIconName = selectedIconId ? getPlaceIconName(selectedIconId) : 'No icon'

    const handleClick = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            const { iconId: _iconId, listId: _listId, ...placeWithoutSelections } = place

            await updatePlace({
                ...placeWithoutSelections,
                name: trimmed,
                ...(selectedIconId === null ? {} : { iconId: selectedIconId }),
                ...(selectedListId === null ? {} : { listId: selectedListId }),
            })
            onSuccess()
            overlay.showSuccess({
                title: 'Location updated',
                message: 'Your changes have been saved',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to update location',
                message: 'Please try again',
            })
        }
    }

    return (
        <div className="space-y-4">
            <Input
                value={name}
                error={error}
                placeholder="Location name"
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <Select
                label="Icon"
                value={selectedIconName}
                leading={
                    selectedIconId ? <PlaceIcon iconId={selectedIconId} size={20} backgroundColor="#FFEDD5" /> : undefined
                }
                onClick={() => onOpenIconPicker(name, selectedIconId, selectedListId)}
            />

            <Select
                label="List"
                value={selectedListName}
                onClick={() => onOpenListPicker(name, selectedIconId, selectedListId)}
            />

            <Button variant="major" className="w-full" onClick={handleClick}>
                Save changes
            </Button>
        </div>
    )
}
