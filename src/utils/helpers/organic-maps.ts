const URL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const COORDINATE_SCALE = 2 ** 30

export const buildOrganicMapsWebLink = (lat: number, lng: number, name: string): string => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error('Invalid Organic Maps coordinates')
    }

    const latitude = Math.round(((lat + 90) / 180) * (COORDINATE_SCALE - 1))
    const longitude = Math.round((((lng + 180) % 360) / 360) * COORDINATE_SCALE) % COORDINATE_SCALE
    let code = URL_ALPHABET[(16 - 4) * 4]

    for (let group = 0; group < 9; group++) {
        let value = 0
        for (let bit = 29 - group * 3; bit >= 27 - group * 3; bit--) {
            value = value * 4 + ((latitude >>> bit) & 1) * 2 + ((longitude >>> bit) & 1)
        }
        code += URL_ALPHABET[value]
    }

    const title = encodeURIComponent(name.replace(/[ _]/g, char => (char === ' ' ? '_' : ' ')))
    return `https://omaps.app/${code}${title ? `/${title}` : ''}`
}
