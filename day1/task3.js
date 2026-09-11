function createUser({
    name,
    email,
    role='viewer',
    createdAt = Date.now()
}) {
    if (!name) {
        throw new Error("Name is required");
    }

    if (!email) {
        throw new Error("Email is required");
    }
    const user = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        createdAt
    }
    return Object.freeze(user)

}


const user = createUser({name:'Akshay',  email:'akku'})
console.log(user)
user.name = 'jithesh'
console.log(user)

class Querybuilder{
    constructor(){
        this.table = null;
        this.condition = null;
        this.fields = ["*"];
        this.limitValue = null;
    }
    select(fields){
        this.fields = fields
        return this
    }
    from(table) {
        this.table = table
        return this
    }
    where(condition){
        this.condition = condition
        return this
    }
    limit(limit){
        this.limitValue = limit
        return this
    }
    build(){
        let query = `SELECT ${this.fields.join(", ")} FROM ${this.table}`;
        if (this.condition) {
            query += ` WHERE ${this.condition}`
        }
        if (this.limitValue) {
            query += ` LIMIT ${this.limitValue}`
        }
        return query
    }
    
}

const query = new Querybuilder()
    .from("users")
    // .select(['name', 'email'])
    .where("age > 18")
    .limit(10)
    .build()

console.log(query)


function createNotification({
    type="info",
    message = "",
    duration = 3000,
    dismissable = true
}) {
    if (!message) throw new Error("Message is important");
    return{
        type,
        message,
        duration,
        dismissable,

        show(){
            console.log(`[${type}] ${message}`)
        }
    }
}

const notif = createNotification({message:"gotcha"})
notif.show()