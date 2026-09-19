import { afterEach, describe, expect, it, vi } from "vitest";
import { EventEmitter, fetchJSON, fetchRetry } from "./task2";

describe("EventEmitter", () => {
    it("calls listeners upon some events", () => {
        const eventEmitter = new EventEmitter
        const listener1 = vi.fn()
        const listener2 = vi.fn()
        eventEmitter.on("message", listener1)
        eventEmitter.on("message", listener2)
        eventEmitter.emit("message", "hola")
        expect(listener1).toHaveBeenCalledWith("hola")
        expect(listener2).toHaveBeenCalledWith("hola")
    })

    it("calls listeners upon some events and off it", () => {
        const eventEmitter = new EventEmitter
        const listener1 = vi.fn()
        const listener2 = vi.fn()
        eventEmitter.on("message", listener1)
        eventEmitter.on("message", listener2)
        eventEmitter.emit("message", "hola")
        eventEmitter.off("message", listener1)
        eventEmitter.emit("message", "hola")
        expect(listener1).toHaveBeenCalledTimes(1)
    })
    it("calls listeners once upon some events and off it", () => {
        const eventEmitter = new EventEmitter
        const listener1 = vi.fn()
        const listener2 = vi.fn()
        eventEmitter.once("message", listener1)
        eventEmitter.emit("message", "hola")
        eventEmitter.emit("message", "hola")
        expect(listener1).toHaveBeenCalledTimes(1)
    })
    it("does not throw when emitting an unknown event", () => {
        const eventEmitter = new EventEmitter();

        expect(() => {
            eventEmitter.emit("unknown", []);
        }).not.toThrow();
    });
})

describe("fetchJSON", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it("fetches data", async () => {
        const fetchSpy = vi.spyOn(global, "fetch")
        fetchSpy.mockResolvedValue({
            ok:true,
            json: async () => {
                return {
                    name:"akshay"
                };
            }
        });
        const result = await fetchJSON('/api/users')
        expect(result).toEqual({
            name:'akshay'
        });
        expect(fetchSpy).toHaveBeenCalledWith('/api/users')
    });
    it("throws when HTTP response is not ok", async () => {

        vi.spyOn(global, "fetch")
            .mockResolvedValue({
                ok: false
            });

        await expect(
            fetchJSON("/api/user")
        ).rejects.toThrow("HTTP error");
    });

    it("throws when network is not ok", async () => {

        vi.spyOn(global, "fetch")
            .mockRejectedValue(
                new Error("Network Failure")
        );

        await expect(
            fetchJSON("/api/user")
        ).rejects.toThrow("Network Failure");
    });
});

describe("fetchRetry", () => {
    it("shows retry logic", async () => {
        const fetchretrymock =vi.spyOn(global, "fetch")
        .mockImplementationOnce(() => {
            return Promise.reject(
                new Error("Network failure")
            );
        })
        .mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                json: async () => ({
                    success: true
                })
            });
        });
        const result = await fetchRetry('/api/user')
        expect(result).toEqual({
            success:true
        })
        expect(fetchretrymock).toHaveBeenCalledTimes(2)

    })

})