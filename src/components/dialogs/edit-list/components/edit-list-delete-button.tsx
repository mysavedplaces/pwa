'use client'

import { Confirmation } from '@/components/dialogs/confirmation/confirmation'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { deleteList } from '@/utils/db'
import type { IList } from '@/utils/types'

import { EditList } from '../edit-list'

type EditListDeleteButtonProps = {
    list: IList
    onSuccess: () => void
    onDeleted?: () => void
}

export const EditListDeleteButton = ({ list, onSuccess, onDeleted }: EditListDeleteButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(
            <Confirmation
                title="Delete list"
                message="All locations in this list will also be deleted."
                onConfirm={async () => {
                    try {
                        await deleteList(list.id)
                        onSuccess()
                        overlay.showSuccess({
                            title: 'List deleted',
                            message: 'The list and its locations have been deleted',
                            onFinish: onDeleted,
                        })
                    } catch (err) {
                        console.error(err)
                        overlay.showError({
                            title: 'Unable to delete list',
                            message: 'Please try again',
                        })
                    }
                }}
                onCancel={() => overlay.open(<EditList list={list} onSuccess={onSuccess} onDeleted={onDeleted} />)}
            />,
        )
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Delete
        </Button>
    )
}
