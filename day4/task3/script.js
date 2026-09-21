const items = Array.from(
    { length: 10000 },
    (_, index) => `Item ${index + 1}`
);

const viewport = document.querySelector(".viewport");
const spacer = document.querySelector(".spacer");
const itemsContainer = document.querySelector(".items-container");

const itemHeight = 40;
const buffer = 5;

spacer.style.height = `${items.length * itemHeight}px`;

function render() {
    const scrollTop = viewport.scrollTop

    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
    const visibleCount = Math.ceil(viewport.clientHeight /  itemHeight)
    const end = Math.min(items.length, start + visibleCount + (buffer * 2))
    itemsContainer.innerHTML = ''

    for (let i = start; i <= end; i++){
        const element = document.createElement("div");

        element.className = "item";
        element.textContent = items[i]
        itemsContainer.appendChild(element)
    }
    itemsContainer.style.transform = `translateY(${start * itemHeight}px)`;
}
render()
let trigger = false
viewport.addEventListener('scroll', () => {
    if (trigger) {
        return
    }
    trigger = true
    requestAnimationFrame(() => {
        render() 
        trigger = false
    })

})