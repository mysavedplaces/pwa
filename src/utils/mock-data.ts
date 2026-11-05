import type { IList, IPlace, PlaceIconId, PlacesStorageSchema } from '@/utils/types'

const DAY_MS = 24 * 60 * 60 * 1000

export const createMockPlacesStorage = (): PlacesStorageSchema => {
    const now = Date.now()

    let nextListId = 1000
    let nextPlaceId = 5000
    let listOffset = 0
    let placeOffset = 0

    const lists: IList[] = []
    const places: IPlace[] = []
    const listIdsByName: Record<string, number> = {}
    const defaultIconIds: PlaceIconId[] = ['star', 'home', 'coffee', 'food', 'photo', 'work', 'store', 'park']
    const iconIdsByListName: Record<string, PlaceIconId> = {
        'Weekend Cafes': 'coffee',
        'Dinner Spots': 'food',
        'Scenic Viewpoints': 'mountains',
        'Beach Mornings': 'pool',
        'City Walks': 'walking',
        'Work Trip Ideas': 'work',
        'Cyprus Weekend': 'palm',
        'Athens Long Weekend': 'landmark',
        'Photo Spots': 'photo',
        'Family Favorites': 'home',
        'Road Trip Stops': 'car',
        'Bookstores to Browse': 'library',
        'Someday Soon': 'star',
    }

    const addList = (name: string, isTrip = false) => {
        const list = {
            id: nextListId++,
            name,
            isTrip,
            createdAt: now - (120 - listOffset) * DAY_MS,
        }

        listOffset += 1
        lists.push(list)
        listIdsByName[name] = list.id
        return list
    }

    const addPlace = ({
        name,
        lat,
        lng,
        listName,
        iconId,
        pinned = false,
        archived = false,
        daysAgo,
    }: {
        name: string
        lat: number
        lng: number
        listName?: string
        iconId?: PlaceIconId
        pinned?: boolean
        archived?: boolean
        daysAgo: number
    }) => {
        const createdAt = now - daysAgo * DAY_MS - placeOffset * 60 * 60 * 1000
        placeOffset += 1

        places.push({
            id: nextPlaceId++,
            name,
            coordinates: { lat, lng },
            categories: null,
            type: 'default',
            iconId:
                iconId ??
                (listName ? iconIdsByListName[listName] : defaultIconIds[placeOffset % defaultIconIds.length]),
            listId: listName ? listIdsByName[listName] : undefined,
            pinned,
            archived,
            createdAt,
            pinnedAt: pinned ? createdAt + 30 * 60 * 1000 : undefined,
        })
    }

    addList('Weekend Cafes')
    addList('Dinner Spots')
    addList('Scenic Viewpoints')
    addList('Beach Mornings')
    addList('City Walks')
    addList('Work Trip Ideas')
    addList('Cyprus Weekend', true)
    addList('Athens Long Weekend', true)
    addList('Photo Spots')
    addList('Family Favorites')
    addList('Road Trip Stops')
    addList('Bookstores to Browse')
    addList('Someday Soon')

    addPlace({
        name: 'Nomad Bread and Coffee',
        lat: 35.1735,
        lng: 33.3617,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 90,
    })
    addPlace({
        name: 'The Daily Roast',
        lat: 34.6786,
        lng: 33.0413,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 88,
    })
    addPlace({
        name: 'Mikro 63',
        lat: 35.1718,
        lng: 33.3602,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 84,
    })
    addPlace({
        name: 'September Coffee',
        lat: 35.8989,
        lng: 14.5146,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 81,
    })
    addPlace({
        name: 'Sculptor Coffee House',
        lat: 35.1704,
        lng: 33.3625,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 79,
    })
    addPlace({
        name: 'Morning Ritual Espresso Bar',
        lat: 34.6808,
        lng: 33.0401,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 76,
    })
    addPlace({
        name: 'Kima Coffee Corner',
        lat: 34.9133,
        lng: 33.6392,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 74,
    })
    addPlace({
        name: 'Aster Bakery and Brew',
        lat: 35.1727,
        lng: 33.3589,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 72,
    })
    addPlace({
        name: 'Riverside Flat White',
        lat: 35.1762,
        lng: 33.3704,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 70,
    })
    addPlace({
        name: 'Saturday Croissant Club',
        lat: 34.6761,
        lng: 33.0493,
        listName: 'Weekend Cafes',
        iconId: 'food',
        pinned: true,
        daysAgo: 69,
    })
    addPlace({
        name: 'Little Paris Patisserie',
        lat: 35.1688,
        lng: 33.3648,
        listName: 'Weekend Cafes',
        pinned: true,
        daysAgo: 67,
    })
    addPlace({ name: 'Blue Door Coffee Roasters', lat: 35.1759, lng: 33.3565, listName: 'Weekend Cafes', daysAgo: 65 })
    addPlace({ name: 'Mornings in Valletta', lat: 35.8982, lng: 14.5138, listName: 'Weekend Cafes', daysAgo: 63 })
    addPlace({ name: 'Harbor Bean House', lat: 35.8894, lng: 14.5052, listName: 'Weekend Cafes', daysAgo: 61 })
    addPlace({
        name: 'The Orange Counter',
        lat: 34.6718,
        lng: 33.0459,
        listName: 'Weekend Cafes',
        daysAgo: 58,
    })
    addPlace({ name: 'Roast and Bloom', lat: 34.6794, lng: 33.0357, listName: 'Weekend Cafes', daysAgo: 56 })
    addPlace({
        name: 'Sunday Cinnamon Bun Stop',
        lat: 35.1665,
        lng: 33.3601,
        listName: 'Weekend Cafes',
        daysAgo: 54,
    })
    addPlace({ name: 'Old Port Coffee Window', lat: 34.9149, lng: 33.6385, listName: 'Weekend Cafes', daysAgo: 52 })
    addPlace({ name: 'Cloud Nine Matcha Bar', lat: 35.1712, lng: 33.3554, listName: 'Weekend Cafes', daysAgo: 50 })
    addPlace({ name: 'Corner Table Espresso', lat: 37.9741, lng: 23.7306, listName: 'Weekend Cafes', daysAgo: 47 })
    addPlace({ name: 'Cedar Street Brunch Room', lat: 35.1749, lng: 33.3681, listName: 'Weekend Cafes', daysAgo: 45 })
    addPlace({ name: 'Golden Foam Cafe', lat: 35.1697, lng: 33.3596, listName: 'Weekend Cafes', daysAgo: 43 })
    addPlace({ name: 'After Rain Filter Bar', lat: 35.1771, lng: 33.3634, listName: 'Weekend Cafes', daysAgo: 40 })
    addPlace({ name: 'Lemon Tree Breakfast Spot', lat: 34.6753, lng: 33.0432, listName: 'Weekend Cafes', daysAgo: 37 })

    addPlace({
        name: 'Pyxida Fish Tavern',
        lat: 34.9147,
        lng: 33.6362,
        listName: 'Dinner Spots',
        pinned: true,
        daysAgo: 77,
    })
    addPlace({ name: 'Rous Restaurant', lat: 37.9752, lng: 23.7261, listName: 'Dinner Spots', daysAgo: 73 })
    addPlace({ name: 'Mazi Athens', lat: 37.9737, lng: 23.7293, listName: 'Dinner Spots', daysAgo: 71 })
    addPlace({
        name: 'Pinolo Barcelona',
        lat: 41.3854,
        lng: 2.1752,
        listName: 'Dinner Spots',
        iconId: 'fast-food',
        daysAgo: 68,
    })

    addPlace({
        name: 'Konnos Viewpoint',
        lat: 34.9862,
        lng: 34.0714,
        listName: 'Scenic Viewpoints',
        pinned: true,
        daysAgo: 66,
    })
    addPlace({ name: 'Cape Greco Sea Caves', lat: 34.9681, lng: 34.0837, listName: 'Scenic Viewpoints', daysAgo: 62 })
    addPlace({
        name: 'Petra tou Romiou Viewpoint',
        lat: 34.6656,
        lng: 32.6273,
        listName: 'Scenic Viewpoints',
        daysAgo: 59,
    })
    addPlace({
        name: 'Top of Troodos',
        lat: 34.9167,
        lng: 32.8667,
        listName: 'Scenic Viewpoints',
        iconId: 'park',
        daysAgo: 55,
    })

    addPlace({
        name: 'Fig Tree Bay Early Swim',
        lat: 35.0148,
        lng: 34.0562,
        listName: 'Beach Mornings',
        pinned: true,
        daysAgo: 53,
    })
    addPlace({ name: 'Governors Beach', lat: 34.7206, lng: 33.2713, listName: 'Beach Mornings', daysAgo: 51 })
    addPlace({ name: 'Nissi Bay Before 9 AM', lat: 34.9888, lng: 33.9696, listName: 'Beach Mornings', daysAgo: 49 })
    addPlace({
        name: 'Lara Beach',
        lat: 34.9531,
        lng: 32.3084,
        listName: 'Beach Mornings',
        iconId: 'palm',
        daysAgo: 46,
    })

    addPlace({
        name: 'Old Town Nicosia Walls',
        lat: 35.1721,
        lng: 33.3639,
        listName: 'City Walks',
        pinned: true,
        daysAgo: 44,
    })
    addPlace({ name: 'Limassol Marina Promenade', lat: 34.673, lng: 33.0418, listName: 'City Walks', daysAgo: 41 })
    addPlace({ name: 'Plaka Backstreets', lat: 37.9715, lng: 23.7283, listName: 'City Walks', daysAgo: 39 })
    addPlace({
        name: 'Valletta Waterfront Evening Walk',
        lat: 35.8865,
        lng: 14.5059,
        listName: 'City Walks',
        daysAgo: 36,
    })

    addPlace({
        name: 'Shoreditch Coffee Desk',
        lat: 51.5246,
        lng: -0.0758,
        listName: 'Work Trip Ideas',
        iconId: 'coffee',
        daysAgo: 34,
    })
    addPlace({
        name: 'Berlin Mitte Hotel Area',
        lat: 52.5208,
        lng: 13.4095,
        listName: 'Work Trip Ideas',
        iconId: 'hotel',
        daysAgo: 31,
    })
    addPlace({
        name: 'Lisbon Riverside Cowork',
        lat: 38.7079,
        lng: -9.1366,
        listName: 'Work Trip Ideas',
        pinned: true,
        daysAgo: 29,
    })
    addPlace({
        name: 'Warsaw Powisle Stay',
        lat: 52.2355,
        lng: 21.0328,
        listName: 'Work Trip Ideas',
        iconId: 'hotel',
        daysAgo: 26,
    })

    addPlace({
        name: 'Larnaca International Airport',
        lat: 34.8751,
        lng: 33.6249,
        listName: 'Cyprus Weekend',
        iconId: 'flight',
        pinned: true,
        daysAgo: 28,
    })
    addPlace({
        name: 'Amarande Hotel',
        lat: 34.9859,
        lng: 34.0017,
        listName: 'Cyprus Weekend',
        iconId: 'hotel',
        pinned: true,
        daysAgo: 27,
    })
    addPlace({
        name: 'Konnos Bay',
        lat: 34.9862,
        lng: 34.0714,
        listName: 'Cyprus Weekend',
        iconId: 'pool',
        daysAgo: 23,
    })
    addPlace({
        name: 'Ayia Napa Harbour',
        lat: 34.9887,
        lng: 33.9992,
        listName: 'Cyprus Weekend',
        iconId: 'ship',
        daysAgo: 21,
    })
    addPlace({
        name: 'Cape Greco Sea Caves',
        lat: 34.9681,
        lng: 34.0837,
        listName: 'Cyprus Weekend',
        daysAgo: 20,
    })
    addPlace({
        name: 'Ayia Napa Sculpture Park',
        lat: 34.9913,
        lng: 34.0206,
        listName: 'Cyprus Weekend',
        iconId: 'art',
        daysAgo: 19,
    })
    addPlace({
        name: 'Protaras Coastal Walk',
        lat: 35.0164,
        lng: 34.0576,
        listName: 'Cyprus Weekend',
        iconId: 'walking',
        daysAgo: 18,
    })
    addPlace({
        name: 'Fig Tree Bay',
        lat: 35.0148,
        lng: 34.0562,
        listName: 'Cyprus Weekend',
        iconId: 'pool',
        archived: true,
        daysAgo: 35,
    })
    addPlace({
        name: 'WaterWorld Ayia Napa',
        lat: 34.9758,
        lng: 33.9415,
        listName: 'Cyprus Weekend',
        iconId: 'pool',
        archived: true,
        daysAgo: 33,
    })

    addPlace({
        name: 'Athens International Airport',
        lat: 37.9364,
        lng: 23.9445,
        listName: 'Athens Long Weekend',
        iconId: 'flight',
        pinned: true,
        daysAgo: 25,
    })
    addPlace({
        name: 'The Foundry Hotel',
        lat: 37.979,
        lng: 23.7189,
        listName: 'Athens Long Weekend',
        iconId: 'hotel',
        pinned: true,
        daysAgo: 24,
    })
    addPlace({
        name: 'Acropolis Museum',
        lat: 37.9685,
        lng: 23.7284,
        listName: 'Athens Long Weekend',
        daysAgo: 18,
    })
    addPlace({
        name: 'Monastiraki Square',
        lat: 37.9764,
        lng: 23.7257,
        listName: 'Athens Long Weekend',
        iconId: 'walking',
        daysAgo: 16,
    })
    addPlace({
        name: 'Lycabettus Hill',
        lat: 37.9822,
        lng: 23.7444,
        listName: 'Athens Long Weekend',
        iconId: 'mountains',
        daysAgo: 13,
    })
    addPlace({
        name: 'National Garden',
        lat: 37.9717,
        lng: 23.7364,
        listName: 'Athens Long Weekend',
        iconId: 'park',
        daysAgo: 12,
    })
    addPlace({
        name: 'Varvakios Central Market',
        lat: 37.9812,
        lng: 23.727,
        listName: 'Athens Long Weekend',
        iconId: 'groceries',
        daysAgo: 11,
    })
    addPlace({
        name: 'Panathenaic Stadium',
        lat: 37.9684,
        lng: 23.7411,
        listName: 'Athens Long Weekend',
        iconId: 'sport',
        archived: true,
        daysAgo: 30,
    })
    addPlace({
        name: 'Benaki Museum',
        lat: 37.9742,
        lng: 23.7367,
        listName: 'Athens Long Weekend',
        iconId: 'art',
        archived: true,
        daysAgo: 29,
    })

    addPlace({
        name: 'Hallstatt Lakeside',
        lat: 47.5613,
        lng: 13.6493,
        listName: 'Photo Spots',
        pinned: true,
        daysAgo: 24,
    })
    addPlace({ name: 'Ledra Street Rooftops', lat: 35.1693, lng: 33.3608, listName: 'Photo Spots', daysAgo: 22 })
    addPlace({
        name: 'Blue Mosque Courtyard',
        lat: 41.0055,
        lng: 28.9768,
        listName: 'Photo Spots',
        iconId: 'church',
        daysAgo: 19,
    })
    addPlace({ name: 'Positano Main View', lat: 40.6281, lng: 14.4849, listName: 'Photo Spots', daysAgo: 17 })

    addPlace({
        name: 'Molos Seafront Playground',
        lat: 34.6798,
        lng: 33.0528,
        listName: 'Family Favorites',
        iconId: 'baby',
        daysAgo: 15,
    })
    addPlace({
        name: 'Athalassa Park Loop',
        lat: 35.1406,
        lng: 33.3771,
        listName: 'Family Favorites',
        iconId: 'park',
        daysAgo: 14,
    })
    addPlace({
        name: 'Finikoudes Evening Stroll',
        lat: 34.9142,
        lng: 33.6378,
        listName: 'Family Favorites',
        pinned: true,
        daysAgo: 13,
    })
    addPlace({
        name: 'Paphos Zoo Morning Visit',
        lat: 34.9024,
        lng: 32.3679,
        listName: 'Family Favorites',
        iconId: 'pet',
        daysAgo: 11,
    })

    addPlace({
        name: 'Kalopanayiotis Village Square',
        lat: 34.9923,
        lng: 32.8297,
        listName: 'Road Trip Stops',
        daysAgo: 10,
    })
    addPlace({ name: 'Omodos Stone Alleys', lat: 34.8494, lng: 32.8071, listName: 'Road Trip Stops', daysAgo: 9 })
    addPlace({
        name: 'Lefkara Main Street',
        lat: 34.8665,
        lng: 33.3042,
        listName: 'Road Trip Stops',
        pinned: true,
        daysAgo: 8,
    })
    addPlace({
        name: 'Pano Platres Waterfall Stop',
        lat: 34.8869,
        lng: 32.8551,
        listName: 'Road Trip Stops',
        daysAgo: 7,
    })

    addPlace({
        name: 'Daunt Books Marylebone',
        lat: 51.5192,
        lng: -0.1501,
        listName: 'Bookstores to Browse',
        daysAgo: 7,
    })
    addPlace({
        name: 'Shakespeare and Company',
        lat: 48.8526,
        lng: 2.347,
        listName: 'Bookstores to Browse',
        pinned: true,
        daysAgo: 6,
    })
    addPlace({ name: 'Atlantis Books Oia', lat: 36.4619, lng: 25.3752, listName: 'Bookstores to Browse', daysAgo: 5 })
    addPlace({ name: 'The Book Barge', lat: 52.2053, lng: 0.1218, listName: 'Bookstores to Browse', daysAgo: 4 })
    addPlace({
        name: 'Closed Corner Bookshop',
        lat: 51.5176,
        lng: -0.1214,
        listName: 'Bookstores to Browse',
        archived: true,
        daysAgo: 12,
    })

    addPlace({
        name: 'Home Grocery Stop',
        lat: 35.1602,
        lng: 33.3651,
        iconId: 'groceries',
        pinned: true,
        daysAgo: 20,
    })
    addPlace({
        name: 'Sunset Picnic Spot',
        lat: 34.6651,
        lng: 32.6311,
        iconId: 'fire-pit',
        pinned: true,
        daysAgo: 19,
    })
    addPlace({
        name: 'Favorite Pharmacy',
        lat: 35.1658,
        lng: 33.3594,
        iconId: 'pharmacy',
        pinned: true,
        daysAgo: 18,
    })
    addPlace({
        name: 'Weekend Flower Shop',
        lat: 35.1725,
        lng: 33.3547,
        iconId: 'flowers',
        pinned: true,
        daysAgo: 17,
    })
    addPlace({
        name: 'Late Night Gelato',
        lat: 34.6742,
        lng: 33.0406,
        iconId: 'ice-cream',
        pinned: true,
        daysAgo: 16,
    })
    addPlace({
        name: 'Best Sunset Bench',
        lat: 34.6613,
        lng: 32.6248,
        iconId: 'heart',
        pinned: true,
        daysAgo: 15,
    })
    addPlace({
        name: 'Morning Walk Start',
        lat: 35.1431,
        lng: 33.3692,
        iconId: 'walking',
        pinned: true,
        daysAgo: 14,
    })
    addPlace({
        name: 'Quick Gift Store',
        lat: 35.1691,
        lng: 33.3616,
        iconId: 'store',
        pinned: true,
        daysAgo: 13,
    })
    addPlace({
        name: 'Fresh Juice Stop',
        lat: 34.9152,
        lng: 33.6359,
        iconId: 'cherry',
        pinned: true,
        daysAgo: 12,
    })
    addPlace({
        name: 'Takeaway Pizza Place',
        lat: 34.6771,
        lng: 33.0427,
        iconId: 'fast-food',
        pinned: true,
        daysAgo: 11,
    })

    addPlace({ name: 'Passport Photo Studio', lat: 35.1684, lng: 33.3577, iconId: 'photo', daysAgo: 10 })
    addPlace({ name: 'Hotel with Great Breakfast', lat: 37.9778, lng: 23.7296, iconId: 'hotel', daysAgo: 9 })
    addPlace({ name: 'New Sushi Place', lat: 34.6758, lng: 33.0444, iconId: 'fish', daysAgo: 8 })
    addPlace({ name: 'Tailor Near the Office', lat: 35.1714, lng: 33.3668, iconId: 'clothes', daysAgo: 7 })
    addPlace({
        name: 'Sunday Market Parking',
        lat: 35.1586,
        lng: 33.3715,
        iconId: 'parking',
        daysAgo: 6,
    })
    addPlace({
        name: 'Nice Playground for an Hour',
        lat: 34.6809,
        lng: 33.0537,
        iconId: 'fun',
        daysAgo: 5,
    })
    addPlace({ name: 'Florist for Birthdays', lat: 35.1662, lng: 33.3552, iconId: 'flowers', daysAgo: 4 })
    addPlace({ name: 'Reliable Car Wash', lat: 35.1518, lng: 33.3894, iconId: 'garage', daysAgo: 3 })
    addPlace({
        name: 'Bookshop with Stationery',
        lat: 35.1708,
        lng: 33.3632,
        iconId: 'stationery',
        daysAgo: 2,
    })
    addPlace({ name: 'Bakery Open Late', lat: 34.6788, lng: 33.0471, iconId: 'food', daysAgo: 1 })
    addPlace({
        name: 'Former Office Lunch Spot',
        lat: 35.1729,
        lng: 33.3598,
        iconId: 'food',
        archived: true,
        daysAgo: 23,
    })
    addPlace({
        name: 'Old Ferry Terminal',
        lat: 34.9144,
        lng: 33.6382,
        listName: 'Road Trip Stops',
        iconId: 'ship',
        archived: true,
        daysAgo: 16,
    })

    return {
        lists,
        places,
    }
}
