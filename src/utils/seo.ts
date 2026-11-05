import type { Metadata } from 'next'

export const APP_NAME = 'My Saved Places'
export const APP_DESCRIPTION =
    'My Saved Places is an organizer for locations and places: save favorite destinations, organize saved locations, and open directions in the navigation app you prefer.'

const OG_IMAGE = {
    url: '/images/og-preview.jpg',
    width: 1200,
    height: 630,
    alt: 'My Saved Places app preview',
}

type CreatePageMetadataProps = {
    title: string
    description: string
    pathname: string
    keywords?: string[]
    index?: boolean
    type?: 'article' | 'website'
}

export const createPageMetadata = ({
    title,
    description,
    pathname,
    keywords = [],
    index = true,
    type = 'website',
}: CreatePageMetadataProps): Metadata => {
    return {
        title,
        description,
        keywords,
        ...(index
            ? {
                  alternates: {
                      canonical: pathname,
                  },
              }
            : {}),
        robots: {
            index,
            follow: index,
        },
        openGraph: {
            title,
            description,
            type,
            locale: 'en_US',
            url: pathname,
            siteName: APP_NAME,
            images: [OG_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [OG_IMAGE.url],
        },
    }
}
