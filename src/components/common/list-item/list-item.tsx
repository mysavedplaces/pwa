import { ChevronRightIcon } from 'lucide-react'

import Link from 'next/link'

import type { IList } from '@/utils/types'

type ListItemProps = {
    list: IList
    placesCount: number
}

export const ListItem = ({ list, placesCount }: ListItemProps) => {
    return (
        <Link
            href={`/saved/${list.id}`}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm hover:bg-gray-100"
        >
            <span className="min-w-0 flex-1">
                <div className="font-bold">{list.name}</div>
                <div className="mt-1 text-xs text-gray-500">
                    {placesCount} {placesCount === 1 ? 'place' : 'places'}
                </div>
            </span>
            <ChevronRightIcon className="ml-3 shrink-0 text-gray-400" size={18} />
        </Link>
    )
}
