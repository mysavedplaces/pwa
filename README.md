[![Deploy Status](https://github.com/mysavedplaces/pwa/actions/workflows/deploy.yml/badge.svg)](https://github.com/mysavedplaces/pwa/actions/workflows/deploy.yml)

# My Saved Places

A simple app built with Next.js and MapLibre.

[https://app.mysavedplaces.com](https://app.mysavedplaces.com)

![](https://raw.githubusercontent.com/mysavedplaces/pwa/refs/heads/master/public/images/about/demo.png)

## Features

- Search for locations by address or coordinates (DD or DMS)
- Select a location on the map
- Share selected location via Google Maps, Waze, Apple Maps, and Yandex Maps
- Save and store your locations

## Tripadvancer

A platform built by travelers — for discovering, sharing, and remembering amazing places.

[https://www.tripadvancer.com](https://www.tripadvancer.com)

## Follow me

- [Linked In](https://www.linkedin.com/in/oskolsky)
- [Tripadvancer](https://www.tripadvancer.com/users/oskolsky)

## Shared place links

Saved places use `https://app.mysavedplaces.com/share?v=1&lat=...&lng=...&name=...&icon=...`.
The page validates the link, offers to open the native app, and links to the App Store and Google Play.
Existing `mysavedplaces://place?...` links remain supported. A place is saved only after the recipient confirms it in the app.

### Native link association

1. Deploy this site to `app.mysavedplaces.com`. The association endpoints must return JSON over HTTPS without redirects or authentication:
    - `/.well-known/apple-app-site-association`
    - `/.well-known/assetlinks.json`
2. Set `ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINTS` in the hosting environment to the SHA-256 fingerprint under Google Play Console → App integrity → App signing → **App signing key certificate**. Use a comma-separated list to support additional development signing certificates. The upload certificate alone does not cover apps installed through Google Play. The endpoint returns 503 until valid fingerprints are configured.
3. The iOS association uses team `DK4K8RNND2` and bundle ID `com.oskolsky.mysavedplaces`; only `/share` and `/share/` are associated.
4. Build and install new native apps containing `ios.associatedDomains` and `android.intentFilters`. An OTA update cannot add these native settings. In the native project's release flow, `EXPO_NO_CAPABILITY_SYNC=1` is used, so enable **Associated Domains** manually for the Apple App ID and regenerate its provisioning profile before building.
5. Test a link tapped from Notes or a message on each device. With a verified installation the OS opens the app directly; otherwise it opens this page. The “Open in My Saved Places” button also supports installed versions with only the custom scheme.

Browsers cannot reliably detect whether the app is installed. The page leaves download links available and does not attempt timed redirects or automatically send visitors to a store. After installation, open the original link again; deferred linking is not provided.
Analytics is excluded from this page so its place name and coordinates are not sent to analytics services.
