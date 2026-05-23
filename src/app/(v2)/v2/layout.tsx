import type { ReactNode } from 'react'

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <main className="h-full w-full">{children}</main>
}
