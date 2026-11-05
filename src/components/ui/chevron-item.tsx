import type { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'
import { ChevronRightIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ChevronItemVariant = 'surface' | 'muted'

type ChevronItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string
    subtitle?: string
    variant?: ChevronItemVariant
    icon?: LucideIcon
}

export const ChevronItem = (props: ChevronItemProps) => {
    const { title, subtitle, variant = 'surface', icon: Icon = ChevronRightIcon, className, ...buttonProps } = props

    return (
        <button
            {...buttonProps}
            type="button"
            className={classNames(
                'flex min-h-16 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 text-left',
                variant === 'surface' ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100',
                className,
            )}
        >
            <span className="min-w-0 flex-1 space-y-0.5">
                <span className="block text-sm leading-5 font-bold text-gray-900">{title}</span>
                {subtitle && <span className="block text-xs leading-[18px] text-gray-500">{subtitle}</span>}
            </span>
            <Icon size={18} color="#9CA3AF" />
        </button>
    )
}
