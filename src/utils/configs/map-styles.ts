import type { MapStyleId } from '@/utils/types'

export const OPEN_FREE_MAP_STYLE_URLS: Record<MapStyleId, string> = {
    positron: 'https://tiles.openfreemap.org/styles/positron',
    bright: 'https://tiles.openfreemap.org/styles/bright',
    liberty: 'https://tiles.openfreemap.org/styles/liberty',
    dark: 'https://tiles.openfreemap.org/styles/dark',
    fiord: 'https://tiles.openfreemap.org/styles/fiord',
}

export const MAP_STYLE_OPTIONS: {
    id: MapStyleId
    title: string
    subtitle: string
}[] = [
    {
        id: 'bright',
        title: 'Bright',
        subtitle: 'Default OpenFreeMap style',
    },
    {
        id: 'positron',
        title: 'Positron',
        subtitle: 'Light and minimal style',
    },
    {
        id: 'liberty',
        title: 'Liberty',
        subtitle: 'More contrast and map detail',
    },
    {
        id: 'dark',
        title: 'Dark',
        subtitle: 'Dark style for low-light use',
    },
    {
        id: 'fiord',
        title: 'Fiord',
        subtitle: 'Cool blue style with high contrast',
    },
]
