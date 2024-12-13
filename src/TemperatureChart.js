import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import weatherData from "./data";

// Регистрация всех необходимых компонентов
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TemperatureChart = () => {
    const { days, hourlyTemperatures } = weatherData;

    const [minTemp, setMinTemp] = useState(-10); // Минимальная температура по умолчанию
    const [maxTemp, setMaxTemp] = useState(40); // Максимальная температура по умолчанию

    // Функция для вычисления средней температуры за день
    const calculateDailyAverages = (hourlyTemperatures) => {
        const dailyAverages = [];
        for (let i = 0; i < hourlyTemperatures.length; i += 24) {
            const dailyData = hourlyTemperatures.slice(i, i + 24);
            const dailyAverage = dailyData.reduce((acc, temp) => acc + temp, 0) / dailyData.length;
            dailyAverages.push(dailyAverage);
        }
        return dailyAverages;
    };

    // Фильтрация температур по диапазону
    const filterTemperatures = (temperatures) => {
        return temperatures.filter(temp => temp >= minTemp && temp <= maxTemp);
    };

    const filteredHourlyTemperatures = filterTemperatures(hourlyTemperatures);
    const dailyTemperatures = calculateDailyAverages(filteredHourlyTemperatures);

    const hourlyChartData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: "Температура (°C) по часам",
                data: filteredHourlyTemperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const dailyChartData = {
        labels: days,
        datasets: [
            {
                label: "Средняя температура (°C)",
                data: dailyTemperatures,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Температура",
            },
        },
    };

    return (
        <div>
            <h2>График температуры</h2>
            
            {/* Фильтр по температуре */}
            <div>
                <label>Минимальная температура: </label>
                <input 
                    type="number" 
                    value={minTemp} 
                    onChange={(e) => setMinTemp(Number(e.target.value))} 
                />
                <label>Максимальная температура: </label>
                <input 
                    type="number" 
                    value={maxTemp} 
                    onChange={(e) => setMaxTemp(Number(e.target.value))} 
                />
            </div>

            <div className="chart-container">
                <h3>По часам</h3>
                <Line data={hourlyChartData} options={options} />
            </div>
            <div className="chart-container">
                <h3>По дням</h3>
                <Line data={dailyChartData} options={options} />
            </div>
        </div>
    );
};

export default TemperatureChart;
