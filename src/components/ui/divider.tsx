type DividerProps = {
    label: string
}

export const Divider = ({ label }: DividerProps) => {
    return (
        <div className="flex items-center gap-x-2">
            <span className="text-xs font-medium text-gray-500 uppercase">{label}</span>
            <div className="h-px flex-1 bg-gray-200" />
        </div>
    )
}
