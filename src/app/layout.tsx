import type { ReactNode } from 'react'

import classNames from 'classnames'
import type { Metadata, Viewport } from 'next'

import { Roboto } from 'next/font/google'

import { Analytics } from '@/components/common/analytics/analytics'
import { OverlayProvider } from '@/components/providers/overlay-provider'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'
import { APP_DESCRIPTION, APP_NAME } from '@/utils/seo'

import './globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mysavedplaces.com'

export const metadata: Metadata = {
    metadataBase: new URL(appUrl),
    title: APP_NAME,
    description: APP_DESCRIPTION,
    applicationName: APP_NAME,
    category: 'travel',
    referrer: 'origin-when-cross-origin',
    creator: APP_NAME,
    publisher: APP_NAME,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
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
                <meta name="apple-itunes-app" content="app-id=6767223800" />
                <meta name="yandex-verification" content="b588c94393b01e7f" />
                <link href="https://unpkg.com/maplibre-gl@6.6.0/dist/maplibre-gl.css" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            </head>
            <body className="h-full antialiased">
                <OverlayProvider>
                    {children}
                    <Analytics />
                </OverlayProvider>
                <TailwindIndicator />
            </body>
        </html>
    )
}
