import type { ReactNode } from 'react'

type SelectProps = {
    label: string
    value: string
    leading?: ReactNode
    onClick: () => void
}

export const Select = ({ label, value, leading, onClick }: SelectProps) => {
    return (
        <button
            type="button"
            className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-left hover:bg-gray-50"
            onClick={onClick}
        >
            <span className="flex min-w-0 flex-1 items-center gap-2.5">
                {leading && <span className="flex items-center justify-center">{leading}</span>}
                <span className="min-w-0 flex-1 space-y-0.5">
                    <span className="block text-xs leading-4 text-gray-500">{label}</span>
                    <span className="block text-sm leading-5 font-medium text-gray-900">{value}</span>
                </span>
            </span>
            <span className="text-[13px] leading-[18px] font-semibold text-orange-500">Change</span>
        </button>
    )
}
