'use client'

import { useEffect, useState } from 'react'

import { ArchiveIcon, HeartIcon, MapPinnedIcon, PlaneIcon, SearchIcon, SettingsIcon, SmileIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { getAppStorageData } from '@/utils/storage/app-storage'
import { markUserGuideSeen } from '@/utils/user-guide'

const GUIDE_STEPS = [
    {
        icon: SearchIcon,
        title: 'Find a place',
        message: 'Search by coordinates, address, or saved place name. You can also move the map pin manually.',
    },
    {
        icon: SettingsIcon,
        title: 'Choose your apps',
        message: 'Add up to 4 map, navigation, or taxi apps. They will appear as quick actions on the map screen.',
    },
    {
        icon: MapPinnedIcon,
        title: 'Open or share',
        message: 'Tap an app to open the pinned place, copy the link, or share it with someone else.',
    },
    {
        icon: HeartIcon,
        title: 'Save for later',
        message: 'Save important locations, group them into lists, and pin the places you use most often.',
    },
    {
        icon: PlaneIcon,
        title: 'Plan a trip',
        message: 'Mark a list as a trip when creating or editing it. Trip lists appear at the top of Saved.',
    },
    {
        icon: ArchiveIcon,
        title: 'Archive visited places',
        message: 'Archive places you have visited to dim them and move them to the bottom of their section.',
    },
    {
        icon: SmileIcon,
        title: 'Add icons',
        message: 'Choose optional icons for saved places so they are easier to recognize in lists and on the map.',
    },
]

export const UserGuide = () => {
    const overlay = useOverlay()
    const router = useRouter()
    const [hasSelectedApps, setHasSelectedApps] = useState(false)

    useEffect(() => {
        setHasSelectedApps(getAppStorageData().selectedAppIds.length > 0)
    }, [])

    const handleDone = () => {
        markUserGuideSeen()
        overlay.close()
    }

    const handleChooseApps = () => {
        markUserGuideSeen()
        overlay.close()
        router.push('/settings/apps')
    }

    return (
        <div className="space-y-5">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Quick guide</div>
                <div className="text-xs text-gray-500">A short tour of the main things you can do here</div>
            </div>

            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
                {GUIDE_STEPS.map(step => {
                    const Icon = step.icon

                    return (
                        <div key={step.title} className="flex gap-x-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                                <Icon size={18} />
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-sm font-bold">{step.title}</div>
                                <div className="text-[13px] leading-5 text-gray-500">{step.message}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="space-y-3">
                {!hasSelectedApps && (
                    <Button variant="major" className="w-full" onClick={handleChooseApps}>
                        Choose apps
                    </Button>
                )}
                <Button variant="minor" className="w-full" onClick={handleDone}>
                    Got it
                </Button>
            </div>
        </div>
    )
}
