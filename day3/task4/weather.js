import { getWeather } from "./api";

export async function fetchWeather(city) {
    const params = new URLSearchParams({
        latitude: city.latitude,
        longitude: city.longitude,
        current: "temperature_2m,wind_speed_10m,weather_code"
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    return getWeather(url);
}