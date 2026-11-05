'use client'

import { useState } from 'react'

import { ListTripToggle } from '@/components/common/list-trip-toggle/list-trip-toggle'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addList, getLists } from '@/utils/db'
import { validateListName } from '@/utils/helpers'
import type { IList } from '@/utils/types'

type AddListFormProps = {
    onAdded?: (list: IList) => void
    onSuccess?: (list: IList) => void
}

export const AddListForm = ({ onAdded, onSuccess }: AddListFormProps) => {
    const overlay = useOverlay()

    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isTrip, setIsTrip] = useState(false)

    const handleClick = async () => {
        const lists = await getLists()
        const validationError = validateListName(name, lists)

        if (validationError) {
            setError(validationError)
            return
        }

        try {
            const list: IList = {
                id: Date.now(),
                name: name.trim(),
                createdAt: Date.now(),
                isTrip,
            }

            await addList(list)

            if (onAdded) {
                onAdded(list)
                return
            }

            onSuccess?.(list)
            overlay.showSuccess({
                title: 'List created',
                message: 'Your list is ready to use',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to create list',
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
                Save
            </Button>
        </div>
    )
}
