
const privateData = new WeakMap();

export class User {
    constructor(name, age) {
        privateData.set(this, {
            name,
            age
        });
    }

    getName() {
        return privateData.get(this).name;
    }
}