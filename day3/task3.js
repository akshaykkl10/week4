export async function fetchJSON(url){
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("HttpError");
    }
    return await response.json()
}

export function debounce(fn, delay) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...args)
        },delay)
    }
}
export function memoize(fn){
    const cache = new Map()
    return function(value){
        if (cache.has(value)){
            return cache.get(value)
        }
        const result = fn(value)
        cache.set(value)
        return result
    }
}

export async function fetchTimeout(url, delay) {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
        controller.abort()
    }, delay)
    return fetch(url, {
        signal:controller.signal
    }).finally(() => {
        clearTimeout(timeout)

    })
}