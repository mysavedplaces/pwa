import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'

import { PLACE_TYPES } from './types'
import type { IList, IPlace, PlacesStorageSchema } from './types'

let dbPromise: Promise<IDBPDatabase>

export async function initDB() {
    if (!dbPromise) {
        dbPromise = openDB('places-db', 2, {
            async upgrade(db, oldVersion, _newVersion, transaction) {
                if (!db.objectStoreNames.contains('places')) {
                    db.createObjectStore('places', { keyPath: 'id', autoIncrement: true })
                }

                if (!db.objectStoreNames.contains('lists')) {
                    db.createObjectStore('lists', { keyPath: 'id' })
                }

                if (oldVersion < 2) {
                    const placesStore = transaction.objectStore('places')
                    let cursor = await placesStore.openCursor()

                    while (cursor) {
                        const place = normalizePlace(cursor.value)
                        await cursor.update(place)
                        cursor = await cursor.continue()
                    }
                }
            },
        })
    }
    return dbPromise
}

export async function getStorageData(): Promise<PlacesStorageSchema> {
    const db = await initDB()
    const [places, lists] = await Promise.all([db.getAll('places'), db.getAll('lists')])

    return {
        places: places.map(normalizePlace),
        lists,
    }
}

export async function getPlaces(): Promise<IPlace[]> {
    const db = await initDB()
    const places = await db.getAll('places')

    return places.map(normalizePlace)
}

export async function getLists(): Promise<IList[]> {
    const db = await initDB()
    return db.getAll('lists')
}

export async function addPlace(place: IPlace) {
    const db = await initDB()
    await db.add('places', place)
}

export async function updatePlace(place: IPlace) {
    const db = await initDB()
    await db.put('places', place)
}

export async function deletePlace(id: number) {
    const db = await initDB()
    await db.delete('places', id)
}

export async function addList(list: IList) {
    const db = await initDB()
    await db.add('lists', list)
}

export async function updateList(list: IList) {
    const db = await initDB()
    await db.put('lists', list)
}

export async function deleteList(id: number) {
    const db = await initDB()
    const transaction = db.transaction(['lists', 'places'], 'readwrite')
    const places = await transaction.objectStore('places').getAll()

    await transaction.objectStore('lists').delete(id)

    for (const place of places) {
        if (place.listId === id) {
            await transaction.objectStore('places').delete(place.id)
        }
    }

    await transaction.done
}

export async function replaceStorage(storage: PlacesStorageSchema) {
    const db = await initDB()
    const transaction = db.transaction(['places', 'lists'], 'readwrite')
    const placesStore = transaction.objectStore('places')
    const listsStore = transaction.objectStore('lists')

    await Promise.all([placesStore.clear(), listsStore.clear()])

    for (const place of storage.places) {
        await placesStore.add(place)
    }

    for (const list of storage.lists) {
        await listsStore.add(list)
    }

    await transaction.done
}

export async function resetStorage() {
    await replaceStorage({
        places: [],
        lists: [],
    })
}

const normalizePlace = (place: Partial<IPlace>): IPlace => {
    return {
        id: place.id ?? Date.now(),
        name: place.name ?? '',
        coordinates: place.coordinates ?? { lat: 0, lng: 0 },
        categories: null,
        type: PLACE_TYPES.DEFAULT,
        pinned: place.pinned ?? false,
        archived: place.archived ?? false,
        createdAt: place.createdAt ?? Date.now(),
        ...(place.iconId === undefined ? {} : { iconId: place.iconId }),
        ...(place.listId === undefined ? {} : { listId: place.listId }),
        ...(place.pinnedAt === undefined ? {} : { pinnedAt: place.pinnedAt }),
    }
}
