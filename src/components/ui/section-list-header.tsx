type SectionListHeaderProps = {
    title: string
    count?: number
}

export const SectionListHeader = ({ title, count }: SectionListHeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-3 bg-white pb-4">
            <span className="text-xs font-bold tracking-[0.4px] text-gray-500 uppercase">{title}</span>
            {typeof count === 'number' && (
                <span className="text-xs text-gray-400">{count} {count === 1 ? 'place' : 'places'}</span>
            )}
        </div>
    )
}
