function easout(t){
    return 1 - Math.pow(1-t, 3)
}


const counter = document.body.querySelector('#counter');

const start = 0
const end = Number(counter.dataset.target)
const duration = 1000

let startTime = null

function animate(timestamp){
    console.log("TimeStamp", timestamp)
    if (startTime == null){
        startTime = timestamp
    }
    const elapsed = timestamp - startTime
    const progress = easout(Math.min(1, elapsed / duration))
    counter.textContent = Math.round(end*progress)
    if(progress < 1){
        requestAnimationFrame(animate)
    }
}

requestAnimationFrame(animate)


const progressText = document.querySelector("#progress-text")
const progressBar = document.querySelector("#progress-bar")
let startTimeBar = null
const uploadBtn = document.body.querySelector("#upload-btn")
uploadBtn.addEventListener("click", () => {
    function bar( timestamp){
        if (startTimeBar == null){
            startTimeBar = timestamp
        }
        const elapsed = timestamp - startTimeBar
        const progress = Math.min(1, elapsed / duration)
        progressText.textContent = `${Math.round(progress*100)}%`
        progressBar.style.transform = `scaleX(${progress})`
        if (progress < 1){
            requestAnimationFrame(bar)
        }
    }   
    requestAnimationFrame(bar)

})

