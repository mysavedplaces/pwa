import { Button } from '@/components/ui/button'

type IconPickerCancelButtonProps = {
    onCancel: () => void
}

export const IconPickerCancelButton = ({ onCancel }: IconPickerCancelButtonProps) => {
    return (
        <Button variant="minor" className="w-full" onClick={onCancel}>
            Cancel
        </Button>
    )
}
