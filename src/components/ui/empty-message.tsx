type EmptyMessageProps = {
    message: string
}

export const EmptyMessage = ({ message }: EmptyMessageProps) => {
    return <div className="mt-8 text-center text-sm leading-5 text-gray-500">{message}</div>
}
