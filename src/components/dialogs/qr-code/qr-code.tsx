'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import QRCode from 'qrcode'

import { Button } from '@/components/ui/button'

type QrCodeProps = {
    link: string
    title: string
    message: string
    leading?: ReactNode
    onCancel: () => void
}

export const QrCode = ({ link, title, message, leading, onCancel }: QrCodeProps) => {
    const [svg, setSvg] = useState<string | null>(null)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        let isMounted = true

        QRCode.toString(link, {
            type: 'svg',
            errorCorrectionLevel: 'M',
            margin: 2,
            width: 240,
            color: {
                dark: '#111827',
                light: '#f9fafb',
            },
        })
            .then(nextSvg => {
                if (isMounted) {
                    setSvg(nextSvg)
                }
            })
            .catch(() => {
                if (isMounted) {
                    setHasError(true)
                }
            })

        return () => {
            isMounted = false
        }
    }, [link])

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                {leading}
                <div className="min-w-0 text-sm">
                    <div className="truncate font-semibold">{title}</div>
                    <div className="text-gray-500">{message}</div>
                </div>
            </div>

            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-gray-50 p-4">
                {svg ? (
                    <div
                        aria-label={`QR code for ${title}`}
                        className="w-full max-w-60 [&_svg]:h-auto [&_svg]:w-full"
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                ) : hasError ? (
                    <p className="text-sm text-gray-500">Unable to create this QR code.</p>
                ) : (
                    <p className="text-sm text-gray-500">Creating QR code…</p>
                )}
            </div>

            <Button variant="minor" className="w-full" onClick={onCancel}>
                Cancel
            </Button>
        </div>
    )
}
