import type { ReactNode } from 'react'

import classNames from 'classnames'
import { CheckIcon } from 'lucide-react'

type SelectableItemProps = {
    leading?: ReactNode
    title: string
    subtitle?: string
    isSelected: boolean
    isSelectedIcon?: boolean
    isDisabled?: boolean
    onClick: () => void
}

export const SelectableItem = ({
    leading,
    title,
    subtitle,
    isSelected,
    isSelectedIcon = true,
    isDisabled = false,
    onClick,
}: SelectableItemProps) => {
    return (
        <button
            type="button"
            disabled={isDisabled}
            aria-pressed={isSelected}
            className={classNames(
                'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left hover:opacity-90',
                isSelected && 'border-orange-500 bg-orange-50',
                isDisabled && 'cursor-not-allowed opacity-75 hover:opacity-75',
            )}
            onClick={onClick}
        >
            <span className="flex min-w-0 flex-1 items-center gap-3">
                {leading && <span className={classNames('flex size-8 items-center justify-center', isDisabled && 'opacity-75')}>{leading}</span>}
                <span className="min-w-0 flex-1">
                    <span className={classNames('block text-sm leading-5 font-medium text-gray-900', isDisabled && 'text-gray-500')}>
                        {title}
                    </span>
                    {subtitle && (
                        <span className={classNames('block text-xs leading-[18px] text-gray-500', isDisabled && 'text-gray-400')}>
                            {subtitle}
                        </span>
                    )}
                </span>
            </span>
            {isSelected && isSelectedIcon && <CheckIcon size={16} color="#111827" />}
        </button>
    )
}
