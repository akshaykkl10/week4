const DB_NAME = "kanbanDB";
const DB_VERSION = 1;
const TASK_STORE = "tasks";
const SYNC_STORE = "syncQueue";


function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(
            DB_NAME, DB_VERSION
        );
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(TASK_STORE)){
                db.createObjectStore(TASK_STORE,{
                    keyPath:"id"
                });
            }
            if (!db.objectStoreNames.contains(SYNC_STORE)){
                db.createObjectStore(SYNC_STORE,{
                    keyPath:"id",
                    autoIncrement:true
                });
            }
        }
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }

    })
}

async function addRecord(record) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(TASK_STORE, "readwrite").objectStore(TASK_STORE)
        const request = store.add(record)
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}

async function addToSync(record) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(SYNC_STORE, "readwrite").objectStore(SYNC_STORE)
        const request = store.add(record)
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}

async function updateRecord(record) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(TASK_STORE, "readwrite").objectStore(TASK_STORE)
        const request = store.put(record)
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}
async function getRecord(id) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(TASK_STORE, "readonly").objectStore(TASK_STORE)
        const request = store.get(id)
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}

async function getAllRecord(collection) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(collection, "readonly").objectStore(collection)
        const request = store.getAll()
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}

async function deleteRecord(collection, id) {
    const db = await openDB()
    return new Promise((resolve, reject) =>{
        const store = db.transaction(collection, "readwrite").objectStore(collection)
        const request = store.delete(id)
        request.onsuccess = () => {
            resolve(request.result);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}

async function mockAPI(change){
     console.log("Sending to server:", change);

    // pretend we're making an API request
    await new Promise(resolve => 
        setTimeout(resolve, 500)
    );

    return {
        success: true
    };
}

async function syncChanges(event) {
    const queue = await getAllRecord(SYNC_STORE)
    for (const change of queue){
        try {
            const response = await mockAPI(change)
            if (response.success){
                await deleteRecord(
                    SYNC_STORE,
                    change.id
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

}