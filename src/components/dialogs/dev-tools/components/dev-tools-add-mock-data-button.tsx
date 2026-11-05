'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { replaceStorage } from '@/utils/db'
import { createMockPlacesStorage } from '@/utils/mock-data'

export const DevToolsAddMockDataButton = () => {
    const overlay = useOverlay()

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            await replaceStorage(createMockPlacesStorage())
            overlay.showSuccess({
                title: 'Mock data added',
                message: 'Lists and saved places are ready for testing',
            })
        } catch (err) {
            console.error(err)
            overlay.showError({
                title: 'Unable to add mock data',
                message: 'Please try again',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button variant="major" className="w-full" disabled={isLoading} onClick={handleClick}>
            Add mock data
        </Button>
    )
}
