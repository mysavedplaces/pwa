import type { Coordinates } from '@/utils/types'

export type LocationPickerMapSurfaceTheme = 'land' | 'water' | 'polar' | 'forest' | 'mountain' | 'desert' | 'highway'

export type RenderedMapFeature = {
    properties?: Record<string, unknown>
    layer?: {
        id?: string
        source?: string
        ['source-layer']?: string
    }
    source?: string
    sourceLayer?: string
}

type SurfaceContext = {
    coordinates: Coordinates
    renderedFeatures: RenderedMapFeature[]
}

const POLAR_LATITUDE_THRESHOLD = 80
const WATER_HINT_PATTERN = /(water|ocean|sea|lake|river|stream|canal|basin|bay|strait|harbor|harbour)/i
const FOREST_HINT_PATTERN = /(forest|wood)/i
const MOUNTAIN_HINT_PATTERN = /(peak|ridge|cliff|rock|bare rock|bare_rock|scree)/i
const DESERT_HINT_PATTERN = /(desert|sand|dune)/i
const HIGHWAY_HINT_PATTERN = /(motorway|trunk|primary)/i

type SurfaceRule = {
    theme: LocationPickerMapSurfaceTheme
    matches: (context: SurfaceContext) => boolean
}

const normalizeHintValue = (value: string) => value.replace(/[-_]/g, ' ')
const matchesHintPattern = (value: unknown, pattern: RegExp) =>
    typeof value === 'string' && pattern.test(normalizeHintValue(value))

const getFeatureHintValues = (feature: RenderedMapFeature): unknown[] => {
    const properties = feature.properties ?? {}

    return [
        feature.layer?.id,
        feature.layer?.source,
        feature.layer?.['source-layer'],
        feature.source,
        feature.sourceLayer,
        properties.class,
        properties.highway,
        properties.type,
        properties.natural,
        properties.landuse,
        properties.landcover,
        properties.surface,
        properties.water,
        properties.waterway,
    ]
}

const featureMatches = (feature: RenderedMapFeature, pattern: RegExp) =>
    getFeatureHintValues(feature).some(value => matchesHintPattern(value, pattern))

const hasMatchingFeature = (features: RenderedMapFeature[], pattern: RegExp) =>
    features.some(feature => featureMatches(feature, pattern))

const SURFACE_RULES: SurfaceRule[] = [
    {
        theme: 'polar',
        matches: ({ coordinates }) => Math.abs(coordinates.lat) >= POLAR_LATITUDE_THRESHOLD,
    },
    {
        theme: 'water',
        matches: ({ renderedFeatures }) => hasMatchingFeature(renderedFeatures, WATER_HINT_PATTERN),
    },
    {
        theme: 'mountain',
        matches: ({ renderedFeatures }) => hasMatchingFeature(renderedFeatures, MOUNTAIN_HINT_PATTERN),
    },
    {
        theme: 'desert',
        matches: ({ renderedFeatures }) => hasMatchingFeature(renderedFeatures, DESERT_HINT_PATTERN),
    },
    {
        theme: 'forest',
        matches: ({ renderedFeatures }) => hasMatchingFeature(renderedFeatures, FOREST_HINT_PATTERN),
    },
    {
        theme: 'highway',
        matches: ({ renderedFeatures }) => hasMatchingFeature(renderedFeatures, HIGHWAY_HINT_PATTERN),
    },
]

export const resolveLocationPickerMapSurface = ({ coordinates, renderedFeatures }: SurfaceContext) =>
    SURFACE_RULES.find(rule => rule.matches({ coordinates, renderedFeatures }))?.theme ?? 'land'
