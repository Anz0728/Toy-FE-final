export const getGuestId = () => {
    return localStorage.getItem('guestId')
}

export const fetchWithGuest = (url, options = {}) => {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-Guest-Id': getGuestId(),
            ...options.headers,
        }
    })
}