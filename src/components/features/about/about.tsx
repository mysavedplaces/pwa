import Image from 'next/image'
import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'

import { AboutSection } from './components/about-section'

export const About = () => {
    return (
        <div className="min-h-full w-full space-y-6">
            <AboutSection title="My Saved Places">
                <p>
                    My Saved Places is a place and location organizer for saving favorite places in seconds. Keep
                    locations, map bookmarks, and saved destinations in one place, organize them into lists, and open
                    directions instantly in your favorite navigation app.
                </p>
            </AboutSection>

            <AboutSection title="Why it exists">
                <p>
                    I use different navigation apps depending on the situation: Google Maps for walking and cycling,
                    Waze for driving, Yandex services while traveling around Eastern Europe, and taxi apps when I need a
                    ride. The problem is that every app keeps its own separate saved places list.
                </p>
                <p>
                    Over time, the same locations end up duplicated across multiple apps, or get lost somewhere between
                    bookmarks, screenshots, and copied coordinates. My Saved Places was created to keep things simple:
                    save a place once, keep everything organized in one lightweight app, and open it instantly in the
                    navigation, map, or taxi app that works best for the moment.
                </p>
            </AboutSection>

            <AboutSection title="Location and privacy">
                <p>
                    Your current device location is used to show your position on the map and help you choose places
                    more easily. We do not create user accounts and we do not store your saved places, lists, selected
                    apps, or current location on our servers.
                </p>
                <p>
                    Some actions you start yourself, such as search, reverse lookup, map display, or opening a
                    destination in another app, may still send search text, coordinates, or technical request data to
                    the relevant providers.
                </p>
                <ExternalLink href="https://mysavedplaces.com/legal/app/privacy-policy">
                    Read the Privacy Policy
                </ExternalLink>
            </AboutSection>

            <AboutSection title="Feedback and contact">
                <p>
                    Found a bug, have feedback, or want support for another navigation, map, or taxi app? I&apos;d love
                    to hear about it.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        <ExternalLink href="mailto:oskolsky.maxim@gmail.com">oskolsky.maxim@gmail.com</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://x.com/oskolsky_maxim">X (Twitter)</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.linkedin.com/in/oskolsky">LinkedIn</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.tripadvancer.com/users/oskolsky">Tripadvancer</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://github.com/oskolsky">GitHub</ExternalLink>
                    </li>
                </ul>
            </AboutSection>
        </div>
    )
}
