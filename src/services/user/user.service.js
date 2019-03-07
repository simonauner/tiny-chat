const localStorageNameKey = 'tiny-chat_username';

export function setUserInLocalStorage(name) {
    window.localStorage.setItem(localStorageNameKey, name);
}

export function getUserFromLocalStorage() {
    return window.localStorage.getItem(localStorageNameKey);
}

export function removeUserFromLocalStorage() {
    window.localStorage.removeItem(localStorageNameKey);
}
