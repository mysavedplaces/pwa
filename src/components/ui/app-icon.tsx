import Image from 'next/image'

import { IExternalApp } from '@/utils/types'

type AppIconProps = {
    app: IExternalApp
    size: number
    backgroundColor?: string
}

export const AppIcon = ({ app, size, backgroundColor }: AppIconProps) => {
    const image = <Image src={app.icon} width={size} height={size} className="rounded-md" alt={app.name} />

    if (!backgroundColor) {
        return image
    }

    return (
        <div
            className="flex items-center justify-center"
            style={{
                width: size * 2,
                height: size * 2,
                backgroundColor,
                borderRadius: size / 2,
            }}
        >
            {image}
        </div>
    )
}
