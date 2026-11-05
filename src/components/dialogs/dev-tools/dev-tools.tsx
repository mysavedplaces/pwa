'use client'

import { DevToolsAddMockDataButton } from './components/dev-tools-add-mock-data-button'
import { DevToolsCancelButton } from './components/dev-tools-cancel-button'
import { DevToolsResetDataButton } from './components/dev-tools-reset-data-button'

export const DevTools = () => {
    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Dev tools</div>
                <div className="text-xs text-gray-500">Manage local data while developing the app</div>
            </div>

            <div className="space-y-2.5">
                <DevToolsAddMockDataButton />
                <DevToolsResetDataButton />
                <DevToolsCancelButton />
            </div>
        </div>
    )
}
