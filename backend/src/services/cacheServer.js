const cache = {}

export function setCache( key, value, ttl = 1000 * 60 * 60 * 24) {
    const expirationTime = Date.now() + ttl;
    cache[key] = { value, expirationTime}
}

export function getCache(key){
    const cacheData = cache[key];

    if (cacheData && cacheData.expirationTime > Date.now()) return cacheData.value;

    delete cache[key];
    return null;
}