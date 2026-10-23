'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

import YandexMetrika from '@/components/common/yandex-metrika/yandex-metrika'

export const Analytics = () => {
    const pathname = usePathname()

    if (pathname === '/share' || pathname === '/share/') {
        return null
    }

    return (
        <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
            <YandexMetrika />
        </>
    )
}
