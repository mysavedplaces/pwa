'use client'

import { PlusIcon } from 'lucide-react'

import { AddList } from '@/components/dialogs/add-list/add-list'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

type SavedHeaderProps = {
    onLoadPlaces: () => void
}

export const SavedHeader = ({ onLoadPlaces }: SavedHeaderProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<AddList onSuccess={onLoadPlaces} />)
    }

    return (
        <div className="pb-6">
            <Button variant="minor" className="w-full" onClick={handleClick}>
                <span className="flex items-center justify-center gap-x-2">
                    <PlusIcon size={20} />
                    New list
                </span>
            </Button>
        </div>
    )
}
