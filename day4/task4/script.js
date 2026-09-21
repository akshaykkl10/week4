const container = document.body.querySelector('.container')
const addBtn = document.body.querySelector('#add-btn')
const delBtn = document.body.querySelector('#del-btn')

const nodeMap =  new WeakMap()

addBtn.addEventListener('click', () => {
    for (let i = 0; i<100; i++){
        const item = document.createElement('div')
        item.textContent = `Item ${i}`
        container.appendChild(item)
        nodeMap.set(item, i)
    }
})

delBtn.addEventListener('click', () => {
    container.innerHTML = ""
})
