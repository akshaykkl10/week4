const state = {
    name:'akshay',
    age:23
}

const setViews = new Set();
const getViews = new Set();
const delViews = new Set();

function set(){
    console.log("setting value")
}
setViews.add(set)
function get(target, property) {
    console.log("getting the Value")
    console.log(target[property])
}
getViews.add(get)
function del() {
    console.log("deleting value")
}
delViews.add(del)


const proxy = new Proxy(state, {
    get(target, property) {
        getViews.forEach(view => view(target, property))
        return(target[property])
    },
    set(target, property, value) {
        setViews.forEach(view => view())
        target[property] = value
    },
    deleteProperty(target, property) {
        delViews.forEach(view => view())
        return delete target[property]
    }
})
proxy.name
proxy.age = 22
delete proxy.name