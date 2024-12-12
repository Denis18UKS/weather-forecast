// data.js

const API_KEY = "7d62bdd64a1303137834f185e4cf51d9ч"; // Замените на ваш API-ключ
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getWeatherData(city = "Moscow") {
    try {
        // Запрос текущей погоды
        const currentWeatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );
        const currentWeather = await currentWeatherResponse.json();

        // Запрос прогноза погоды на 5 дней (по часам)
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );
        const forecast = await forecastResponse.json();

        // Преобразование данных в ваш формат
        const weatherData = {
            days: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            hourlyTemperatures: forecast.list.map((entry) => entry.main.temp).slice(0, 24), // Температура на 24 часа
            dailyTemperatures: forecast.list
                .filter((entry, index) => index % 8 === 0) // Температура раз в 8 часов (~1 раз в день)
                .map((entry) => entry.main.temp),
            precipitation: forecast.list.map((entry) => entry.pop * 100).slice(0, 24), // Осадки в %
        };

        return weatherData;
    } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
        throw error;
    }
}

export default getWeatherData;
