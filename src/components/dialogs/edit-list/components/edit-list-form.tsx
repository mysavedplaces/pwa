'use client'

import { useState } from 'react'

import { ListTripToggle } from '@/components/common/list-trip-toggle/list-trip-toggle'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getLists, updateList } from '@/utils/db'
import { validateListName } from '@/utils/helpers'
import type { IList } from '@/utils/types'

type EditListFormProps = {
    list: IList
    onSuccess: () => void
}

export const EditListForm = ({ list, onSuccess }: EditListFormProps) => {
    const overlay = useOverlay()

    const [name, setName] = useState(list.name)
    const [error, setError] = useState<string | null>(null)
    const [isTrip, setIsTrip] = useState(list.isTrip ?? false)

    const handleClick = async () => {
        const lists = await getLists()
        const validationError = validateListName(name, lists, { currentListId: list.id })

        if (validationError) {
            setError(validationError)
            return
        }

        try {
            await updateList({ ...list, name: name.trim(), isTrip })
            onSuccess()
            overlay.showSuccess({
                title: 'List updated',
                message: 'Your changes have been saved',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to update list',
                message: 'Please try again',
            })
        }
    }

    return (
        <div className="space-y-4">
            <Input
                value={name}
                error={error}
                placeholder="List name"
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <ListTripToggle value={isTrip} onValueChange={setIsTrip} />

            <Button variant="major" className="w-full" onClick={handleClick}>
                Save changes
            </Button>
        </div>
    )
}
