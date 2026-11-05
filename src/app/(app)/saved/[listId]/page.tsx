import type { Metadata } from 'next'

import { SavedList } from '@/components/features/saved-list/saved-list'
import { createPageMetadata } from '@/utils/seo'

type SavedListPageProps = {
    params: Promise<{ listId: string }>
}

export const generateMetadata = async ({ params }: SavedListPageProps): Promise<Metadata> => {
    const { listId } = await params

    return createPageMetadata({
        title: 'Saved List',
        description: 'View the saved places in this My Saved Places list.',
        pathname: `/saved/${listId}`,
        index: false,
    })
}

export default async function SavedListPage({ params }: SavedListPageProps) {
    const { listId } = await params

    return <SavedList listId={Number(listId)} />
}
