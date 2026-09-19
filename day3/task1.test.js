import { chunk, curry, groupedBy, partial, pipe, zip } from "./task1.js";
import { describe, it, expect, vi } from "vitest";


describe("pipe", () => {
    it("gives piped function", () => {
        const addOne = (a) => {return a+1}
        const double = (a) => {return a*2}
        const piped = pipe(addOne, double)
        expect(piped(5)).toBe(12)
    })
})


describe("chunk", () => {
    it("chunks the array of size numbers", () => {
        expect(chunk([1,2,3,4,5],1)).toEqual([[1],[2],[3],[4],[5]])
    })
    it("error upon size is zero", () => {
        expect(() => chunk([1,2,3,4,5],0)).toThrow("Invalid size")
    })
})

describe("zip", () => {
    it("zips the input arrays", () => {
        expect(zip([1,2,3],[1,2,3])).toEqual([[1,1],[2,2],[3,3]])
    })
    it("zips the input arrays even with different length", () => {
        expect(zip([1,2,3],[1,2,3,4])).toEqual([[1,1],[2,2],[3,3],[4]])
    })
})

describe("groupedBy", () => {
    it("groups according to function", () => {
        expect(groupedBy([
            {name:"Sharath", lang:"Python"},
            {name:"Jithesh", lang:"Php"},
            {name:"Abhineeth", lang:"C"},
            {name:"Sagar", lang:"C"},
            {name:"Akshay", lang:"Go"},
            {name:"Abhiram", lang:"Python"},
        ], (item) => item.lang)).toEqual({
            Python:[
                {name:"Sharath", lang:"Python"},
                {name:"Abhiram", lang:"Python"}            
            ],
            Php: [
                {name:"Jithesh", lang:"Php"},
            ],
            C: [
                {name:"Abhineeth", lang:"C"},
                {name:"Sagar", lang:"C"},
            ],
            Go: [
                {name:"Akshay", lang:"Go"},
            ]
        })
    })
})

describe("curry", () => {
    it("curries the arguement until it satisfies the arguement length", () => {
        const add = (a,b,c) => {return a+b+c}
        expect(curry(add)(1)(2)(3)).toEqual(6)
    })
    it("throws arguement length error", () => {
        const add = (a,b,c) => {return a+b+c}
        expect(() => {curry(add)(1)(2)}).toBeTypeOf('function')
    })
})

describe("partial", () => {
    it("partially applies arguement", () => {
        const greet = (word, name) => {return `${word}, ${name}`}
        expect(partial(greet, "hi")('Akshay')).toEqual("hi, Akshay")
    })
})

