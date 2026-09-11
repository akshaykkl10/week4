const imageSection = document.querySelector('.gallery')
const images = imageSection.querySelectorAll('img[data-src]')

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const img = entry.target
            img.loading= "lazy"
            img.src = img.dataset.src
            observer.unobserve(img)
        }
    });
})

images.forEach(element => {
    observer.observe(element)
});

const headingObserver =  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            
        }
    });
})

function animateCount(target, counter){
    const duration = 2000
    const startTime = performance.now()
    function update() {
        const currentTime = performance.now()
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed/duration, 1)
        const currentValue = Math.floor(progress * target)
        counter.textContent = currentValue
        if (progress < 1){
            requestAnimationFrame(update)
        }

    }
    
    requestAnimationFrame(update)

}




const statSection = document.body.querySelector('.stats')

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(
        (entry) => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count')
                console.log(counters)
                counters.forEach(counter => {
                    const target = Number(counter.dataset.target)
                    animateCount(target, counter)
                });
                statObserver.unobserve(entry.target)
            }
        }
    )
})

statObserver.observe(statSection)