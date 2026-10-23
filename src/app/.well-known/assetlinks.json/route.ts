export const dynamic = 'force-dynamic'

export function GET() {
    const fingerprints = (process.env.ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINTS ?? '')
        .split(',')
        .map(value => value.trim().toUpperCase())
        .filter(Boolean)

    if (fingerprints.length === 0 || fingerprints.some(value => !/^(?:[A-F0-9]{2}:){31}[A-F0-9]{2}$/.test(value))) {
        return Response.json(
            { error: 'Configure ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINTS with the app signing certificate SHA-256.' },
            { status: 503, headers: { 'Cache-Control': 'no-store' } },
        )
    }

    return Response.json(
        [
            {
                relation: ['delegate_permission/common.handle_all_urls'],
                target: {
                    namespace: 'android_app',
                    package_name: 'com.oskolsky.mysavedplaces',
                    sha256_cert_fingerprints: [...new Set(fingerprints)],
                },
            },
        ],
        { headers: { 'Cache-Control': 'public, max-age=3600' } },
    )
}
