const localForm = document.body.querySelector('.local-form')
const sessionForm = document.body.querySelector('.session-form')

let localMessages = {
    message: JSON.parse(localStorage.getItem("messages")) || []
}

localForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const message = event.target.message.value
    if (localMessages.message){
        localMessages.message.push(message)
        localStorage.setItem("messages", JSON.stringify(localMessages.message))
    }
    event.target.message.value = "";
    console.log(localMessages)
})

let sessionMessages = {
    message: JSON.parse(sessionStorage.getItem("messages")) || []
}

sessionForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const message = event.target.message.value
    if (sessionMessages.message){
        sessionMessages.message.push(message)
        sessionStorage.setItem("messages", JSON.stringify(sessionMessages.message))
    }
    event.target.message.value = "";
    console.log(sessionMessages)

})

function renderSection(messages, section) {
    messages.message.forEach(element => {
        const p = document.createElement('h4')
        p.textContent = element
        section.appendChild(p)
    });
}



const localSection = document.body.querySelector(".local")
const sessionSection = document.body.querySelector(".session")

window.addEventListener("DOMContentLoaded", () => {
    renderSection(localMessages, localSection)
    renderSection(sessionMessages, sessionSection)
})

const storageForm = document.body.querySelector('.storage')
const storageGetForm = document.body.querySelector('.storage-get')
const storageDelForm = document.body.querySelector('.storage-del')

const storeManager = {

    set(key, value, ttl) {

        const item = {
            value: value,
            expiresAt: Date.now() + Number(ttl)
        };

        localStorage.setItem(
            key,
            JSON.stringify(item)
        );
    },


    get(key) {

        const stored =
            localStorage.getItem(key);

        if (!stored) {
            return null;
        }

        const item =
            JSON.parse(stored);


        // Check expiration

        if (Date.now() > item.expiresAt) {

            localStorage.removeItem(key);

            return null;
        }


        return item.value;
    },


    delete(key) {

        localStorage.removeItem(key);
    },


    clear() {

        localStorage.clear();
    }
};

storageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    storeManager.set(event.target.key.value, event.target.value.value, event.target.ttl.value)
})

storageGetForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(storeManager.get(event.target.key.value))  
})

storageDelForm.addEventListener("submit", (event) => {
    event.preventDefault()
    storeManager.delete(event.target.key.value)
})


const request = indexedDB.open("Portfolio",1)
request.onupgradeneeded = (event) => {
    const db = event.target.result
    db.createObjectStore(
        "users",
        {
            keyPath: "id"
        }
    )

}
request.onsuccess = (event) => {
    const db = event.target.result
    const wtransaction = db.transaction(
        'users',
        'readwrite'
    )
    const wstore = wtransaction.objectStore('users')
    wstore.put({
        id: 1,
        name: "Akshay",
        role: "Developer"
    })
    const rtransaction = db.transaction(
        'users',
        'readonly'
    )
    const rstore = rtransaction.objectStore('users')
    const getRequest = rstore.get(1)
    getRequest.onsuccess = (event) => {
        console.log(
            "Record:",
            getRequest.result
        );
    }
}


request.onerror = () => {
    console.log("Error")
}