'use client'

import type { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'major' | 'minor'
    className?: string
}

export const Button = ({ children, className, variant, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={classNames(
                'h-12 cursor-pointer rounded-xl px-4 text-sm',
                { 'bg-orange-500 text-white hover:bg-orange-400': variant === 'major' },
                { 'bg-gray-200 hover:bg-gray-300': variant === 'minor' },
                className,
            )}
        >
            {children}
        </button>
    )
}
