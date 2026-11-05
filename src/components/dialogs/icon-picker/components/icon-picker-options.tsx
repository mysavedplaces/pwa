import { PlaceIcon } from '@/components/ui/place-icon'
import { SelectableItem } from '@/components/ui/selectable-item'
import { getPlaceIconName, PLACE_ICONS } from '@/utils/configs/place-icons'
import type { PlaceIconId } from '@/utils/types'

type IconPickerOptionsProps = {
    selectedIconId: PlaceIconId | null
    onSelect: (iconId: PlaceIconId | null) => void
}

export const IconPickerOptions = ({ selectedIconId, onSelect }: IconPickerOptionsProps) => {
    const sortedIcons = [...PLACE_ICONS].sort((iconA, iconB) =>
        getPlaceIconName(iconA.id).localeCompare(getPlaceIconName(iconB.id), undefined, { sensitivity: 'base' }),
    )

    return (
        <div className="space-y-2.5">
            <SelectableItem
                title="No icon"
                isSelected={selectedIconId === null}
                onClick={() => onSelect(null)}
            />

            <div className="grid grid-cols-2 gap-2.5">
                {sortedIcons.map(icon => (
                    <SelectableItem
                        key={icon.id}
                        leading={<PlaceIcon iconId={icon.id} size={16} backgroundColor="#FFEDD5" />}
                        title={getPlaceIconName(icon.id)}
                        isSelected={selectedIconId === icon.id}
                        isSelectedIcon={false}
                        onClick={() => onSelect(icon.id)}
                    />
                ))}
            </div>
        </div>
    )
}
