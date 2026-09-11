class EventEmitter {
    constructor() {
        this.rules = {};
    }
    on(event, listener) {
        if(!this.rules[event]){
            this.rules[event] = [];
        }
        this.rules[event].push(listener);
    }
    off(event,listener) {
        const listeners = this.rules[event]
        if(!listeners) return;
        this.rules[event] = listeners.filter(item => item != listener)
    }
    emit(event, ...args) {
        const listeners = this.rules[event]
        const wildListeners = this.rules["*"]
        listeners.forEach(listener => {
            listener(...args)
        });
        if (!wildListeners) return;
        wildListeners.forEach(listener => {
            listener(...args)
        });
    }
    once(event, listener){
        if(!this.rules[event]){
            this.rules[event] = [];
        }
        const wrapper = (...args) => {
            this.off(event, wrapper)
            listener(...args)
        }
        this.on(event, wrapper)
    }
}


const login = (name) => {
    console.log(`"Welcome, ${name}`)
}
const greet = (name) => {
    console.log(`"hey there, ${name}`)
}


const logout = (name) => {
    console.log(`"Thank you, ${name}`)
}
const changePassword = (name) => {
    console.log("Password changed, ", name)
}

const global = (...args) => {
    console.log("hohoho")
}

const eventObj = new EventEmitter()

eventObj.on("login", login)
eventObj.on("login", greet)
eventObj.on("logout", logout)
eventObj.once("changePassword", changePassword)
eventObj.on("*", global)

eventObj.emit("login", "Akshay")
eventObj.emit("logout", "Akshay")
eventObj.emit("logout", "Akshay")
eventObj.emit("changePassword", "Akshay")
eventObj.emit("changePassword", "Akshay")

eventObj.off("login", greet)
eventObj.off("logout", logout)
eventObj.emit("login", "Akshay")
eventObj.emit("logout", "Akshay")

class UserStore extends EventEmitter {
    constructor(){
        super()
        this.users = []
    }
    addUser(user){
        this.users.push(user)
        this.emit("userAdded", user.name)
    }
    removeUser(id){
        const idx = this.users.findIndex(user => user.id === id)
        const [removedUser] = this.users.splice(idx, 1)
        this.emit("userRemoved", removedUser.name)
    }
    updateUser(id, newUser){
        const user = this.users.find(
            user => user.id === id
        )
        Object.assign(user, newUser)
        this.emit("userUpdated", user.name)
    }
}

const userStore = new UserStore()

userStore.on("userAdded", (user) => {
    console.log(` HELLO ${user}`)
})
userStore.on("userRemoved", (user) => {
    console.log(` BYE ${user}`)
})
userStore.on("userUpdated", (user) => {
    console.log(` LOOKING GOOD ${user}`)
})


userStore.addUser({
    id:1,
    name:"Akshay"
})

userStore.addUser({
    id:2,
    name:"Sharath"
})

userStore.addUser({
    id:3,
    name:"Jithesh"
})

userStore.removeUser(2)
userStore.updateUser(1, {id:1,name:"Akshay Kumar"})


console.log(userStore.users)