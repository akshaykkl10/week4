export async function getWeather(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Weather request Failed!!");
    }

    return response.json();
}
