import Image from 'next/image'

export default function NotFound() {
    return (
        <div className="wrapper flex min-h-full w-full shrink flex-col items-center justify-center gap-y-8 bg-white">
            <div className="flex flex-col gap-y-8 text-center">
                <Image src="/images/logo-128.png" alt="404" width={128} height={128} className="m-auto align-top" />
                <h1 className="text-2xl font-bold">Page not found</h1>
            </div>
        </div>
    )
}
