'use client'

import { QrCodeIcon } from 'lucide-react'

import { QrCode } from '@/components/dialogs/qr-code/qr-code'
import { useOverlay } from '@/components/providers/overlay-provider'
import { AppIcon } from '@/components/ui/app-icon'
import { EXTERNAL_APPS } from '@/utils/configs/external-apps'
import { ExternalAppId } from '@/utils/enums'

type LocationActionsQrButtonProps = {
    appId: ExternalAppId
    link: string
}

export const LocationActionsQrButton = ({ appId, link }: LocationActionsQrButtonProps) => {
    const overlay = useOverlay()
    const app = EXTERNAL_APPS.find(item => item.id === appId)!

    const handleClick = () => {
        overlay.open(
            <QrCode
                link={link}
                title="Scan QR code"
                message={`Open this place in ${app.name}`}
                leading={<AppIcon app={app} size={24} backgroundColor="#FFEDD5" />}
                onCancel={overlay.close}
            />,
        )
    }

    return (
        <button
            type="button"
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-200 px-4 text-sm font-semibold hover:bg-gray-300"
            onClick={handleClick}
        >
            <span className="inline-flex items-center gap-2">
                <QrCodeIcon size={18} />
                Show QR code
            </span>
        </button>
    )
}
