'use client'

import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import Image from 'next/image'

const DISMISSAL_KEY = 'mobile-app-banner-dismissed'
const APP_STORE_URL = 'https://apps.apple.com/app/id6767223800'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.oskolsky.mysavedplaces'

export const MobileAppBanner = () => {
    const [storeUrl, setStoreUrl] = useState<string | null>(null)
    const [isDismissed, setIsDismissed] = useState(true)

    useEffect(() => {
        const userAgent = window.navigator.userAgent
        const isAndroid = /Android/i.test(userAgent)
        const isIos = /iPhone|iPad|iPod/i.test(userAgent)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches

        if (!isStandalone && (isAndroid || isIos)) {
            setStoreUrl(isAndroid ? PLAY_STORE_URL : APP_STORE_URL)
            try {
                setIsDismissed(window.localStorage.getItem(DISMISSAL_KEY) === 'true')
            } catch {
                setIsDismissed(false)
            }
        }
    }, [])

    const handleDismiss = () => {
        try {
            window.localStorage.setItem(DISMISSAL_KEY, 'true')
        } catch {
            // The banner is still dismissed for this page even when storage is unavailable.
        }
        setIsDismissed(true)
    }

    if (!storeUrl || isDismissed) {
        return null
    }

    return (
        <aside className="flex items-center gap-3 border-b border-orange-200 bg-orange-50 px-4 py-3 md:hidden">
            <Image src="/icons/icon-192.png" alt="" width={40} height={40} className="size-10 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-950">My Saved Places</p>
                <p className="text-xs text-gray-600">The mobile app is available</p>
            </div>
            <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
            >
                Get app
            </a>
            <button
                type="button"
                aria-label="Dismiss app banner"
                className="flex size-8 shrink-0 items-center justify-center text-gray-500"
                onClick={handleDismiss}
            >
                <XIcon size={18} />
            </button>
        </aside>
    )
}
