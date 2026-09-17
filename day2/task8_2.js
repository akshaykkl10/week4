const leftBox = document.querySelector("#left-box");

const transformBox = document.querySelector("#transform-box");

const performanceBtn = document.querySelector("#performance-btn");

const opacityBox = document.querySelector('#opacity-box')

performanceBtn.addEventListener("click", () =>{
    let startTime = null
    const duration = 2000
    function animate(timestamp){
        if (startTime == null){
            startTime = timestamp
        }
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration , 1)
        const x = progress * 500
        leftBox.style.left = `${x}px`
        transformBox.style.transform = `translateX(${x}px)`
        opacityBox.style.opacity = `${progress}`
        if (progress < 1){
            requestAnimationFrame(animate)
        }
    }
    requestAnimationFrame(animate)
})