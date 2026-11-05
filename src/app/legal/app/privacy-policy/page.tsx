import type { Metadata } from 'next'

import { createPageMetadata } from '@/utils/seo'

export const metadata: Metadata = createPageMetadata({
    title: 'Privacy Policy | My Saved Places',
    description:
        'Read the My Saved Places privacy policy for location access, local storage, and the handling of saved places.',
    pathname: '/legal/app/privacy-policy',
    keywords: [
        'My Saved Places privacy policy',
        'location app privacy policy',
        'map app privacy',
        'location storage privacy',
        'saved places privacy',
        'places organizer privacy',
    ],
    type: 'article',
})

export default function PrivacyPage() {
    return (
        <div className="mx-auto w-full">
            <div className="space-y-8 sm:space-y-10">
                <header className="space-y-3">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Privacy Policy</h1>

                    <p className="text-sm text-gray-500">Last updated: March 12, 2026</p>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        This Privacy Policy applies to the <span className="font-medium">My Saved Places</span> mobile
                        application.
                    </p>
                </header>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Overview</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        This application respects your privacy. We do not collect, store, or share any personal data
                        with external servers or third parties.
                    </p>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        Data created while using the app is stored locally on your device and may optionally be
                        synchronized with your personal iCloud account.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Data Storage</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        The app allows users to save locations ("saved places"). These places are stored locally on your
                        device.
                    </p>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        If iCloud synchronization is available and enabled on your device, the app may store this data
                        in your personal iCloud account in order to keep your saved places synchronized across your
                        devices and prevent data loss when reinstalling the app or switching devices.
                    </p>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        The developer of this app does not have access to this data.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Location Access</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        The app may request access to your device's location in order to display your current position
                        on the map and help you choose places.
                    </p>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        Your location is used only locally within the app and is never transmitted to external servers
                        or third parties.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Third-Party Services</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        This app does not use third-party analytics services, advertising SDKs, or tracking
                        technologies.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Data Sharing</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        We do not sell, share, or transfer any user data to third parties.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Children's Privacy</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        This app does not knowingly collect personal information from children.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Changes to This Policy</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        We may update this Privacy Policy in the future. Any changes will be reflected on this page.
                    </p>
                </section>

                <section className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg font-semibold sm:text-xl">Contact</h2>

                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        If you have any questions about this Privacy Policy, you can contact us at:
                    </p>

                    <p className="font-medium break-all text-gray-900">oskolsky.maxim@gmail.com</p>
                </section>
            </div>
        </div>
    )
}
