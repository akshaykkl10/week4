const cartModule = (function ()  {
    let items = []
    function addItem(item){
        items.push(item)
    }
    function removeItem(id){
        items = items.filter(item => item.id != id)
    }
    function updateQuantity(id, quantity){
        const item = items.find(item => item.id == id)
        if (item) {
            item.quantity = quantity
        }
    }
    function getItems(){
        return [...items]
    }
    function getTotal(){
        const total = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
        return total
    }
    function clear(){
        items = []
    }
    return {
        addItem,
        removeItem,
        updateQuantity,
        getItems,
        getTotal,
        clear
    }

})();

cartModule.addItem({
    id: 1,
    name: "RTX 5090",
    price: 250000,
    quantity: 1
})
cartModule.addItem({
    id: 2,
    name: "RTX 4090",
    price: 200000,
    quantity: 1
})
cartModule.addItem({
    id: 3,
    name: "RTX 3090",
    price: 150000,
    quantity: 1
})
cartModule.addItem({
    id: 4,
    name: "RTX 3050",
    price: 100000,
    quantity: 1
})

console.log(cartModule.getItems())
console.log(cartModule.getTotal())

cartModule.removeItem(4)
cartModule.updateQuantity(1,2)

console.log(cartModule.getItems())
console.log(cartModule.getTotal())

cartModule.clear()
console.log(cartModule.getItems())
console.log(cartModule.getTotal())

console.log(cartModule.items)


