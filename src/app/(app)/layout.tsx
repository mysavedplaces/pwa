import type { ReactNode } from 'react'

import { Footer } from '@/components/common/layout/footer/footer'
import { Header } from '@/components/common/layout/header/header'
import { MobileAppBanner } from '@/components/common/mobile-app-banner/mobile-app-banner'
import { MobileBottomNav } from '@/components/common/layout/mobile-bottom-nav/mobile-bottom-nav'

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="h-dvh overflow-hidden">
            <div className="relative m-auto flex h-full max-w-250 flex-col bg-white px-4 md:px-8">
                <MobileAppBanner />
                <Header />
                <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pt-4 pb-22 md:py-8">
                    {children}
                </main>
                <Footer />
                <MobileBottomNav />
            </div>
        </div>
    )
}
