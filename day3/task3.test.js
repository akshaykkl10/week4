import { describe, vi, it, expect, afterEach, beforeEach } from "vitest";
import { debounce, fetchJSON, fetchTimeout, memoize } from "./task3.js";


describe("fetchJSON", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it("fetches content", async () =>{
        vi.spyOn(global, "fetch")
        .mockResolvedValue({
            ok:true,
            json: async ()=> ({
                name:"akshay"
            })
        });
        const result = await fetchJSON('/api/user');
        expect(result).toEqual({
            name:"akshay"
        });
    });
    it("Throws error", async () => {
        vi.spyOn(global, "fetch")
        .mockResolvedValue({
            ok:false,
            status:404
        })
        await expect(fetchJSON('api/user')).rejects.toThrow("HttpError");
    });
});

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.clearAllTimers()
    })
    it("calls the function after the delay", () => {
        const fn = vi.fn()
        const debounceFn = debounce(fn, 1000)
        for (let i = 0; i < 10; i++) {
            debounceFn()        
        }
        expect(fn).toHaveBeenCalledTimes(0)
        vi.advanceTimersByTime(1000)
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
describe("memoize", () => {
    it("only runs once for same 2 inputs", () => {
        const fn = vi.fn((x) => x*2)
        const double = memoize(fn)
        double(2)
        double(2)
        expect(fn).toHaveBeenCalledTimes(1)
    })
    it("only runs 2 for different 2 inputs", () => {
        const fn = vi.fn((x) => x*2)
        const double = memoize(fn)
        double(2)
        double(3)
        expect(fn).toHaveBeenCalledTimes(2)
    })
})

describe("fetchTimeout", () => {
    it("aborts after timeout", async () => {
        vi.useFakeTimers()
        const fetchMock = vi.spyOn(global, 'fetch')
        .mockImplementation((url, options) => {
            return new Promise(() => {
                console.log("Fetch started",options.signal)
            })
        })
        fetchTimeout('/api/user', 5000)
        const signal = fetchMock.mock.calls[0][1].signal;
    
        expect(signal.aborted).toBe(false)
        vi.advanceTimersByTime(5000)
        expect(signal.aborted).toBe(true)
        vi.useRealTimers();
        vi.restoreAllMocks();
    })

})