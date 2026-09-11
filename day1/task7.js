const items = Array.from({length:10000}, (_, i) => `Item ${i+1}`);
console.log(items);
console.log(items.length);
const container = document.body.querySelector('#list-container');
const list = container.querySelector('#list');
const visibleItems = document.querySelector("#visible-items");


const itemHeight = 40;
const containerHeight = 500;
const buffer = 10;


const totalHeight = itemHeight * items.length;
list.style.height = `${totalHeight}px`


function render() {
    
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