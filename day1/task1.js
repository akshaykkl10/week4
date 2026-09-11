function double(num) {
    return num * 2;
}

function addOne(num) {
    return num +1;
}

function pipe(...fns) {
    return (value) => {
        let result = value;
        for (let fn of fns){
            result = fn(result) ;
        }
        return(result);
    }
}
console.log('left to right');
console.log(pipe(double,addOne)(5));
console.log(pipe(double,addOne)(2));
console.log(pipe(double,addOne)(8));


function compose(...fns) {
    return (value) => {
        let result = value;
        for (let index = fns.length-1; index >= 0; index--) {
            result = fns[index](result);
        }
        return result;
    }
}
console.log('left to right');
console.log(compose(double, addOne)(5));
console.log(compose(double, addOne)(2));
console.log(compose(double, addOne)(8));


function add(a,b,c){
    return a+b+c;
}

function curry(fn) {
    return function curriedadd (...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        return function (...nextArgs) {
            return curriedadd(...args, ...nextArgs)
        };
    };
}

let curriedadd = curry(add)
console.log("curreid")
curriedadd = curriedadd(5)
curriedadd = curriedadd(5)
console.log(curriedadd(5))


function greet(word, name) {
    console.log(`${word}, ${name}`)
}

function partial(fn, ...args) {
    return function(...nextArgs) {
        return fn(...args,...nextArgs)
    }
}


const greeting = partial(greet, "hello")
greeting("Akshay")
greeting("Jithesh")
greeting("Sharath")