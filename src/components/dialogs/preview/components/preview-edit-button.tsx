import { EditLocation } from '@/components/dialogs/edit-location/edit-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import type { IPlace } from '@/utils/types'

type PreviewEditButtonProps = {
    place: IPlace
    onSuccess: () => void
}

export const PreviewEditButton = ({ place, onSuccess }: PreviewEditButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<EditLocation place={place} onSuccess={onSuccess} />)
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Edit
        </Button>
    )
}
