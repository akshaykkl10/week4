import {
    describe,
    expect,
    it,
    vi,
    beforeEach,
    afterEach
} from "vitest";

import { darkMode } from "./darkMode.js";

describe("DarkMode", () => {
    
    beforeEach(() => {
        document.body.innerHTML = `
        <button id="dark-btn"></button>
        `;
        
        localStorage.clear();
    });
    
    afterEach(() => {
        vi.restoreAllMocks();
    });
    
    it("loads the saved dark theme", () => {
        
        const dfn = vi.spyOn(Storage.prototype, "getItem")
        .mockReturnValue("dark");
        
        darkMode();
        
        window.dispatchEvent(new Event("DOMContentLoaded"));
        
        expect(dfn)
        .toHaveBeenCalledWith("theme");
        
        expect(document.documentElement.dataset.theme)
        .toBe("dark");
    });
    it("loads dark theme but bot in storage", () => {
        
        darkMode();
        const btn = document.querySelector('#dark-btn');
        btn.click()
        window.dispatchEvent(new Event("DOMContentLoaded"));
        
        expect(document.documentElement.dataset.theme)
        .toBe("dark");
    });
    
    
    
    it("dark theme upon button click", () => {
        const dfn = vi.spyOn(Storage.prototype, "getItem")
        .mockReturnValue("dark");
        const btn = document.querySelector('#dark-btn');
        darkMode();
        btn.click()
        expect(document.documentElement.dataset.theme)
        .toBe("light");
    })
    it("dark theme upon button click", () => {
        const lfn = vi.spyOn(Storage.prototype, "getItem")
        .mockReturnValue("light");
        const btn = document.querySelector('#dark-btn');
        darkMode();
        btn.click()
        expect(document.documentElement.dataset.theme)
        .toBe("dark");
    })
    
});
vi.mock("./api.js", () => ({
    getWeather: vi.fn()
}));
import { fetchWeather } from "./weather.js";
import { getWeather } from "./api.js";
describe("Weather", () => {
    it("gives us weather data", async () => {
        getWeather.mockResolvedValue({
            temperature:30
        })
        const city = {
            latitude: 11.2588,
            longitude: 75.7804
        };
        await fetchWeather(city)
        expect(getWeather).toHaveBeenCalledWith("https://api.open-meteo.com/v1/forecast?latitude=11.2588&longitude=75.7804&current=temperature_2m%2Cwind_speed_10m%2Cweather_code")
    })
})