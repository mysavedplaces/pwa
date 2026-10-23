import { MapPinIcon } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/ui/logo'
import { SharedPlace, buildPlaceDeepLink } from '@/utils/place-share'

type PlaceShareProps = {
    place: SharedPlace | null
}

export const PlaceShare = ({ place }: PlaceShareProps) => {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-sm">
                <Logo />
                {place ? (
                    <>
                        <div className="space-y-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <MapPinIcon size={24} className="text-orange-500" />
                            </div>
                            <h1 className="text-xl font-bold wrap-break-word text-gray-950">
                                {place.name || 'Shared place'}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {place.coordinates.lat}, {place.coordinates.lng}
                            </p>
                            <p className="text-[15px] leading-[22px] text-gray-600">
                                Open this place in My Saved Places to view it on the map and save it to your collection.
                            </p>
                        </div>
                        <a
                            href={buildPlaceDeepLink(place)}
                            className="flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-orange-400"
                        >
                            Open in My Saved Places
                        </a>
                    </>
                ) : (
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-gray-950">This place link is invalid</h1>
                        <p className="text-[15px] leading-[22px] text-gray-600">
                            Ask the sender to share the place again using My Saved Places.
                        </p>
                    </div>
                )}
                <div className="space-y-3 border-t border-gray-200 pt-5">
                    <h2 className="text-base font-bold text-gray-950">Get My Saved Places</h2>
                    <p className="text-sm leading-5 text-gray-600">
                        Install the app, then open this link again to add the place.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href="https://apps.apple.com/app/id6767223800"
                            className="flex min-h-12 items-center justify-center rounded-xl bg-gray-200 px-4 py-3 text-center text-sm hover:bg-gray-300"
                        >
                            App Store
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.oskolsky.mysavedplaces"
                            className="flex min-h-12 items-center justify-center rounded-xl bg-gray-200 px-4 py-3 text-center text-sm hover:bg-gray-300"
                        >
                            Google Play
                        </a>
                    </div>
                </div>
                <Link href="/" className="block text-center text-sm text-gray-600 underline hover:text-gray-950">
                    Open web app
                </Link>
            </div>
        </main>
    )
}
