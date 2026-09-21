const data = Array.from(
    {length: 2000000},
    (_, index) => ({
        id: index,
        value: Math.floor(Math.random() * 20000000)
    })
)

const workerBtn = document.body.querySelector('#worker-sort')
const mainBtn = document.body.querySelector('#main-sort')
const spinner = document.body.querySelector('.loader')
const status = document.body.querySelector('#status')
const output = document.body.querySelector('#output')
function showLoading() {
    spinner.style.display = 'block'
}
function hideLoading() {
    spinner.style.display = 'none'
}

workerBtn.addEventListener("click", () => {
    
    showLoading()
    const worker = new Worker('./worker.js')
    // console.log(worker)
    const start = performance.now()
    worker.postMessage(data)
    status.textContent = "Sorting in worker...";
    worker.onmessage = (event) => {
        const sortedData = event.data
        status.textContent = "Worker sorting complete";
        output.innerHTML = ''
        sortedData.slice(0, 20).forEach(item => {
            const li = document.createElement("li");

            li.textContent =
                `ID: ${item.id}, Value: ${item.value}`;

            output.appendChild(li);
        });
        hideLoading()
    }
    console.log("worker:",performance.now() - start)

})

mainBtn.addEventListener('click', () => {
    const start = performance.now()
    showLoading()
    status.textContent = "Sorting in main...";

    const sortedData = data.sort((a,b) => a.value - b.value);
    status.textContent = "Main sorting complete";
    output.innerHTML = ''
    sortedData.slice(0, 20).forEach(item => {
        const li = document.createElement("li");

        li.textContent =
            `ID: ${item.id}, Value: ${item.value}`;

        output.appendChild(li);
    });
    hideLoading()
    console.log("main:", performance.now() - start)
})

const counter = document.body.querySelector('#counter')
let count = 0
setInterval(() => {
    count++
    counter.textContent = `UI Counter: ${count}`
}, 200)