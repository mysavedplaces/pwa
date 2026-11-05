import classNames from 'classnames'

type ToggleProps = {
    value: boolean
    onValueChange: (nextValue: boolean) => void | Promise<void>
}

export const Toggle = ({ value, onValueChange }: ToggleProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            className={classNames(
                'flex h-6 w-[42px] cursor-pointer items-center rounded-full bg-gray-200 p-0.5 transition-colors',
                value && 'bg-orange-400',
            )}
            onClick={() => onValueChange(!value)}
        >
            <span
                className={classNames(
                    'size-[18px] rounded-full bg-white shadow-[0_1px_4px_rgba(17,24,39,0.12)] transition-transform',
                    value && 'translate-x-[18px]',
                )}
            />
        </button>
    )
}
