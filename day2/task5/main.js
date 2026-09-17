if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./sw.js').then((registered) => {
        console.log("Service Worker Registered")
    }).catch((error) => {
        console.log(error)
    })
}