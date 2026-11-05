import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" aria-label="My Saved Places" className="block w-56 shrink-0 sm:w-64">
            <Image src="/images/logo.svg" alt="My Saved Places" width={393} height={28} priority className="h-auto w-full" />
        </Link>
    )
}
