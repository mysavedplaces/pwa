import type { ReactNode } from 'react'

type TooltipProps = {
    children?: ReactNode
    direction?: 'up' | 'down'
    text?: string
}

export const Tooltip = ({ children, direction = 'up', text }: TooltipProps) => {
    return (
        <div
            className={`pointer-events-none absolute left-0 z-[5] w-52 rounded-xl bg-gray-900 px-3 py-[9px] shadow-[0_4px_10px_rgba(0,0,0,0.18)] ${
                direction === 'up' ? 'bottom-[92px]' : 'top-[92px]'
            }`}
        >
            {text ? <div className="text-xs leading-4 font-semibold text-white">{text}</div> : children}
            <div
                className={`absolute left-[18px] size-3 rotate-45 bg-gray-900 ${
                    direction === 'up' ? '-bottom-1.5' : '-top-1.5'
                }`}
            />
        </div>
    )
}
