'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { PlaceIcon } from '@/components/ui/place-icon'
import { QrCodeIcon } from 'lucide-react'
import { QrCode } from '@/components/dialogs/qr-code/qr-code'
import { buildPlaceShareUrl } from '@/utils/place-share'
import type { IPlace } from '@/utils/types'

type PreviewQrButtonProps = {
    place: IPlace
}

export const PreviewQrButton = ({ place }: PreviewQrButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        const link = buildPlaceShareUrl(place, window.location.origin)

        overlay.open(
            <QrCode
                link={link}
                title="Scan QR code"
                message={`Add “${place.name}” on another device`}
                leading={<PlaceIcon iconId={place.iconId} size={24} backgroundColor="#FFEDD5" />}
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
