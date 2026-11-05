import { PlusIcon } from 'lucide-react'

import { SelectableItem } from '@/components/ui/selectable-item'
import type { IList } from '@/utils/types'

type ListPickerOptionsProps = {
    lists: IList[]
    placesCountByListId: Record<number, number>
    selectedListId: number | null
    onAddList: () => void
    onSelect: (listId: number | null) => void
}

export const ListPickerOptions = ({
    lists,
    placesCountByListId,
    selectedListId,
    onAddList,
    onSelect,
}: ListPickerOptionsProps) => {
    return (
        <div className="space-y-2.5">
            <button
                type="button"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-50"
                onClick={onAddList}
            >
                <PlusIcon size={20} />
                New list
            </button>

            <SelectableItem
                title="No list"
                isSelected={selectedListId === null}
                onClick={() => onSelect(null)}
            />

            {lists.map(list => {
                const placesCount = placesCountByListId[list.id] ?? 0

                return (
                    <SelectableItem
                        key={list.id}
                        title={list.name}
                        subtitle={`${placesCount} ${placesCount === 1 ? 'place' : 'places'}`}
                        isSelected={selectedListId === list.id}
                        onClick={() => onSelect(list.id)}
                    />
                )
            })}
        </div>
    )
}
