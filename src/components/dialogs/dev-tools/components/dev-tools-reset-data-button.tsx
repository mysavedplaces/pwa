'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { resetStorage } from '@/utils/db'
import { resetUserGuide } from '@/utils/user-guide'

export const DevToolsResetDataButton = () => {
    const overlay = useOverlay()

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            await resetStorage()
            resetUserGuide()
            overlay.showSuccess({
                title: 'Data reset',
                message: 'All saved lists and places have been removed',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to reset data',
                message: 'Please try again',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button variant="minor" className="w-full" disabled={isLoading} onClick={handleClick}>
            Reset data
        </Button>
    )
}
