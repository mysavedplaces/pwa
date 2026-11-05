import { Button } from '@/components/ui/button'

type ListPickerCancelButtonProps = {
    onCancel: () => void
}

export const ListPickerCancelButton = ({ onCancel }: ListPickerCancelButtonProps) => {
    return (
        <Button variant="minor" className="w-full" onClick={onCancel}>
            Cancel
        </Button>
    )
}
