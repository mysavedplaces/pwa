import { getPlaceIcon } from '@/utils/configs/place-icons'
import type { PlaceIconId } from '@/utils/types'

type PlaceIconProps = {
    iconId?: PlaceIconId
    size: number
    backgroundColor?: string
}

export const PlaceIcon = ({ iconId, size, backgroundColor }: PlaceIconProps) => {
    const icon = getPlaceIcon(iconId)

    if (!icon) {
        return null
    }

    const Icon = icon.icon

    if (!backgroundColor) {
        return <Icon color="#F97316" size={size} strokeWidth={2} />
    }

    return (
        <div
            className="flex items-center justify-center"
            style={{
                width: size * 2,
                height: size * 2,
                backgroundColor,
                borderRadius: size / 2,
            }}
        >
            <Icon color="#F97316" size={size} strokeWidth={2} />
        </div>
    )
}
