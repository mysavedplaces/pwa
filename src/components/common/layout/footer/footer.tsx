import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'

export const Footer = () => {
    return (
        <footer className="hidden items-center justify-between gap-y-4 border-t border-gray-300 py-4 md:flex">
            <div className="text-sm">
                &copy; 2025 - 2026{' '}
                <ExternalLink
                    href="https://www.tripadvancer.com"
                    className="inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:underline"
                >
                    Tripadvancer
                </ExternalLink>
            </div>

            <Link href="/legal/app/privacy-policy" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
                Privacy Policy
            </Link>
        </footer>
    )
}
