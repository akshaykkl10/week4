const CACHE_NAME = 'task5'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './index.html', 
                './main.js', 
                './sw.js',
                'img.jpg'
            ]);
        }).then(() => {
            console.log('installation complete')
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name)
                    }
                })
            );
        })
    );
    // console.log('cache done')
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)
    if (url.pathname.startsWith("/200/")) {
        event.respondWith(networkfirst(event.request));
        return;
    }
    event.respondWith(cacheFirst(event.request))

});


async function cacheFirst(request) {
    const response = await caches.match(request);
    if (response) return response;
    return fetch(request);
}
async function networkfirst(request) {
    try {
        const response = await fetch(request)
        const cache = await caches.open(CACHE_NAME)
        await cache.put(
            request, response.clone()
        )
        return response
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response(
            "Offline - no cached response available",
            {
                status: 503,
                headers: {
                    "Content-Type": "text/plain"
                }
            }
        )
    }

}
