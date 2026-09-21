export function progressBar(){
    const bar = document.querySelector('.progress-bar')
    if(!bar) return
    let ticking = false
    const total = document.documentElement.scrollHeight - window.innerHeight
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY
                const scrolledPercent = (scrolled * 100) / total
                bar.style.width = `${scrolledPercent}%`
                ticking = false
            })
            ticking = true
        }

    })
}