export class EventEmitter {
    constructor(){
        this.rules = {}
    }
    on(event, listener){
        if(!this.rules[event]){
            this.rules[event] = [];
        }
        this.rules[event].push(listener);
    }
    off(event, listener) {
        const listeners = this.rules[event]
        if(!listeners) return
        this.rules[event] = listeners.filter(item => item != listener)
    }
    emit(event, ...args) {
        const listeners = this.rules[event]
        const wildListeners = this.rules["*"]
        if(listeners)
        {
            listeners.forEach(listener => {
                listener(...args)
            });
        }
        if (!wildListeners) return;
        wildListeners.forEach(listener => {
            listener(...args)
        });
    }
    once(event, listener){
        if(!this.rules[event]){
            this.rules[event] = [];
        }
        const wrapper = ( ...args) => {
            this.off(event, wrapper)
            listener(...args)
        }
        this.on(event, wrapper)
    }
}

export async function fetchJSON(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("HTTP error");
    }

    return response.json();
}

export async function fetchRetry(url, retries=2) {
    for (let index = 0; index <= retries; index++) {
        try {

            return await fetchJSON(url);

        } catch (error) {

            if (index === retries) {
                throw error;
            }

        }        
    }
}

