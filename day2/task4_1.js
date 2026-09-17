const items = Array.from({length:1000}, (_, i) => `Item ${i+1}`);
const container = document.body.querySelector('#list-container');
const list = container.querySelector('#list');
const visibleItems = document.querySelector("#visible-items");


const itemHeight = 40;
const containerHeight = 500;
const buffer = 10;


const totalHeight = itemHeight * items.length;
list.style.height = `${totalHeight}px`

let startTime, endTime;


function render() {
    startTime = performance.now()
    const firstVisible = Math.floor(container.scrollTop/itemHeight)
    const lastVisible = Math.ceil(containerHeight/itemHeight)
    const start = Math.max(0, firstVisible - buffer)
    const end = Math.min(items.length, firstVisible + lastVisible + buffer)
    visibleItems.innerHTML = ""
    for(let i = start; i < end; i++){
        const item = document.createElement("div")
        item.classList.add('item')
        item.textContent = items[i]
        visibleItems.appendChild(item)
    }
    visibleItems.style.transform = `translateY(${start * itemHeight}px)`
    endTime = performance.now()
}
let ticking = false;
container.addEventListener("scroll", () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
        render();
        ticking = false;
    })
})

render()
console.log(endTime-startTime)


const lcpObserver = new PerformanceObserver(list => {
    const entries = list.getEntries()
    entries.forEach(element => {
        console.log(element)
    });
});

lcpObserver.observe({
    type:'largest-contentful-paint',
    buffered:true
})

const clsObserver = new PerformanceObserver(list => {
    console.log(list)
    const entries = list.getEntries()
    for (const entry of entries) {
        if (!entry.hadRecentInput) {
            console.log("Layout shift:",entry);
        }
    }
})
clsObserver.observe({
    type:"layout-shift",
    buffered:true
})

const connection = navigator.connection
console.log("Connection:",connection.effectiveType)

if (connection.effectiveType === "slow-2g" || connection.effectiveType === "4g") {
    document.documentElement.classList.add("reduce-motion");
    const videos = document.querySelectorAll("video[autoplay]");
    videos.forEach(element => {
        element.pause();
        element.autoplay = false;
        element.removeAttribute('autoplay');
    });
}