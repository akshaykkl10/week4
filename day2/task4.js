function renderNodes(){
    const bodyElement = document.body
    console.log(bodyElement)
    for (let index = 0; index < 1000; index++) {
        const item = document.createElement("div");
        item.textContent = `Item ${index}`;
        bodyElement.appendChild(item);
    }
}
const start = performance.now()
performance.mark('render-start')
renderNodes()
const end = performance.now()
performance.mark('render-end')
console.log(end-start)

const measure = performance.measure(
    'render-function',
    'render-start',
    'render-end'
)
console.log("Mark Measure: ",measure)

const connection = navigator.connection
console.log(connection)