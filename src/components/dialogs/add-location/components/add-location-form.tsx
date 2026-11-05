'use client'

import { useEffect, useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlaceIcon } from '@/components/ui/place-icon'
import { Select } from '@/components/ui/select'
import { addPlace, getLists } from '@/utils/db'
import { getPlaceIconName } from '@/utils/configs/place-icons'
import { generateDefaultName } from '@/utils/helpers'
import { PLACE_TYPES } from '@/utils/types'
import type { Coordinates, IList, IPlace, PlaceIconId } from '@/utils/types'

type AddLocationFormProps = {
    coordinates: Coordinates
    draftIconId?: PlaceIconId | null
    draftListId?: number | null
    draftName?: string
    onSuccess?: () => void
    onOpenIconPicker: (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => void
    onOpenListPicker: (name: string, selectedIconId: PlaceIconId | null, selectedListId: number | null) => void
}

export const AddLocationForm = ({
    coordinates,
    draftIconId = null,
    draftListId = null,
    draftName,
    onOpenIconPicker,
    onOpenListPicker,
    onSuccess,
}: AddLocationFormProps) => {
    const overlay = useOverlay()

    const [name, setName] = useState(draftName ?? generateDefaultName())
    const [lists, setLists] = useState<IList[]>([])
    const [selectedIconId] = useState<PlaceIconId | null>(draftIconId)
    const [selectedListId] = useState<number | null>(draftListId)
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
            const place: IPlace = {
                id: Date.now(),
                name: trimmed,
                coordinates: {
                    lat: Number(coordinates.lat),
                    lng: Number(coordinates.lng),
                },
                categories: null,
                type: PLACE_TYPES.DEFAULT,
                pinned: false,
                archived: false,
                createdAt: Date.now(),
                ...(selectedIconId === null ? {} : { iconId: selectedIconId }),
                ...(selectedListId === null ? {} : { listId: selectedListId }),
            }
            await addPlace(place)
            onSuccess?.()
            overlay.showSuccess({
                title: 'Location saved',
                message: 'Your location is ready to use',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to save location',
                message: 'Please try again',
            })
        }
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder="Location name"
                value={name}
                error={error}
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
                Save
            </Button>
        </div>
    )
}
