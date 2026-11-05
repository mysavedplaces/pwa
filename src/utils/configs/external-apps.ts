import { ExternalAppCategory, ExternalAppId } from '@/utils/enums'
import { buildOrganicMapsWebLink } from '@/utils/helpers/organic-maps'
import { IExternalApp } from '@/utils/types'

const buildCoordinatesLabel = (lat: number, lng: number) => `${lat}, ${lng}`
const encodeCoordinatesLabel = (lat: number, lng: number) => encodeURIComponent(buildCoordinatesLabel(lat, lng))

export const EXTERNAL_APPS: IExternalApp[] = [
    {
        id: ExternalAppId.Dgis,
        name: '2GIS',
        shortName: '2GIS',
        icon: '/images/apps/2gis.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) => `https://2gis.com/geo/${lng},${lat}`,
    },
    {
        id: ExternalAppId.AppleMaps,
        name: 'Apple Maps',
        shortName: 'Apple',
        icon: '/images/apps/apple-maps.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeCoordinatesLabel(lat, lng)}`,
    },
    {
        id: ExternalAppId.GoogleMaps,
        name: 'Google Maps',
        shortName: 'Google',
        icon: '/images/apps/google-maps.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://google.com/maps/search/?api=1&query=${lat},${lng}`,
    },
    {
        id: ExternalAppId.Citymapper,
        name: 'Citymapper',
        shortName: 'Citymapper',
        icon: '/images/apps/citymapper.png',
        category: ExternalAppCategory.PublicTransit,
        buildWebLink: (lat, lng) =>
            `https://citymapper.com/directions?endcoord=${lat},${lng}&endname=Pinned%20place&endaddress=${encodeCoordinatesLabel(lat, lng)}`,
    },
    {
        id: ExternalAppId.Moovit,
        name: 'Moovit',
        shortName: 'Moovit',
        icon: '/images/apps/moovit.png',
        category: ExternalAppCategory.PublicTransit,
        buildWebLink: (lat, lng) => `https://moovit.com/?to=${encodeCoordinatesLabel(lat, lng)}&tll=${lat}_${lng}&lang=en`,
    },
    {
        id: ExternalAppId.HereWeGo,
        name: 'HERE WeGo',
        shortName: 'HERE',
        icon: '/images/apps/here-wego.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) => `https://share.here.com/l/${lat},${lng}?z=16&ref=mysavedplaces`,
    },
    {
        id: ExternalAppId.Lyft,
        name: 'Lyft',
        shortName: 'Lyft',
        icon: '/images/apps/lyft.png',
        category: ExternalAppCategory.Taxi,
        buildWebLink: (lat, lng) =>
            `https://ride.lyft.com/?id=lyft&destination[latitude]=${lat}&destination[longitude]=${lng}`,
    },
    {
        id: ExternalAppId.MapsMe,
        name: 'Maps.me',
        shortName: 'Maps.me',
        icon: '/images/apps/mapsme.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`,
    },
    {
        id: ExternalAppId.MapQuest,
        name: 'MapQuest',
        shortName: 'MapQuest',
        icon: '/images/apps/mapquest.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://www.mapquest.com/latlng/${lat},${lng}`,
    },
    {
        id: ExternalAppId.OpenStreetMap,
        name: 'Open Street Map',
        shortName: 'OSM',
        icon: '/images/apps/openstreetmap.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`,
    },
    {
        id: ExternalAppId.OrganicMaps,
        name: 'Organic Maps',
        shortName: 'Organic',
        icon: '/images/apps/organic-maps.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => buildOrganicMapsWebLink(lat, lng, 'Pinned place'),
    },
    {
        id: ExternalAppId.Scenic,
        name: 'Scenic',
        shortName: 'Scenic',
        icon: '/images/apps/scenic.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) =>
            `https://scenicapp.space/api/openScenic.php?navigatelocation=${lat},${lng}&name=Pinned%20place`,
    },
    {
        id: ExternalAppId.Sygic,
        name: 'Sygic',
        shortName: 'Sygic',
        icon: '/images/apps/sygic.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) => `https://maps.sygic.com/?lat=${lat}&lng=${lng}`,
    },
    {
        id: ExternalAppId.Transit,
        name: 'Transit',
        shortName: 'Transit',
        icon: '/images/apps/transit.png',
        category: ExternalAppCategory.PublicTransit,
        buildWebLink: (lat, lng) => `https://transitapp.com/directions?to=${lat},${lng}`,
    },
    {
        id: ExternalAppId.Uber,
        name: 'Uber',
        shortName: 'Uber',
        icon: '/images/apps/uber.png',
        category: ExternalAppCategory.Taxi,
        buildWebLink: (lat, lng) =>
            `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=Pinned%20place&dropoff[formatted_address]=${encodeCoordinatesLabel(lat, lng)}`,
    },
    {
        id: ExternalAppId.Waze,
        name: 'Waze',
        shortName: 'Waze',
        icon: '/images/apps/waze.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    },
    {
        id: ExternalAppId.YandexGo,
        name: 'Yandex Go',
        shortName: 'Yandex',
        icon: '/images/apps/yandex-go.png',
        category: ExternalAppCategory.Taxi,
        buildWebLink: (lat, lng) =>
            `https://3.redirect.appmetrica.yandex.com/route?end-lat=${lat}&end-lon=${lng}&ref=mysavedplaces&appmetrica_tracking_id=1178268795219780156`,
    },
    {
        id: ExternalAppId.YandexMaps,
        name: 'Yandex Maps',
        shortName: 'Yandex',
        icon: '/images/apps/yandex-maps.png',
        category: ExternalAppCategory.Map,
        buildWebLink: (lat, lng) => `https://maps.yandex.ru/?text=${lat},${lng}`,
    },
    {
        id: ExternalAppId.YandexNavi,
        name: 'Yandex Navi',
        shortName: 'Yandex',
        icon: '/images/apps/yandex-navi.png',
        category: ExternalAppCategory.Navigator,
        buildWebLink: (lat, lng) => `https://yandex.com/maps/?rtext=~${lat},${lng}&rtt=auto`,
    },
]

export const SUPPORTED_EXTERNAL_APP_IDS = new Set(EXTERNAL_APPS.map(app => app.id))
