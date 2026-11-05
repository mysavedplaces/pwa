'use client'

import type { IList } from '@/utils/types'

import { AddListCancelButton } from './components/add-list-cancel-button'
import { AddListForm } from './components/add-list-form'

type AddListProps = {
    onAdded?: (list: IList) => void
    onCancel?: () => void
    onSuccess?: (list: IList) => void
}

export const AddList = ({ onAdded, onCancel, onSuccess }: AddListProps) => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">New list</div>
                <div className="text-xs text-gray-500">Organize saved locations into a list or trip</div>
            </div>

            <AddListForm onAdded={onAdded} onSuccess={onSuccess} />
            <AddListCancelButton onCancel={onCancel} />
        </div>
    )
}
