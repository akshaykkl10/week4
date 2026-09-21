const counter = document.body.querySelector("#counter")
let startTime = null
const target = Number(counter.dataset.target)
const duration = 3000
function easeFn(t) {
    return 1 - Math.pow(1-t, 3)
}
function animate() {
    if(startTime == null) {
        startTime = performance.now()
    }
    const elapsed = performance.now() - startTime
    const progress = Math.min(1, elapsed / duration)
    const easedProgress = easeFn(progress)
    counter.textContent = Math.round(target * easedProgress)
    if (easedProgress < 1) {
        requestAnimationFrame(animate)
    } else {
        console.log(`Elapsed: ${performance.now() - startTime}`)
    }
}
requestAnimationFrame(animate)
