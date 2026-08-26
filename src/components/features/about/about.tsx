import { InfoIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'

import { AboutExpander } from './components/about-expander'

export const About = () => {
    return (
        <div className="space-y-4">
            <p className="mb-8">
                <strong>My Saved Places</strong> is a simple and convenient tool for finding, saving, and sharing
                locations. Search for places using an address or coordinates, then easily open or share them with apps
                like Google Maps, Waze, Apple Maps, or Yandex Maps.
            </p>

            <div className="flex items-start gap-x-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-400">
                <InfoIcon size={20} className="hidden shrink-0 md:block" />
                We&nbsp;don&rsquo;t store any personal data. The saved locations are only stored in&nbsp;your
                browser&rsquo;s local storage.
            </div>

            <AboutExpander title="About">
                <div className="space-y-4">
                    <p>Hey everyone!</p>
                    <p>
                        My&nbsp;wife and&nbsp;I spend a&nbsp;lot of&nbsp;time driving and traveling through different
                        countries. Every country has its own favorite navigation apps that work best there. For&nbsp;me,
                        switching between apps is&nbsp;easy, but for my&nbsp;wife&mdash;who&rsquo;s not really into
                        tech&mdash;it can be&nbsp;tricky. She usually asks me to&nbsp;send her the destination
                        in&nbsp;a&nbsp;message&mdash;not just the location, but a&nbsp;link that opens the right
                        navigation app with the route ready to&nbsp;go.
                    </p>
                    <p>
                        To&nbsp;make this easier, I&nbsp;created this small app that helps find the right spot, adjust
                        it&nbsp;if needed, and generate a&nbsp;link for the navigation app you want. I&nbsp;hope you
                        find it&nbsp;useful too!
                    </p>
                    {/* <p>
                        Thanks so&nbsp;much! I&rsquo;d really appreciate any{' '}
                        <ExternalLink href="https://www.producthunt.com/products/location-picker">
                            feedback
                        </ExternalLink>
                        .
                    </p> */}
                </div>
            </AboutExpander>

            <AboutExpander title="Saved Locations">
                <p>
                    You can save your favorite locations directly in&nbsp;the app and easily access them on&nbsp;the
                    &quot;
                    <Link href="/saved" className="text-blue-500 hover:text-blue-600">
                        My Saved Locations
                    </Link>
                    &quot; page. All saved data is&nbsp;stored locally on&nbsp;your device, so&nbsp;your information
                    stays private and available even without an&nbsp;internet connection.
                </p>
            </AboutExpander>

            <AboutExpander title="Coordinate Converter">
                <p>
                    Easily{' '}
                    <Link href="/coordinate-converter" className="text-blue-500 hover:text-blue-600">
                        convert coordinates
                    </Link>{' '}
                    between Decimal Degrees (DD) and Degrees, Minutes, Seconds (DMS) formats. Just enter coordinates in
                    one format, and the tool instantly shows you the equivalent in&nbsp;the other, making it&nbsp;simple
                    to&nbsp;work with different coordinate systems.
                </p>
            </AboutExpander>

            <AboutExpander title="Use in Full Screen Mode on phone">
                <div className="flex items-center space-x-4">
                    <div className="hidden w-1/3 shrink-0 md:block">
                        <Image
                            src="/images/about/full-screen.jpg"
                            alt="Full Screen Mode"
                            width={800}
                            height={1334}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <p className="mb-6">
                            For the best experience, launch this app directly from your home screen to&nbsp;enjoy
                            full-screen mode on your device.
                        </p>

                        <h4 className="mb-2 font-bold">How to Install on iPhone</h4>
                        <ol className="mb-6 list-decimal space-y-2 pl-6">
                            <li>
                                Open Safari and go to{' '}
                                <Link
                                    href="https://app.mysavedplaces.com"
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    https://app.mysavedplaces.com
                                </Link>
                                .
                            </li>
                            <li>Tap the &laquo;Share&raquo; button.</li>
                            <li>Select &laquo;Add to&nbsp;Home Screen&raquo;.</li>
                            <li>Tap the My Saved Places icon on&nbsp;your home screen to&nbsp;launch the app.</li>
                        </ol>

                        <h4 className="mb-2 font-bold">How to Install on Android</h4>
                        <ol className="mb-6 list-decimal space-y-2 pl-6">
                            <li>
                                Open Safari and go to{' '}
                                <Link
                                    href="https://app.mysavedplaces.com"
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    https://app.mysavedplaces.com
                                </Link>
                                .
                            </li>
                            <li>Tap the menu button (three dots) in&nbsp;the top-right corner.</li>
                            <li>Select &laquo;Add to&nbsp;Home Screen&raquo;.</li>
                            <li>Tap the My Saved Places icon on&nbsp;your home screen to&nbsp;launch the app.</li>
                        </ol>

                        <p className="mb-2 font-bold">Or click button in the footer to install the PWA</p>
                    </div>
                </div>
            </AboutExpander>

            <AboutExpander title="Follow me">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        <ExternalLink href="https://x.com/oskolsky_maxim">X (Twitter)</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.linkedin.com/in/oskolsky">Linked In</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.tripadvancer.com/users/oskolsky">Tripadvancer</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://github.com/oskolsky">Github</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="mailto:oskolsky.maxim@gmail.com">Email</ExternalLink>
                    </li>
                </ul>
            </AboutExpander>
        </div>
    )
}
