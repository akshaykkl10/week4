const nameInput = document.body.querySelector("#nameInput");
const emailInput = document.body.querySelector("#emailInput");
const preview = document.body.querySelector("#preview");
const nameprev = preview.querySelector("#name")
const emailprev = preview.querySelector("#email")

const state = {
    name:'',
    email:''
}

function emailset(value) {
    emailprev.textContent = `Email: ${value} `
}

function nameset(value) {
    nameprev.textContent = `Name: ${value} `
}

const setViews = new Set()
setViews.add({email:emailset, name: nameset})
const reactiveState = new Proxy(state, {
    set(target, property, value) {
        target[property] = value

        setViews.forEach(view => {
            if(view[property]) {
                view[property](value)
            }
        })        
    }
})


nameInput.addEventListener("input", (event) => {
    console.log(event.target.value)
    reactiveState.name = event.target.value
})
emailInput.addEventListener("input", (event) => {
    console.log(event.target.value)
    reactiveState.email = event.target.value

})