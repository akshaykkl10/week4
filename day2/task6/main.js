if("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./sw.js')
}
let deferredPrompt = null
window.addEventListener("beforeinstallprompt", (event) => {
    console.log(event)
    deferredPrompt = event
})
const installBtn = document.querySelector('#install-btn')
installBtn.hidden = false;
installBtn.addEventListener("click", async (event) => {
    if(!deferredPrompt) return
    deferredPrompt.prompt()
    const userChoice = await deferredPrompt.userChoice
    console.log(userChoice)
})
