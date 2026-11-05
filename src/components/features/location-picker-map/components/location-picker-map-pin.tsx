import type { ComponentType } from 'react'

import {
    BubblesIcon,
    MountainSnowIcon,
    RoadIcon,
    SunIcon,
    ThermometerSnowflakeIcon,
    TreesIcon,
} from 'lucide-react'

import Image from 'next/image'

import { getPlaceIcon } from '@/utils/configs/place-icons'
import type { PlaceIconId } from '@/utils/types'

import type { LocationPickerMapSurfaceTheme } from '../utils/location-picker-map-surface'

type LocationPickerMapPinProps = {
    theme: LocationPickerMapSurfaceTheme
    iconId?: PlaceIconId
    isMoving: boolean
}

const PIN_CENTER_ICONS: Partial<Record<LocationPickerMapSurfaceTheme, ComponentType<{ color?: string; size?: number; strokeWidth?: number }>>> = {
    water: BubblesIcon,
    polar: ThermometerSnowflakeIcon,
    forest: TreesIcon,
    mountain: MountainSnowIcon,
    desert: SunIcon,
    highway: RoadIcon,
}

export const LocationPickerMapPin = ({ iconId, isMoving, theme }: LocationPickerMapPinProps) => {
    const placeIcon = getPlaceIcon(iconId)
    const PinCenterIcon = placeIcon?.icon ?? PIN_CENTER_ICONS[theme]

    return (
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[41px] w-[27px] -translate-x-1/2 -translate-y-full">
            <Image
                src="/images/pin-shadow.svg"
                width={27}
                height={41}
                alt=""
                className="absolute bottom-[-7px] left-0"
            />

            <div
                className="absolute inset-0 transition-transform duration-150 ease-out"
                style={{ transform: `translateY(${isMoving ? -8 : 0}px)` }}
            >
                <Image src="/images/pin.svg" width={27} height={41} alt="" className="absolute inset-0" />
                {PinCenterIcon && (
                    <div className="absolute top-[5px] left-[5px] flex size-4 items-center justify-center">
                        <PinCenterIcon color="#FFFFFF" size={16} strokeWidth={3} />
                    </div>
                )}
            </div>
        </div>
    )
}
