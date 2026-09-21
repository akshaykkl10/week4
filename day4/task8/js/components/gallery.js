const gallery = document.querySelector('.gallery')
const galleryArray = Array.from(document.querySelectorAll('.gallery-item'))

let currentIndex = 0

let started, ended;

function operateTouch(lightBoxImg) {
    const distance = ended - started
    if (distance > 50) {
        currentIndex = next(currentIndex, lightBoxImg)
    }if (distance < -50){
        currentIndex = prev(currentIndex, lightBoxImg)
    }
}
function prev(index, lightBoxImg) {
    if (index == 0) {
        index = galleryArray.length -1
    } else {
        index -= 1
    }
    lightBoxImg.src = galleryArray[index].querySelector('img').src
    return index
}
function next(index, lightBoxImg) {
    if (index == galleryArray.length - 1) {
        index = 0
    } else {
        index += 1
    }
    lightBoxImg.src = galleryArray[index].querySelector('img').src
    return index
}

export function galleryLightbox() {
    if(!gallery) return
    const lightBox =  document.querySelector('.lightbox')
    const lightBoxImg = lightBox.querySelector('img')
    gallery.addEventListener("click", (event) => {
        const item = event.target
        if (!item.closest('.gallery-item')) return
        lightBox.style.display = 'grid'
        lightBoxImg.src = item.src
        document.body.style.overflow ="hidden"
        currentIndex = galleryArray.indexOf(item.closest('.gallery-item'))
    })
    lightBox.addEventListener("click", (event) => {
        const item = event.target;
        if (item.closest('#close')){
            lightBox.style.display = 'none'
            document.body.style.overflow ="auto"

        }
        if (item.closest('#prev')){
            currentIndex = prev(currentIndex, lightBoxImg)
        }
        if (item.closest('#next')){
            currentIndex = next(currentIndex, lightBoxImg)
        }        
    })
    window.addEventListener("keydown" , (event) => {
        if (event.key == "Escape") {
            lightBox.style.display = 'none'
            document.body.style.overflow ="auto"
        }
        if (event.key == "ArrowLeft") {
            currentIndex = prev(currentIndex, lightBoxImg)
        }
        if (event.key == "ArrowRight") {
            currentIndex = next(currentIndex, lightBoxImg)
        }
    })
    lightBox.addEventListener("touchstart", (event) => {
        started = event.touches[0].clientX
    })
    lightBox.addEventListener("touchend", (event) => {
        ended = event.changedTouches[0].clientX
        operateTouch(lightBoxImg)
    })
}

export function imgLazy() {
    if(!gallery) return
    const images = gallery.querySelectorAll('img')


    images.forEach(image => {
        image.style.width = "200px"
        image.style.height = "300px"
    });
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting){
                entry.target.loading = 'lazy'
            }
        });
    })
    images.forEach(image => {
        // image.width = "200px"
        // image.height = "300px"
        imgObserver.observe(image)
    });
}