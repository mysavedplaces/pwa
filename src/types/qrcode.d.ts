declare module 'qrcode' {
    type QrCodeOptions = {
        color?: {
            dark?: string
            light?: string
        }
        errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
        margin?: number
        type?: 'svg'
        width?: number
    }

    const QRCode: {
        toString(value: string, options: QrCodeOptions): Promise<string>
    }

    export default QRCode
}
