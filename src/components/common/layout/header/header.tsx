'use client'

import { InfoIcon } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/ui/logo'

const NAV_ITEMS = [
    { href: '/saved', label: 'Saved' },
    { href: '/settings', label: 'Settings' },
    { href: '/about', label: 'About' },
]

export const Header = () => {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-between gap-x-8 border-b border-gray-300 bg-white py-4">
            <Logo />

            <Link
                href="/about"
                aria-label="About"
                className="flex size-7 items-center justify-center text-gray-950 active:opacity-65 md:hidden"
            >
                <InfoIcon size={24} />
            </Link>

            <nav className="hidden items-center gap-x-6 md:flex">
                {NAV_ITEMS.map(item => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
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
