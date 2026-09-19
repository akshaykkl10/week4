export function chunk(array, size){
    let result = []
    if (size == 0) {
        throw new Error("Invalid size")
    }
    for (let index = 0; index < array.length; index+=size) {
        result.push(array.slice(index, index+size))
    }
    return result
}

export function zip(...arrays){
    const result = []
    let count = 0
    while (count < Math.max(...arrays.map(array => array.length))) {
        let temp = []
        for (let index = 0; index < arrays.length; index++) {
            if(arrays[index].length <= count) {
                continue
            }
            temp.push(arrays[index][count]) 
        }

        result.push(temp)
        count++
    }
    return result
}

export function groupedBy(arr, keyFn) {
    const result = {}
    
    for (const item of arr){
        const key = keyFn(item)
        if(!result[key]){
            result[key] = []
        }
        result[key].push(item)
    }
    return result
}


export function pipe(...fns) {
    return (value) => {
        let result = value;
        for (let fn of fns){
            result = fn(result) ;
        }
        return(result);
    }
}

export function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        return function (...nextArgs){
            return curried(...args, ...nextArgs)
        }
    }
}

export function partial(fn, ...args) {
    return function(...nextArgs) {
        return fn(...args, ...nextArgs)
    }
}