'use client'

import classNames from 'classnames'
import { HeartIcon, HouseIcon, InfoIcon } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { href: '/', label: 'Home', icon: HouseIcon },
    { href: '/saved', label: 'Saved', icon: HeartIcon },
    { href: '/about', label: 'About', icon: InfoIcon },
]

export const MobileBottomNav = () => {
    const pathname = usePathname()

    return (
        <nav className="fixed right-0 bottom-0 left-0 z-40 flex border-t border-gray-300 bg-white md:hidden">
            {NAV_ITEMS.map(item => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={classNames(
                            'flex flex-1 flex-col items-center justify-center gap-1 pt-3 pb-5 text-xs transition-colors',
                            isActive ? 'text-orange-500' : 'text-gray-500 hover:text-gray-950',
                        )}
                    >
                        <Icon size={20} />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}
