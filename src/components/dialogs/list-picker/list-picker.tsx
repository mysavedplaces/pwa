'use client'

import { useEffect, useMemo, useState } from 'react'

import { getStorageData } from '@/utils/db'
import { getPlacesCountByListId } from '@/utils/helpers'
import type { IList, IPlace } from '@/utils/types'

import { ListPickerCancelButton } from './components/list-picker-cancel-button'
import { ListPickerOptions } from './components/list-picker-options'

type ListPickerProps = {
    selectedListId: number | null
    onAddList: () => void
    onCancel: () => void
    onSelect: (listId: number | null) => void
}

export const ListPicker = ({ selectedListId, onAddList, onCancel, onSelect }: ListPickerProps) => {
    const [lists, setLists] = useState<IList[]>([])
    const [places, setPlaces] = useState<IPlace[]>([])

    useEffect(() => {
        loadStorageData()
    }, [])

    const loadStorageData = async () => {
        const storageData = await getStorageData()
        setLists(storageData.lists)
        setPlaces(storageData.places)
    }

    const sortedLists = useMemo(
        () => [...lists].sort((listA, listB) => listA.name.localeCompare(listB.name, undefined, { sensitivity: 'base' })),
        [lists],
    )
    const placesCountByListId = useMemo(() => getPlacesCountByListId(places), [places])

    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Choose list</div>
                <div className="text-xs text-gray-500">Save this location to a list or without a list</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-1">
                <ListPickerOptions
                    lists={sortedLists}
                    placesCountByListId={placesCountByListId}
                    selectedListId={selectedListId}
                    onAddList={onAddList}
                    onSelect={onSelect}
                />
            </div>

            <ListPickerCancelButton onCancel={onCancel} />
        </div>
    )
}
