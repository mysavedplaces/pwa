'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'

import classNames from 'classnames'

import { ChevronLeftIcon, RadarIcon, XIcon } from 'lucide-react'

type SearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClear: () => void
    onBack: () => void
}

export const SearchInput = ({ value, isLoading, onChange, onClear, onBack }: SearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div
            className={classNames(
                'flex h-12 w-full items-center rounded-xl border bg-gray-100 px-3',
                isFocused ? 'border-gray-400' : 'border-gray-100',
            )}
        >
            <span className="flex size-6 items-center justify-center">
                {isLoading ? (
                    <RadarIcon className="animate-spin" size={20} strokeWidth={1.5} />
                ) : (
                    <button
                        type="button"
                        aria-label="Back"
                        className="flex size-7 cursor-pointer items-center justify-center"
                        onClick={onBack}
                    >
                        <ChevronLeftIcon size={26} />
                    </button>
                )}
            </span>

            <input
                type="text"
                name="search"
                value={value}
                autoFocus
                autoComplete="off"
                placeholder="Enter location or coordinates"
                className="mx-2 h-full min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {value && (
                <button
                    type="button"
                    aria-label="Clear search"
                    className="ml-1 flex size-7 cursor-pointer items-center justify-center"
                    onClick={onClear}
                >
                    <XIcon size={20} />
                </button>
            )}
        </div>
    )
}
