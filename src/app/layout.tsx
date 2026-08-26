import type { ReactNode } from 'react'

import classNames from 'classnames'
import type { Metadata, Viewport } from 'next'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'

import YandexMetrika from '@/components/common/yandex-metrika/yandex-metrika'
import { OverlayProvider } from '@/components/providers/overlay-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'

import './globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mysavedplaces.com'

export const metadata: Metadata = {
    metadataBase: new URL(appUrl),
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={classNames('h-full bg-white md:bg-[#e8f4ff]', roboto.className)}>
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="yandex-verification" content="b588c94393b01e7f" />
                <link href="https://unpkg.com/maplibre-gl@6.6.0/dist/maplibre-gl.css" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            </head>
            <body className="h-full antialiased">
                <ToastProvider>
                    <OverlayProvider>
                        {children}
                        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
                        <YandexMetrika />
                    </OverlayProvider>
                </ToastProvider>
                <TailwindIndicator />
            </body>
        </html>
    )
}
