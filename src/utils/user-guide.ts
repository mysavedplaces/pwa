const STORAGE_KEY = 'mysavedplaces.has-seen-user-guide'

export const getHasSeenUserGuide = () => {
    if (typeof window === 'undefined') {
        return true
    }

    return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

export const markUserGuideSeen = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true')
}

export const resetUserGuide = () => {
    window.localStorage.removeItem(STORAGE_KEY)
}
