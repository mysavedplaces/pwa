'use client'

import type { IList } from '@/utils/types'

import { EditListCancelButton } from './components/edit-list-cancel-button'
import { EditListDeleteButton } from './components/edit-list-delete-button'
import { EditListForm } from './components/edit-list-form'

type EditListProps = {
    list: IList
    onSuccess: () => void
    onDeleted?: () => void
}

export const EditList = ({ list, onSuccess, onDeleted }: EditListProps) => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Edit list</div>
                <div className="text-xs text-gray-500">Update this list or delete it with its locations</div>
            </div>

            <EditListForm list={list} onSuccess={onSuccess} />
            <EditListDeleteButton list={list} onSuccess={onSuccess} onDeleted={onDeleted} />
            <EditListCancelButton />
        </div>
    )
}
