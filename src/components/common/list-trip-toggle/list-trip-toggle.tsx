import { Toggle } from '@/components/ui/toggle'

type ListTripToggleProps = {
    value: boolean
    onValueChange: (nextValue: boolean) => void
}

export const ListTripToggle = ({ value, onValueChange }: ListTripToggleProps) => {
    return (
        <div className="flex min-h-12 items-center justify-between px-1">
            <span className="text-sm leading-5 font-bold text-gray-900">Make this a trip</span>
            <Toggle value={value} onValueChange={onValueChange} />
        </div>
    )
}
