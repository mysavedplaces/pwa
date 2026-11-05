'use client'

import { Button } from '@/components/ui/button'

type ConfirmationProps = {
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export const Confirmation = ({ title, message, onConfirm, onCancel }: ConfirmationProps) => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-gray-500">{message}</div>
            </div>

            <Button variant="major" className="w-full text-red-500" onClick={onConfirm}>
                Confirm
            </Button>

            <Button variant="minor" className="w-full" onClick={onCancel}>
                Cancel
            </Button>
        </div>
    )
}
