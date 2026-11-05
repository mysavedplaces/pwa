'use client'

import { useState } from 'react'

import { SearchBar } from './components/search-bar'
import { SearchOverlay } from './components/search-overlay'

export const Search = () => {
    const [query, setQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <>
            <SearchBar
                value={query.trim()}
                onClick={() => setIsSearchOpen(true)}
                onClear={() => setQuery('')}
            />
            <SearchOverlay
                query={query.trim()}
                value={query}
                isVisible={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onQueryChange={setQuery}
            />
        </>
    )
}
