import type { ReactNode } from 'react'

export default function LegalLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="h-full">
            <div className="relative m-auto flex min-h-full max-w-250 flex-col bg-white px-4 md:px-8">
                <main className="flex w-full grow px-4 py-10 sm:px-6 sm:py-16">{children}</main>
            </div>
        </div>
    )
}
