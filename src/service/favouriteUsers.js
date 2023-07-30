const FAV_KEY = 'favourite_users'

export function getFavouriteUsersFromStorage() {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]')
}

export function saveFavouriteUsersToStorage(ids) {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids))
}