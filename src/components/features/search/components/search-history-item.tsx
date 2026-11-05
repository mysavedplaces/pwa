import { ClockIcon, XIcon } from 'lucide-react'

type SearchHistoryItemProps = {
    query: string
    onClick: () => void
    onRemove: () => void
}

export const SearchHistoryItem = ({ query, onClick, onRemove }: SearchHistoryItemProps) => {
    return (
        <div className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-50">
            <button type="button" className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left" onClick={onClick}>
                <span className="flex w-5 items-center justify-center">
                    <ClockIcon size={17} className="text-gray-500" />
                </span>
                <span className="truncate text-sm font-semibold">{query}</span>
            </button>
            <button
                type="button"
                aria-label={'Remove ' + query + ' from search history'}
                className="flex size-7 cursor-pointer items-center justify-center"
                onClick={onRemove}
            >
                <XIcon size={17} className="text-gray-500" />
            </button>
        </div>
    )
}
