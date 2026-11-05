import type { KeyboardEvent } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

type SearchBarProps = {
    value: string
    onClick: () => void
    onClear: () => void
}

export const SearchBar = ({ value, onClick, onClear }: SearchBarProps) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
            return
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <div
            role="button"
            tabIndex={0}
            className="flex h-12 cursor-pointer items-center rounded-xl border border-gray-100 bg-gray-100 px-3"
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <span className="flex size-6 shrink-0 items-center justify-center">
                <SearchIcon size={20} />
            </span>

            <span className={value ? 'mx-2 min-w-0 flex-1 truncate text-sm text-gray-900' : 'mx-2 min-w-0 flex-1 truncate text-sm text-gray-400'}>
                {value || 'Enter location or coordinates'}
            </span>

            {value && (
                <button
                    type="button"
                    aria-label="Clear search"
                    className="ml-1 flex size-7 shrink-0 cursor-pointer items-center justify-center"
                    onClick={event => {
                        event.stopPropagation()
                        onClear()
                    }}
                >
                    <XIcon size={20} />
                </button>
            )}
        </div>
    )
}
