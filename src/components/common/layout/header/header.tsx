'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/ui/logo'

const NAV_ITEMS = [
    { href: '/saved', label: 'Saved' },
    { href: '/about', label: 'About' },
]

export const Header = () => {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between gap-x-8 border-b border-gray-300 bg-white py-4">
            <Logo />

            <nav className="hidden items-center gap-x-6 md:flex">
                {NAV_ITEMS.map(item => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative py-1 text-sm font-medium transition-colors ${
                                isActive ? 'text-orange-500' : 'text-gray-700 hover:text-gray-950'
                            }`}
                        >
                            {item.label}

                            {isActive && (
                                <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-orange-500" />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}
