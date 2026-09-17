

let taskId = 1

function createTask(id, task, column){
    const taskCard = document.createElement('div')
    taskCard.draggable = true
    taskCard.classList.add('task-card')
    taskCard.dataset.id = id;
    const content = document.createElement('p')
    content.textContent = task
    taskCard.appendChild(content)
    
    column.appendChild(taskCard)
    
}

const board = document.querySelector('.board')
const todo = board.querySelector('.todo')
const inprogress = board.querySelector('.inprogress')
const done = board.querySelector('.done')


board.addEventListener("dragstart", (event) => {

    const taskCard = event.target.closest('.task-card')
    event.dataTransfer.setData(
        "text/plain",
        taskCard.dataset.id
    )
})

board.addEventListener("dragover", (event) => {
    const column = event.target.closest('.todo , .inprogress, .done, .delete')
    if (!column){
        return
    }
    event.preventDefault()
})

board.addEventListener("dragenter", (event) => {
    const column = event.target.closest('.todo , .inprogress, .done, .delete, .cards')
    if (!column){
        return
    }
    column.classList.add('drag-over')
})

board.addEventListener("dragleave", (event) => {
    const column = event.target.closest('.todo , .inprogress, .done, .delete, .cards')
    if (!column){
        return
    }
    column.classList.remove('drag-over')
})

board.addEventListener("drop", async (event) => {
    const id = event.dataTransfer.getData("text/plain")
    const card = board.querySelector(`.task-card[data-id="${id}"]`)
    const del = event.target.closest('.delete')
    if (del){
        card.remove()
        del.classList.remove('drag-over')
        await deleteRecord(TASK_STORE,Number(id))
        return
    }
    const column = event.target.closest('.todo , .inprogress, .done')
    if (column){
        const cards = column.querySelector('.cards')
        cards.classList.remove('drag-over')
        cards.appendChild(card);
        updateRecord({
            id:Number(id),
            task:card.querySelector('p').textContent,
            column: cards.dataset.column
        })
        return
    }
})


board.addEventListener("submit", async (event) => {
    event.preventDefault()
    const form = event.target
    const task = form.task.value
    if (task.trim() == "") return
    const column = form.previousElementSibling
    const id = Number(taskId);
    const columnName = column.dataset.column

    taskId++
    await addToSync({
        action:"update",
        id:id,
        task:task,
        column:columnName
    })
    await addRecord({
        id:id,
        task:task,
        column:columnName
    })
    createTask(id, task, column)

})

window.addEventListener("DOMContentLoaded", async () => {
    const savedBoard = await getAllRecord(TASK_STORE)
    if (!savedBoard) return
    for(const item of savedBoard){
        taskId = Math.max(taskId, Number(item.id) + 1)
        createTask(item.id, item.task, document.querySelector(`.${item.column} .cards`))
    }

})

window.addEventListener("online", syncChanges)